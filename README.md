# DharaAveda

DharaAveda is split into two deployable apps:

- `frontend/` - React + Vite single page app for Vercel.
- `backend/` - Express + Mongoose REST API for Render and MongoDB Atlas.

The frontend only talks to the backend through `/api/*` REST endpoints. MongoDB credentials stay server-side in the backend environment.

## Local Setup

Install each app independently:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create local env files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Backend variables:

- `MONGODB_URI` - MongoDB Atlas or local MongoDB connection string.
- `PORT` - API port, defaults to `3000`.
- `JWT_SECRET` - secret used to sign admin JWT tokens.
- `FRONTEND_URL` - allowed frontend origin, for example `http://localhost:5173`. Use comma-separated origins for multiple deploy previews.

Frontend variables:

- `VITE_API_URL` - backend base URL, for example `http://localhost:3000`.

## Development

From the repository root, run both apps together:

```bash
npm run dev
```

Or run each app in its own terminal.

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. The admin login remains `admin` / `admin123`; successful login stores a JWT in localStorage and sends it as `Authorization: Bearer <token>` on API calls.

## Database Seeding

On backend startup, `seedDatabase()` checks whether the `products` collection is empty. If it is empty, the backend loads `db_store.json` from the repository root and seeds products, services, testimonials, bookings, inquiries, about content, and screenshot reviews. If products already exist, seeding is skipped so existing Atlas data is not overwritten.

## API Security

Public routes:

- `GET /api/products`
- `GET /api/services`
- `GET /api/testimonials`
- `GET /api/about-vikranti`
- `GET /api/screenshot-reviews`
- `POST /api/bookings`
- `POST /api/inquiries`
- `POST /api/testimonials`
- `POST /api/auth/login`

Admin JWT routes:

- Product and service create/update/delete routes.
- Testimonial update/delete routes.
- Booking and inquiry admin list/update/delete routes.
- Quick stats.
- About content updates.
- Screenshot review create/delete routes.

## Deployment

Vercel frontend:

1. Set project root to `frontend/`.
2. Set `VITE_API_URL` to the deployed Render API URL.
3. Build command: `npm run build`.
4. Output directory: `dist`.

Render backend:

1. Set project root to `backend/`.
2. Set `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL`.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.

## Verification

```bash
cd frontend
npm run lint
npm run build

cd ../backend
npm run build
```
