# Apurva Kumar — Engineering Portfolio

Public engineering portfolio for **Apurva Kumar** (Electronics & Communication, AI & ML at MIT World Peace University). It is a static Vite + React site: navigation, project details, resume download, contact (mailto + vCard), and live public GitHub repositories.

The live GitHub section reads public profile/repo data from `https://api.github.com` in the browser. No token and no backend are required to host the site.

## Run locally

```bash
cd frontend
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
yarn build
yarn preview
```

Personal content lives in `frontend/src/data/profile.ts`. Resume file: `frontend/public/assets/Apurva_Kumar_Resume.pdf`.

## Host on GitHub Pages

This repo is set up for GitHub Pages via `.github/workflows/deploy.yml`.

1. Create a new GitHub repository (public if you want the free Pages URL).
2. Push this project:

   ```bash
   git init -b main
   git add .
   git commit -m "Publish engineering portfolio"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. After the **Deploy GitHub Pages** workflow succeeds, the site is at:

   - Project repo: `https://<you>.github.io/<repo>/`
   - User site (`<you>.github.io` as the repo name): `https://<you>.github.io/`

The workflow sets Vite’s `base` to `/<repo>/` automatically for project Pages.

## Optional backend

`backend/` is a FastAPI + MongoDB starter with a `/api/github/portfolio` proxy. The hosted portfolio does **not** use it. To run it locally:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

MongoDB must be running and `MONGO_URL` / `DB_NAME` set in `backend/.env`.
