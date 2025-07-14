# social-media-api

A minimal Node.js/Express server that verifies connectivity to a MongoDB Atlas cluster.

## Features
- Express HTTP server with a single health-check route (`/`)
- Secure connection string managed via `.env`
- Ready for expansion into a full social-platform backend

## Prerequisites
- Node 18 +
- MongoDB Atlas cluster (M0 or higher)
- `.env` file containing  
  `MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## Install & Run

```bash
npm install
node server.js
Open http://localhost:3001/ and you should see

json
Copy code
{ "message": "Successfully connected to the database!" }
Deployment
Set the same MONGO_URI as an environment variable on your cloud host
(Heroku, Render, Vercel, etc.).

License
MIT

yaml
Copy code

---

#### Git commands

```bash
git add README.md
git commit -m "docs: add project README"
git push origin main
That puts your repo in submission-ready shape (remember .env stays local).

Reflection answers (include in your lab write-up)
Prompt	Key points
Why whitelist IPs?	Limits who can even attempt to reach your database; removing the open gate ( 0.0.0.0/0 ) blocks automated credential-stuffing, reduces surface for DDoS, and satisfies compliance requirements.
Purpose of dotenv?	Loads secrets from a local file into process.env, keeping credentials out of source control. Alternatives in production: native host env-vars, Docker secrets, HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, etc.
First debug steps if connection fails?	1 Verify URI/user/pass; 2 Check Atlas Network Access IP list; 3 Read the exact error stack (auth vs. DNS vs. network); 4 Test connectivity with mongosh or ping; 5 Ensure no hidden BOM or malformed .env.