# Testware Capstone: Part A & Part B Assessment

---

## Part A: Warm-up Quiz (Q1 - Q20 Answers)

| Q# | Question Summary | Correct Option | Answer & Reason |
|:---:|---|:---:|---|
| **1** | HTTP method to read data from an API | **(b)** | **GET** — Used for retrieving/reading resources safely without mutating server state. |
| **2** | Status code for new resource created | **(b)** | **201** — 201 Created indicates successful creation following a POST request. |
| **3** | Express line to read JSON request body | **(b)** | **app.use(express.json())** — Built-in middleware to parse incoming JSON payloads into `req.body`. |
| **4** | CORS error is fixed on which side? | **(b)** | **The server (API)** — Configured on Express via `cors()` headers telling browsers to permit the frontend origin. |
| **5** | Where to call fetch on React page open | **(b)** | **Inside useEffect with an empty dependency array** — Runs once on component mount without infinite looping. |
| **6** | What does response.json() return? | **(b)** | **A Promise** — Asynchronously parses the readable stream and resolves with parsed data. |
| **7** | Command to start a new Git repository | **(c)** | **git init** — Initializes a local `.git` repository folder. |
| **8** | What does git add . do? | **(b)** | **Stages all changes** — Moves modified/new files into the Git staging area. |
| **9** | File listing files Git should ignore | **(b)** | **.gitignore** — Prevents `.env`, `node_modules`, and build files from being tracked. |
| **10** | What does git commit -m "msg" do? | **(b)** | **Saves the staged changes as a snapshot in your local repository** — Creates a localized history commit. |
| **11** | Command to send commits to GitHub | **(c)** | **git push** — Transmits local branch commits to the remote GitHub repository. |
| **12** | git pull combines which two actions? | **(b)** | **fetch and merge** — Downloads remote commits and merges them into current working branch. |
| **13** | What is a branch used for? | **(b)** | **A separate line of work for a feature** — Isolates experimental or feature changes from `main`. |
| **14** | What is a Pull Request? | **(b)** | **A request to review and merge a branch on GitHub** — Collaboration mechanism to review code before merging. |
| **15** | File that must NOT be committed to public repo | **(c)** | **.env with real secrets** — Exposes database keys, API tokens, and credentials publicly. |
| **16** | What does npm run build produce in Vite? | **(b)** | **Optimised static files in the dist folder** — Bundles minified production-ready JS, CSS, and HTML. |
| **17** | Host type for built React files | **(a)** | **A static host such as Netlify or Vercel** — Optimized for serving static client assets globally. |
| **18** | Variable hosting platforms assign for port | **(a)** | **process.env.PORT** — Dynamic system port assigned by cloud providers like Render. |
| **19** | Fetch options to send JSON body correctly | **(b)** | **headers Content-Type application/json and body: JSON.stringify(data)** — Correct HTTP header and serialized string. |
| **20** | What does status code 404 mean? | **(c)** | **Not found** — The requested resource URL endpoint does not exist on the server. |

---

## Part B: Tricky Concepts Pack (12 Concepts Breakdown)

1. **`fetch` does not throw on 404/500:** `fetch` only rejects on total network failure. Always verify `if (!res.ok) throw new Error(...)` explicitly.

2. **`res.json()` returns a Promise:** Reading body stream requires `await res.json()`. Without `await`, evaluating `.map()` throws `TypeError` on pending Promise.

3. **Without `express.json()`, `req.body` is undefined:** Express defaults to empty body parsing. Both `app.use(express.json())` on server and `Content-Type: application/json` on client are mandatory.

4. **CORS is enforced by browsers, not server crashes:** Server executes request, but browser hides response unless server sends `Access-Control-Allow-Origin` header via `cors()`.

5. **`useEffect` without dependency array causes infinite loop:** Updating state inside an unconstrained effect triggers re-render, looping endlessly. Always supply `[]` for initial load.

6. **Never mutate state directly:** Modifying arrays in-place (`tasks.push()`) maintains memory reference, skipping React re-renders. Use spread syntax `[...tasks, new]` or `.filter()`.

7. **`localhost` does not exist on the public internet:** Hardcoded `http://localhost:5000` points to visitor machine. Must use environment variable `import.meta.env.VITE_API_URL`.

8. **Vite variables require `VITE_` prefix:** Exposed only if prefixed with `VITE_`. Baked at build time; frontend variables must never contain backend secret keys.

9. **`.gitignore` ignores only untracked files:** Pre-committed files remain tracked. Must run `git rm --cached <file>` to untrack without deleting disk copy.

10. **Commits save only staged changes:** Editing files after `git add` leaves new modifications unstaged. Verify with `git status` or `git diff --staged`.

11. **Merge conflicts are text delimiters, not compile errors:** Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) must be manually edited out before committing.

12. **URL parameters (`req.params.id`) are strings:** In `/tasks/:id`, param is text. Must parse to integer via `Number(req.params.id)` or `parseInt()` when comparing with numeric IDs.