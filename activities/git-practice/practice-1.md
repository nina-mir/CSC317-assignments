# 🌐 GitHub Practice: Git Basics

### 🎯 Goal: Practice using Git and GitHub to version control a simple HTML file

---

## 🛠️ What You’ll Learn:
- Create a new GitHub repository
- Create and version control a simple HTML file
- Use Git CLI effectively
- Push your code to GitHub
- Undo mistakes
- Understand `.gitignore`
- Explore Git history
- Practice problem-solving with Git

---

## 1️⃣ Create a New Repository on GitHub
1. Go to [https://github.com](https://github.com) and log in.
2. Click the **+** in the top-right corner → **"New repository"**
3. Fill out the form:
   - **Repository name:** `test-webpage`
   - **Description:** *(optional)* “My first HTML file on GitHub”
   - ✅ Leave **README**, **.gitignore**, and **License** unchecked
4. Click **Create repository**

---

## 2️⃣ Create a Simple HTML File Locally
1. On your computer, create a folder named `test-webpage`
2. Open any text editor (e.g., VS Code, Notepad, Sublime)
3. Create a file named `index.html` and paste in this code:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Web Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>Are you vibe coding too?!</p>
</body>
</html>
```

---

## 3️⃣ Initialize a Git Repository Locally
Open your terminal or Git Bash and run these commands **inside your project folder**:

```bash
cd path/to/test-webpage
git init
```

### 💡 What does `git init` do?
- Initializes an empty Git repository in your folder.
- Creates a hidden `.git/` directory that stores Git’s metadata.

👉 Tip: You can check this by running:
```bash
ls -a
```

---

## 4️⃣ Add and Commit Your File
```bash
git add index.html
git commit -m "Add first HTML file"
```

### Explanation:
- `git add` stages the file to be tracked
- `git commit` saves a snapshot of your changes
- `-m` lets you write a short commit message

👉 Try:
```bash
git add --help
```
to see all available options and examples.

---

## 5️⃣ Connect Your Local Repo to GitHub
### Step 1: Get your GitHub repo URL (HTTPS or SSH)

Example HTTPS:
```
https://github.com/your-username/test-webpage.git
```

### Step 2: Add the remote:
```bash
git remote add origin <your-repo-url>
```

> Want to add a different URL just for fetch or push?

```bash
git remote set-url origin <fetch-url>       # sets the default URL (used for both fetch & push)
git remote set-url --push origin <push-url> # overrides ONLY the push URL
```

#### [for more info click here!](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories#changing-a-remote-repositorys-url)


Check your remote setup:
```bash
git remote -v
```

---

## 6️⃣ Push Your Code to GitHub
If your repo uses `master`:
```bash
git push -u origin master
```

If your repo uses `main`:
```bash
git push -u origin main
```

---

## 7️⃣ Explore Git History
Use this command to view your commit history:

```bash
git log
```

Try these shortcuts:
```bash
git log --oneline
git log --graph
```

---

## 8️⃣ What if I made a mistake? 🤔

### Undo your last commit (but keep your changes):
```bash
git reset --soft HEAD~1
```

### Undo last commit completely (also unstage changes):
```bash
git reset --mixed HEAD~1
```

### Undo last commit AND discard changes:
⚠️ This will permanently delete changes:
```bash
git reset --hard HEAD~1
```

---

## 9️⃣ What is `.gitignore`?

`.gitignore` tells Git which files/folders to ignore and not track.

### Example:
Create a `.gitignore` file in your project folder:
```
node_modules/
.DS_Store
*.log
```

This is useful for skipping:
- Temporary files
- Build files
- System files

👉 You can commit your `.gitignore` too:
```bash
git add .gitignore
git commit -m "Add .gitignore"
```

---

## 🎯 Practice Challenges

### 🔸 Challenge 1: Add Another Page
Create a new file called `about.html` and add some content.

**Hint:**  
- Don’t forget to `git add` and `git commit` again  
- Use `git status` to check what’s tracked and untracked

### 🔸 Challenge 2: Modify and View Git Log
Change some content in `index.html` and commit the change.

Then explore the history using:
```bash
git log
git log --oneline
```

**Hint:**  
- Try viewing the difference between commits: `git diff`

### 🔸 Challenge 3: Use a `.gitignore` File
Add a fake file named `secret.txt`.  
Then create a `.gitignore` file to ignore it.

**Hint:**  
- Add `secret.txt` to `.gitignore`
- Run `git status` to see if it’s still being tracked

---

## 🎁 Bonus Tips
- Run `git help <command>` or `<command> --help` to learn what any command does.
- Use `git status` often to see what’s going on in your repo.
- Make small, meaningful commits with good messages.
- Practice regularly—it’s the best way to learn Git!

---

## ✅ You did it!
You now know the basics of Git + GitHub version control. Keep experimenting and building!