# NewsBites – Personalized News Aggregator & Ad Campaign Platform

NewsBites is a full-stack MERN application that fetches news from multiple RSS sources, personalizes feeds based on user preferences, and injects advertisements into the feed with accurate per-user tracking of impressions and clicks.

The project includes two main parts:

* User-facing news application
* Admin dashboard for managing RSS agents and ad campaigns

This project was built as part of a MERN stack technical assignment focusing on backend architecture, background jobs, personalization logic, and analytics tracking.

---

## Features

### User Side

* Signup / Login using JWT authentication
* Select preferred news categories during onboarding
* Personalized "For You" news feed
* Infinite scrolling article loading
* Save / bookmark articles
* Sponsored ads injected inside the feed
* Unique ad impression tracking per user
* Unique ad click tracking per user

---

### Admin Side

Admin dashboard allows:

* Creating RSS feed agents
* Configuring fetch intervals
* Activating / deactivating feeds
* Creating advertisement campaigns
* Viewing analytics (views, clicks, CTR)

---

## Tech Stack Used

Frontend:
React.js
Tailwind CSS
Axios

Backend:
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
node-cron (background RSS fetcher)

---

## How RSS Agents Work

RSS feeds are configured from the admin panel.

Each agent:

* runs on its own interval
* fetches XML data
* parses articles
* assigns category automatically
* avoids duplicates using article link checking
* stores articles in MongoDB

This makes feed ingestion fully dynamic without restarting the server.

---

## Ad Injection Strategy

Ads are inserted inside the feed response automatically.

For every N articles returned:

1 sponsored ad is inserted

Ads are selected based on:

* category targeting
* campaign active status

This logic runs inside:

GET /api/feed

---

## Ad Tracking Logic

Ad impressions and clicks are tracked uniquely per user.

Each interaction stores:

userId
adId
interactionType
timestamp

A user viewing the same ad multiple times is counted only once as a unique impression.

CTR is calculated using:

CTR = total clicks / total impressions

---

## Project Structure

```
NewsBites

backend/
config/
controllers/
jobs/
middleware/
models/
routes/
server.js

frontend/
src/
public/
```

---

## Running the Project Locally

Clone the repository:

```
git clone https://github.com/software-dev01/NewsBites.git
cd NewsBites
```

---

Backend setup:

```
cd backend
npm install
npm run dev
```

Server runs on:

http://localhost:5000

---

Frontend setup:

```
cd frontend
npm install
npm start
```

Frontend runs on:

http://localhost:3000

---

## Environment Variables

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Overview

Authentication:

POST /api/auth/register
POST /api/auth/login

User:

PUT /api/user/preferences
POST /api/articles/save
GET /api/articles/saved

Feed:

GET /api/feed

Ads:

POST /api/ads
GET /api/ads/stats

Tracking:

POST /api/ads/view
POST /api/ads/click

---

## Notes / Decisions Made During Development

* node-cron is used for background RSS fetching
* duplicate prevention handled using article link uniqueness
* ad analytics stored separately for accurate per-user tracking
* feed response supports pagination for infinite scrolling
* architecture follows controller → routes → models separation

---

## Live Demo

Frontend:
https://newsbites.vercel.app

Backend API:
https://newsbites-1aao.onrender.com

---

