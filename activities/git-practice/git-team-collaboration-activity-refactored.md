# 🤝 Git Team Collaboration Activity: Working on a Shared Project

### 💬 Activity Theme: Teamwork in Git – Collaboration Without Chaos

---

## ⚠️ Why Working in a Group Can Be Tricky in Git

When multiple developers collaborate in a Git project, things can go wrong if best practices aren't followed:
- **Merge conflicts** when editing the same files
- **Overwriting each other's work** by pushing without pulling first
- **Confusing commit history** if changes are not well structured
- **Accidental file tracking** of temporary or system files

But don’t worry — Git provides powerful tools to manage collaboration. You just need to learn and use them properly!

---

## ✅ Best Practices for Teamwork in Git

| 👍 Recommended                        | 🚫 Risky / Not Recommended                 |
|-------------------------------------|-------------------------------------------|
| Always pull before you push         | Pushing without pulling first             |
| Use feature branches for each task  | Working directly on `main` or `master`    |
| Write meaningful commit messages    | Vague commits like "stuff" or "update"    |
| Communicate with your team          | Working in isolation                      |
| Use `.gitignore` to avoid junk files| Committing system/build/cache files       |
| Review PRs before merging           | Pushing directly to main                  |

---

## 🎯 Goal of This Activity:
Learn how to collaborate safely and effectively on a shared GitHub repository with others — just like real software development teams do!

This activity builds on your previous Git knowledge. Now, you'll work **with a partner** to simulate a real software development workflow.

---

## 👩‍🚀 Roles and Responsibilities

| Task                             | Student A                                   | Student B                                   |
|----------------------------------|----------------------------------------------|----------------------------------------------|
| Create GitHub repo              | ✅                                            | ❌                                          |
| Add collaborator                | ✅                                            | ❌ (just accept invite)                     |
| Create a new branch             | `studentA-feature`                           | `studentB-feature`                          |
| Add a new HTML section          | "About Student A" section in `index.html`    | "Projects by Student B" section in `index.html` |
| Push branch to GitHub           | ✅                                            | ✅                                          |
| Create Pull Request             | ✅                                            | ✅                                          |
| Review partner's Pull Request  | ✅                                            | ✅                                          |

---

## 🧪 Hands-On Steps (with Code)

### 📦 Step 1: Student A Creates the Repository

1. Student A creates a new GitHub repo: `collab-webpage`
2. Adds Student B as a collaborator via **Settings → Collaborators**

---

### 👯 Step 2: Clone the Repo

Both students run:
```bash
git clone https://github.com/your-username/collab-webpage.git
cd collab-webpage
```

---


📝 Note: Student A should first create and push a basic index.html file in the main branch before anyone branches off. That way, both Student A and B are adding their own sections to an existing shared file instead of creating it from scratch.

### 🌿 Step 3: Create Feature Branches

Student A:
```bash
git checkout -b studentA-feature
```

Student B:
```bash
git checkout -b studentB-feature
```

---

### ✍ Step 4: Make Changes Locally

Student A edits `index.html`:
```html
<!-- Student A Section -->
<section>
  <h2>About Student A</h2>
  <p>I enjoy CSS and frontend development!</p>
</section>
```

Student B edits `index.html`:
```html
<!-- Student B Section -->
<section>
  <h2>Projects by Student B</h2>
  <p>Here are some of my cool web projects.</p>
</section>
```

Each student commits their work:

```bash
git add index.html
git commit -m "Add Student A section"  # Student A
# OR
git commit -m "Add Student B section"  # Student B
```

---

### 🚀 Step 5: Push Your Branches

```bash
git push origin studentA-feature  # Student A
git push origin studentB-feature  # Student B
```

---

### 🔀 Step 6: Create Pull Requests

1. On GitHub, go to **Pull Requests → New Pull Request**
2. Select `studentA-feature` or `studentB-feature` → merge into `main`
3. Review, approve, and merge each other's PRs

---

## 💥 Merge Conflict Challenge (With Solution)

### 🔸 Scenario:
Both students change the same `<h1>` title in `index.html`.

- Student A: `<h1>Welcome from Student A</h1>`
- Student B: `<h1>Welcome from Student B</h1>`

Git will show a conflict when trying to merge both branches.

### 💣 Conflict Markers:

```html
<<<<<<< HEAD
<h1>Welcome from Student A</h1>
=======
<h1>Welcome from Student B</h1>
>>>>>>> studentB-feature
```

### ✅ Resolution Steps:

1. Open the conflicted file
2. Manually edit the code to resolve conflict:

```html
<h1>Welcome from Student A and Student B</h1>
```

3. Stage and commit the resolved file:

```bash
git add index.html
git commit -m "Resolve merge conflict in index.html"
```

---

## 📁 .gitignore Hands-On Task

### Goal: Avoid tracking unnecessary files.

1. Student A creates a `.gitignore` file:
```
*.log
node_modules/
.DS_Store
```

2. Commit and push it:

```bash
git add .gitignore
git commit -m "Add .gitignore file"
git push origin studentA-feature
```

3. Student B pulls the changes:

```bash
git checkout main
git pull origin main
```

4. Student B tests it by creating a `debug.log` file and verifying it's ignored.

---

## 🔄 Pull Before Push Challenge

### Scenario: Student B tries to push without pulling latest changes from `main`.

```bash
git push origin studentB-feature
```

⚠ Error: "Updates were rejected because the remote contains work that you do not have."

### ✅ Solution:

```bash
git pull origin main --rebase
# OR
git fetch origin
git rebase origin/main
```

Then push again:

```bash
git push origin studentB-feature
```

---

## 🔁 Undoing Mistakes (Bonus Knowledge)

### Accidentally ran `git reset --hard`?

Check reflog:
```bash
git reflog
git reset --hard HEAD@{1}  # Or whichever point is before the reset
```

---

## ✅ Summary Tips

✔ Use branches  
✔ Pull before pushing  
✔ Review PRs  
✔ Commit often  
✔ Communicate with your partner  
✔ `.gitignore` keeps your repo clean

---

You’re officially working like a real dev team! 💻🚀
