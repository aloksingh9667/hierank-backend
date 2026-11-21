# Hierank Business School — Backend REST API

Backend API for Hierank Business School, built with Node.js, Express, and MongoDB (Mongoose).

## Features
- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Role-Based Access Control**: Admin and editor roles for managing site content and leads.
- **Content Management**: APIs for Programmes, Faculty, News, Recruiters, Testimonials, Campus items, and Site Settings.
- **Lead & Application Processing**: Secure handling of admissions applications, enquiry forms, and campus tour bookings.
- **Security & Performance**: Helmet security headers, rate limiting, CORS protection, compression, input validation with Zod.

## Tech Stack
- **Runtime**: Node.js (>= 18)
- **Framework**: Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Security**: Helmet, CORS, Express-Rate-Limit, BCryptJS, JSONWebToken

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB instance (local or MongoDB Atlas) or Docker

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

Default variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hierank
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
ADMIN_NAME=HBS Admin
ADMIN_EMAIL=admin@hierank.org
ADMIN_PASSWORD=ChangeMe@12345
```

### 3. Start Local MongoDB (Optional Docker)
```bash
docker compose up -d
```

### 4. Install Dependencies & Seed Database
```bash
npm install
npm run seed        # Seeds programmes, faculty, placements, news, and admin user
```
*(Use `npm run seed:reset` if you need to wipe and re-seed).*

### 5. Run the Server
```bash
# Development (with node watch)
npm run dev

# Production
npm start
```
Check health endpoint: `http://localhost:5000/api/health`

## API Overview

### Public Endpoints (`/api`)
- `GET /api/programmes`, `GET /api/programmes/:slug`
- `GET /api/faculty`
- `GET /api/news`, `GET /api/news/:slug`
- `GET /api/recruiters`
- `GET /api/testimonials`
- `GET /api/campus?type=`
- `GET /api/placements/stats`, `GET /api/placements/stats/all`
- `GET /api/settings`
- `POST /api/enquiries`
- `POST /api/applications`
- `POST /api/tours`

### Admin & Auth Endpoints
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/admin/stats`
- `GET /api/admin/applications`, `PATCH /api/admin/applications/:id/status`
- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/:id`
- `GET /api/admin/tours`, `PATCH /api/admin/tours/:id`
- `POST / PUT / DELETE` on content endpoints (Bearer Token required)
