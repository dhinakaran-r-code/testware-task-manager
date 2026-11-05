# Testware Capstone - Practice Sets Solutions

---

## Part D1: Predict the Output (Q1 - Q8)

### Q1: Express Route Matching Order
* **Predicted Output for `GET /tasks/archived`:** `Task archived`
* **Explanation:** Express executes routes sequentially. `/tasks/:id` matches first because `:id` acts as a wildcard string. `/tasks/archived` must be placed above `/tasks/:id`.

### Q2: React State Mutation vs Immutable Update
* **Predicted Output:** React will NOT re-render the UI.
* **Explanation:** `tasks.push()` mutates the existing array. Passing the same reference causes shallow equality check to skip re-render. Proper fix: `setTasks([...tasks, newTask])`.

### Q3: Missing `await` on Asynchronous JSON Body Parsing
* **Predicted Output:** `Promise { <pending> }`
* **Explanation:** `res.json()` returns a Promise. Without `await`, the variable holds the unresolved Promise object.

### Q4: HTTP Status Code Evaluation
* **Predicted Output:** HTTP Status 200 OK with JSON `{ "error": "Title is required" }`.
* **Explanation:** Express defaults to status 200 if `.status()` is omitted. Proper fix: `return res.status(400).json(...)`.

### Q5: Express Middleware Execution Order
* **Predicted Output:** `req.body` will be `undefined` inside route handlers.
* **Explanation:** `express.json()` must be declared before routes to parse the incoming request body.

### Q6: CORS Preflight Trigger
* **Predicted Output:** Browser sends an `OPTIONS` HTTP preflight request before `POST`.
* **Explanation:** Requests with `Content-Type: application/json` trigger CORS preflight to verify server headers.

### Q7: Git Branch Merge Detection
* **Predicted Output:** `Fast-forward` merge output.
* **Explanation:** Since no new commits occurred on `main` after branching, Git simply moves the pointer forward.

### Q8: Environment Variable Resolution in Vite
* **Predicted Output:** `undefined`
* **Explanation:** Client-side Vite builds do not expose `process.env`. Must use `import.meta.env.VITE_API_URL`.

---

## Part D2: Debug the Code (Bug 1 - Bug 8)

* **Bug 1 (CORS):** Backend restricted to port 5173 while Vite runs on 5174. Fix: Use dynamic CORS or `app.use(cors())`.
* **Bug 2 (Headers Sent):** Missing `return` after error response. Fix: `return res.status(400).json(...)`.
* **Bug 3 (State Mutation):** Using `.splice()`. Fix: Use `.filter()` to return a new array instance.
* **Bug 4 (Infinite Loop):** Missing dependency array in `useEffect`. Fix: Add `[]` as the second argument.
* **Bug 5 (Type Mismatch):** Comparing string `req.params.id` with numeric ID. Fix: `parseInt(req.params.id, 10)`.
* **Bug 6 (Fetch Body):** Sending raw object without stringifying. Fix: `body: JSON.stringify(data)`.
* **Bug 7 (Hardcoded URL):** Using `http://localhost:5000` in production. Fix: Use `import.meta.env.VITE_API_URL`.
* **Bug 8 (Secret Leak):** Missing `.gitignore`. Fix: Add `.env` and `node_modules/` to `.gitignore`.