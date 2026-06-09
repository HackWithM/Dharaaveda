import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return env;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      env[key] = value;
      return env;
    }, {});
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "127.0.0.1");
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await canUsePort(port))) {
    port += 1;
  }
  return port;
}

const rootEnv = loadEnvFile(path.join(repoRoot, ".env"));
const backendEnv = loadEnvFile(path.join(repoRoot, "backend", ".env"));
const preferredApiPort = Number(process.env.PORT || backendEnv.PORT || rootEnv.PORT || "3000");
const apiPort = process.env.PORT
  ? String(preferredApiPort)
  : String(await findAvailablePort(preferredApiPort));
const frontendApiUrl = process.env.VITE_API_URL || rootEnv.VITE_API_URL || `http://localhost:${apiPort}`;

console.log(`Starting backend on http://localhost:${apiPort}`);
console.log(`Starting frontend with VITE_API_URL=${frontendApiUrl}`);

const processes = [
  {
    name: "backend",
    args: ["run", "dev", "--prefix", "backend"],
    env: { ...rootEnv, ...backendEnv, ...process.env, PORT: apiPort }
  },
  {
    name: "frontend",
    args: ["run", "dev", "--prefix", "frontend"],
    env: { ...rootEnv, ...process.env, VITE_API_URL: frontendApiUrl }
  }
];

const children = processes.map(({ name, args, env }) => {
  const child = spawn(npmCommand, args, {
    cwd: process.cwd(),
    env,
    stdio: "inherit",
    shell: false
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${name}] stopped with signal ${signal}`);
      return;
    }

    if (code !== 0) {
      console.log(`[${name}] exited with code ${code}`);
    }
  });

  return child;
});

function stopChildren() {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
}

process.on("SIGINT", () => {
  stopChildren();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopChildren();
  process.exit(0);
});
