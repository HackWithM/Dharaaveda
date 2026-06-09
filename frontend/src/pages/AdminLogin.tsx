import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, UserCheck, ShieldAlert, KeyRound, Loader } from "lucide-react";
import { api } from "../lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.success && res.token) {
        localStorage.setItem("dharaSavedToken", res.token);
        navigate("/admin");
      } else {
        setError("Invalid security clearance. Please retry carefully.");
      }
    } catch (err: any) {
      setError(err.message || "Credential verification failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050d0a] text-white min-h-screen pt-36 pb-20 px-4 flex items-center justify-center font-sans relative">
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-luxury-green-mid)_0%,_#050d0a_100%] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 glass-panel-dark rounded-3xl overflow-hidden p-6 sm:p-10 border border-luxury-gold/20 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="p-3 bg-luxury-gold/5 border border-luxury-gold/20 rounded-full inline-flex text-luxury-gold text-lg mb-1 animate-pulse">
            <Lock className="w-6 h-6" />
          </span>
          <h1 className="font-serif text-2xl tracking-[0.12em] text-white uppercase">
            ADMIN CONSOLE
          </h1>
          <p className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase block">
            Security Clearance Check
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/45 border border-red-500/25 text-red-300 text-center rounded text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs text-gray-300">
          <div>
            <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
              Admin Login Username
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/60" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin user..."
                className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white outline-none transition-colors"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
              Secure Cipher Key
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 w-4 h-4 text-luxury-gold/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-white/5 border border-luxury-gold/20 focus:border-luxury-gold rounded-xl pl-10 pr-3 py-2.5 text-white outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 cursor-pointer flex items-center justify-center space-x-2 py-3 border border-luxury-gold bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-green-deep transition-all duration-300 text-xs font-bold tracking-widest uppercase rounded-xl"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin text-luxury-gold" />
            ) : (
              <span>Clear Console Access</span>
            )}
          </button>
        </form>

        <div className="border-t border-luxury-gold/10 pt-4 text-center font-mono text-[9px] text-gray-500 leading-relaxed">
          <p>AUTHORIZED SERVICE PERSONS ONLY.</p>
          <p className="mt-1">Credentials hint: <strong className="text-luxury-gold">admin</strong> / <strong className="text-luxury-gold">admin123</strong></p>
        </div>
      </div>
    </div>
  );
}
