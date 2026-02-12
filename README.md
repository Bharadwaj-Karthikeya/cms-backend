# Content Management System API Backend

Robust Express 5 backend for a content management system that combines REST APIs, scheduled automation, WebSocket chat, and webhook ingestion on top of MongoDB and Cloudinary.

## Tech Stack
- Node.js with Express 5, Socket.IO, Multer, Morgan, CORS, Cookie Parser
- MongoDB via Mongoose with strict validation on updates
- Cloudinary for artifact media storage
- Auth powered by JWT, bcrypt, and short-lived OTPs
- Node-cron for scheduled maintenance tasks

## Features
- Authentication with OTP-backed signup, JWT login, cookie/Authorization header parsing, logout, and admin user listing.
- Artifact publishing with optional media upload, Cloudinary storage, listing and deletion flows, plus automated archiving of stale drafts.
- Social layer with artifact comments and like toggling, each supporting ownership validation flows.
- Real-time one-to-one chat delivered through Socket.IO with thread reuse, online user tracking, and delivery acknowledgements.
- Webhook sandbox endpoint (`/webhook/test`) that logs and echoes received payloads for integration testing.
- Platform protections such as rate limiting (20 req/min/IP), role-based guards, and file-type filtering on uploads.
- Verified end-to-end via ngrok tunnels to ensure webhooks, sockets, and REST endpoints all behave over external connections.

## Services (single-line summaries)
- `services/auth.service.js` – Handles OTP issuance, signup verification, bcrypt/JWT login, logout response, and admin-safe user listings.
-- included service lines `signup initiation and verfication via otp`, `login via bearer tokens and cookies`
- `services/artifact.service.js` – Creates artifacts with optional Cloudinary media, fetches user/global feeds, and deletes authored entries.
-- included service lines `getAllpost` `getpostsbyuser` `deletion` `update to published` `update to new status` `createpost` `get by status` 
- `services/comment.service.js` – Creates, lists, and deletes artifact comments with strict artifact/user validation.
-- included service lines `creation` `deletion`
- `services/like.service.js` – Toggles a like document per user+artifact pair and reports the resulting liked state.
-- included service lines `liking` `unliking`
- `services/chat.service.js` – Finds or creates a two-party thread, persists chat messages, and exposes thread-specific histories.
-- included service lines `creation - setup - send/recieve` `find and send/recieve` `working websocket trails`

## Key Modules & Flows
- `server.js` boots Express, wires MongoDB and Cloudinary, kicks off the cron job, and mounts Socket.IO on the HTTP server.
- `app.js` configures global middleware (CORS, morgan, JSON limits, cookie parser) and routes (`/auth`, `/artifacts`, `/likes`, `/comments`, `/chats`, `/webhook`).
- `middlewares/` includes JWT  and cookie authentication, role based authorization, rate limiting, and Multer upload guards (5 MB, images/PDF only).
- `cron/testing.js` runs every 12 hours, archiving artifacts left in `draft` for over 24 hours.
- `socket/socket.js` registers `user-online`, `send-message`, `receive-message`, and `message-sent` events while syncing with `chat.service`.
- `webhook/webhook.js` supplies an inspectable POST hook for third-party callbacks.

## Getting Started
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` (or create manually) and configure the variables below.
3. Launch the API and Socket.IO server: `npm start`
4. Hit `http://localhost:<PORT>/` to verify readiness.

## Environment Variables
| Name | Description |
| --- | --- |
| `PORT` | Optional HTTP port (defaults to 4000). |
| `Mongo_URI` | MongoDB connection string. |
| `JWT_SECRET` | Secret for signing authentication tokens. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account identifier. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |

## API & Realtime Surface
- REST base paths: `/auth`, `/artifacts`, `/likes`, `/comments`, `/chats`, `/webhook`.
- Webhook testing endpoint: POST `/webhook/test` with any JSON payload.
- Socket events: emit `user-online` when a user connects, `send-message` with `{ receiverId, senderId, message }`; listen for `receive-message` and `message-sent` for delivery updates.
- Cron automation: executes twice daily, archiving dormant drafts to keep the artifact dataset clean.

## Key Project Details
- Express JSON parsing limited to 10 MB per request to prevent oversized uploads.
- File uploads land in `uploads/` and are promptly pushed to Cloudinary during artifact creation, with local cleanup afterward.
- Rate limiter responds with structured JSON to simplify client handling.
- Thread documents store participants and last message metadata, enabling efficient inbox-style listings.
- The webhook router is namespaced, allowing additional providers to be added under `/webhook/*` without touching the core app.
- Tested with ngrok-exposed hosts so remote clients can exercise REST, Socket.IO, and webhook traffic through a secure public URL.
