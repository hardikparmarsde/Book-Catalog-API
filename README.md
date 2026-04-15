# Book Catalog API (JWT Auth)

REST API for:
- User registration + login (JWT)
- CRUD operations on books
- Protect create/update/delete using `Authorization: Bearer <token>`

## Tech
- Node.js, Express
- MongoDB + Mongoose
- JWT, bcrypt

## Setup
1. Install deps:
   - `npm install`
2. Create `.env` (copy from `.env.example`):
   - `MONGO_URI`
   - `JWT_SECRET`
3. Run:
   - `npm run dev` (nodemon)
   - `npm start` (prod)

## Endpoints
### Users
- `POST /api/users/register`
- `POST /api/users/login`

### Books
- `GET /api/books` (public)
- `GET /api/books/:id` (public)
- `POST /api/books` (protected)
- `PUT /api/books/:id` (protected)
- `DELETE /api/books/:id` (protected)

## Response format
Successful:
```json
{ "success": true, "message": "OK", "data": { } }
```

Error:
```json
{ "success": false, "message": "Validation failed", "errors": [{ "field": "email", "message": "Invalid email" }] }
```

## Deployment notes (Render)
- Start command: `npm start`
- Build command: `npm install`
- Port: `process.env.PORT || 5000`
- Env vars: `MONGO_URI`, `JWT_SECRET`
# Book-Catalog-API
