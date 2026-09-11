# PATHFINDER

PATHFINDER is a responsive prototype for a portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement. It includes role-aware student and industry workspaces, skill-gap recommendations, searchable opportunities, application tracking and an interactive assessment flow.

## Quick start

Open [index.html](./index.html) in a browser. The polished demo frontend has no build step.

## API preview

The optional Express API uses MongoDB and JWT:

```bash
npm install
cp .env.example .env
npm run server
```

Set `MONGODB_URI`, `JWT_SECRET`, and (optionally) `DEMO_PASSWORD` in `.env` to your own values. If `DEMO_PASSWORD` is set, the server seeds the demo accounts on first start without storing a password in the repository.

Use the role selector in the frontend to preview Student, Industry, College/Faculty and Institution/Admin workspaces.

The prototype currently includes:

- Student overview dashboard with profile, readiness, application and recruiter-view metrics
- Skill readiness report preview with recommended learning action
- Curated internship and job opportunities
- Application, skills, profile and messaging navigation states
- Responsive sidebar navigation for mobile screens

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Set the Vercel **Root Directory** to this project directory.
4. Vercel will run the `build` script to validate the JavaScript and serve the static frontend from `index.html`.
5. Add these Vercel environment variables for **Production**, **Preview**, and **Development** as needed:
   - `MONGODB_URI`: your hosted MongoDB connection string (for example, MongoDB Atlas)
   - `JWT_SECRET`: a long, random signing secret
   - `DEMO_PASSWORD`: optional; only needed to seed the local demo accounts
6. Deploy. Vercel routes `/api/*` to the Express function in [api/index.js](./api/index.js), while the static frontend remains at the project root.

The API requires a reachable MongoDB instance for registration, login and opportunities. The `/api/health` endpoint does not require MongoDB and can be used as a deployment smoke test:

```bash
curl https://YOUR_PROJECT.vercel.app/api/health
```

Never commit `.env`; it is ignored by Git. Use [.env.example](./.env.example) as the local template and configure the real values in Vercel Project Settings → Environment Variables.

The local frontend can be previewed with any static server. The optional local API server is started with `npm run server`.
