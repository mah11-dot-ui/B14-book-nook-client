# BookNook

BookNook is an online book discovery and borrowing website where readers can
explore a catalog, manage the books they contribute, and keep track of their
borrowed books.

## Live website

[Visit BookNook](https://book-nook-gamma-opal.vercel.app/)

## Features

- Browse the book catalog and open detailed book pages.
- Discover the six most recently added titles on the homepage.
- Register and sign in with email and password or Google.
- Add books with a cover image, author, category, and description.
- Edit and delete books you have contributed.
- Borrow books and view or return your active borrows.
- Update your profile name, photo, and password.
- Use the responsive interface with light and dark themes.
- Get loading feedback, form errors, and success notifications.

## Technology

- Next.js and React for the website.
- Better Auth for email/password and Google authentication.
- Express and MongoDB for the book and borrow API.
- ImgBB for uploaded book cover images.
- Tailwind CSS and DaisyUI for styling.

## Run locally

### Website

Install dependencies and start the Next.js app:

```bash
npm install
npm run dev
```

The website runs at [http://localhost:3000](http://localhost:3000).

Create `.env.local` in the website project:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/booknook
BETTER_AUTH_SECRET=replace-with-a-random-secret-at-least-32-characters
BETTER_AUTH_URL=http://localhost:3000
BOOK_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### API server

In the separate `book-nook-server` project, install dependencies and start the
Express API:

```bash
npm install
npm run dev
```

The API listens at `http://localhost:5000`. Create its `.env` using
[`book-nook-server/.env.example`](../book-nook-server/.env.example). Set
`MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `FRONTEND_URL` to
values matching the website configuration. Set `IMGBB_API_KEY` to enable cover
image uploads.

The API provides:

- `GET /books` and `GET /books/:id`
- `POST /books`, `PATCH /books/:id`, and `DELETE /books/:id`
- `POST /borrows`, `GET /borrows`, and `DELETE /borrows/:id`

## Deployment configuration

The website's server-side `BOOK_API_URL` must point to the deployed Express
API. The current API is
[`https://book-nook-server-pied.vercel.app`](https://book-nook-server-pied.vercel.app).
Set `BOOK_API_URL` in the website's Vercel project environment variables, then
redeploy. Configure Better Auth's production URL as
`https://book-nook-gamma-opal.vercel.app` and add
`https://book-nook-gamma-opal.vercel.app/api/auth/callback/google` as an
authorized redirect URI for the Google OAuth client.

## Validation

Build the website for production:

```bash
npm run build
```
