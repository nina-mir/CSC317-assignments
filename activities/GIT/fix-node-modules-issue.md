# 📘 GitHub Activity: Fixing `node_modules` in Your Repo (Used in Midterms & Quizzes)

> **Heads up:** Everything on this activity sheet can (and will!) appear on **midterms and quizzes**. Follow carefully, practice the commands, and make sure you understand the **why** behind each step.

This activity walks you through:

1. Initializing a Node.js project
2. Installing Express + SQLite-related packages
3. Creating a remote repo and pushing your code
4. Fixing the **common mistake** of pushing `node_modules`
5. Removing `node_modules` from Git tracking and preventing future tracking with `.gitignore`
6. Verifying your fixes

---

## ✅ Learning Goals

* Use essential Git commands responsibly (`init`, `add`, `commit`, `push`, `rm --cached`)
* Create and apply a `.gitignore` file
* Understand why `node_modules` must **never** be committed
* Verify that your Git repo is clean locally and remotely

---

## 0) Prerequisites

* Node.js + npm installed
* Git installed
* A GitHub account
* A terminal you’re comfy with (Mac/Linux Terminal or Windows PowerShell)

---

## 1) Create a Node Project

**Task:** Initialize a new Node.js project and commit the baseline.

**Steps:**

1. Create and enter your project folder.
2. Initialize npm and Git.
3. Make a starter file.

**Hints:**

* Use `npm init -y` to accept defaults quickly.
* Commit early to set a clean baseline.

**Answer (Commands):**

```bash
mkdir express-sqlite-lab && cd express-sqlite-lab
npm init -y
git init
echo "console.log('Hello, Express + SQLite!')" > index.js
git add .
git commit -m "chore: init Node project with index.js"
```

**Why:** Starting with a small, clean commit makes it easy to see what changed later. It also avoids mixing unrelated changes.

---

## 2) Install Express + SQLite Packages

**Task:** Install “cool packages” commonly used with Express and SQLite.

**Pick one SQLite library (your choice for the lab):**

* `sqlite3` (bindings to SQLite)
* `better-sqlite3` (sync API, very fast, often simpler for small apps)

**Optional but helpful dev tools:**

* `nodemon` (reloads server automatically)
* `morgan` (HTTP request logger)
* `dotenv` (load env vars)

**Hints:**

* Use `--save-dev` for dev-only packages like `nodemon`.
* You only need one of `sqlite3` or `better-sqlite3` for this lab.

**Answer (Commands – choose ONE SQLite package):**

```bash
# Option A (sqlite3)
npm i express sqlite3 morgan dotenv

# Option B (better-sqlite3)
npm i express better-sqlite3 morgan dotenv

# Dev tool (optional but recommended)
npm i -D nodemon
```

**Why:** Express is your web framework; a SQLite library connects you to the database layer; `nodemon` improves developer experience.

---

## 3) Create a Remote Repo & Push

**Task:** Create a new GitHub repo and push your local code.

**Hints:**

* Replace `YOUR-USERNAME` and branch name as needed.
* Default branch may be `main` or `master`. Use whatever your Git is set to.

**Answer (Commands):**

```bash
# Create an empty repo on GitHub (via website) named express-sqlite-lab
# Then add the remote and push:
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/express-sqlite-lab.git
git push -u origin main
```

**Why:** Connecting local to remote gives you off-site backups, collaboration, and grading visibility.

---

## 4) Uh-oh… You Pushed `node_modules` 😱

**Scenario:** You accidentally committed and pushed `node_modules` because you didn’t have a `.gitignore`. This bloats your repo, slows clones, and is considered poor practice. **You will get zero** unless you fix it.

**Fix Plan:**

1. Add a proper `.gitignore`
2. Remove `node_modules` from Git **tracking** (without deleting it from your disk!)
3. Commit and push the cleanup

---

## 5) Create a Proper `.gitignore`

**Task:** Add a Node-focused `.gitignore` that excludes `node_modules` and other common files.

**Minimum entries for this lab:**

```
node_modules/
.env
dist/
coverage/
.DS_Store
```

**Hints:**

* You can create this file manually or via `echo` commands.
* You can also use GitHub’s Node `.gitignore` template for a fuller list (recommended in real projects).

**Answer (Commands):**

```bash
# Create .gitignore with common Node entries
cat > .gitignore <<'EOF'
# Node essentials
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Env & build artifacts
.env
dist/
coverage/

# OS/editor cruft
.DS_Store
Thumbs.db
*.log
EOF
```

**Why:** `.gitignore` tells Git which files/folders to ignore from now on. This prevents accidental tracking.

---

## 6) Remove `node_modules` from Git Tracking (But Keep the Folder Locally)

**Task:** Untrack `node_modules` everywhere **without deleting it** from your disk.

**Hints:**

* `git rm --cached` removes files from **Git’s index** (the “staging area”) but leaves your working files untouched.
* The `-r` flag recurses through the directory.

**Answer (Commands):**

```bash
git rm -r --cached node_modules
git add .gitignore
git commit -m "fix: remove node_modules from tracking and add .gitignore"
git push
```

**Why:**

* `--cached` = “stop tracking” (do **not** delete locally)
* Adding `.gitignore` ensures Git won’t re-track `node_modules` on future commits
* Pushing this commit **removes the folder from the remote repo** in the latest snapshot

---

## 7) Verify It Worked (Local & Remote)

**Local Verification:**

```bash
# Should NOT list node_modules files anymore
git ls-files | grep node_modules || echo "✅ node_modules no longer tracked"

# See why a path is ignored
git check-ignore -v node_modules
```

**Remote Verification:**

* Refresh your GitHub repo page → `node_modules/` should be gone from the file list.

**Why:** Trust, but verify. These commands are your debugging toolkit for ignore rules and tracking state.

---

## 8) Common Pitfalls & Pro Tips

* **“I still see node_modules on GitHub!”**
  Make sure you committed and **pushed** after `git rm -r --cached node_modules`.

* **“node_modules came back locally after I pulled!”**
  That means you didn’t remove it from tracking before. Complete Steps 5–6 and push the fix; then run `npm ci` or `npm install` to reconstruct locally if needed.

* **“Repo size is still huge!”**
  The steps above remove `node_modules` from the **latest commit** and the remote’s current tree. Large history remains.
  For this class, removing from the latest snapshot is **sufficient**.
  **FYI / Extra Credit:** To scrub it from **history**, use `git filter-repo` (preferred) or `git filter-branch` and force-push. This is advanced and risky—don’t do it unless you know what you’re doing.

* **Global ignore for your machine (optional):**
  Create `~/.gitignore_global` and run:

  ```bash
  git config --global core.excludesfile ~/.gitignore_global
  ```

  Good for OS/editor junk like `.DS_Store`, but **project-level `.gitignore` is still required** for team consistency.

---

## 9) Bonus: Dev Experience Touches (Optional but Nice)

* Add a **nodemon** script in `package.json`:

  ```json
  {
    "scripts": {
      "dev": "nodemon index.js"
    }
  }
  ```

  Then run:

  ```bash
  npm run dev
  ```

* Keep `.env` out of Git and load it with `dotenv`:

  ```js
  // index.js
  require('dotenv').config();
  ```

  Add `.env` to `.gitignore` (already included above).

---

## 10) Quick Recap (What You Must Remember for Exams)

* Never commit `node_modules/`
* Add `.gitignore` **early**
* To fix an accidental commit:

  1. Create `.gitignore` including `node_modules/`
  2. `git rm -r --cached node_modules`
  3. `git commit -m "remove node_modules and add .gitignore"`
  4. `git push`
* Verify with `git check-ignore -v` and by checking GitHub

You’ve got this. Keep your repos lean, your commits clean, and your future self (and teammates) will thank you. 🌈✨
