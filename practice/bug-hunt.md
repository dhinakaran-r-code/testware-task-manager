# Part E: Bug Hunt Project - 20 Bugs Solved

| Bug # | File | Line / Issue | Root Cause | Fix |
|---|---|---|---|---|
| 1 | server.js | app.listen | Hardcoded port prevents cloud deployment | Use `process.env.PORT || 5000` |
| 2 | server.js | CORS setup | Missing `cors()` middleware | Add `app.use(cors())` |
| 3 | server.js | Body Parser | Missing `express.json()` | Add `app.use(express.json())` before routes |
| 4 | server.js | POST /tasks | No title validation (empty task added) | Add `if (!req.body.title) return res.status(400)...` |
| 5 | server.js | PUT /tasks/:id | Comparison `item.id === req.params.id` fails | Convert param: `parseInt(req.params.id, 10)` |
| 6 | server.js | DELETE /tasks | Missing `:id` dynamic parameter in route | Change route from `/tasks` to `/tasks/:id` |
| 7 | server.js | Error Response | Sends status 200 on error | Explicitly set `res.status(404)` or `res.status(400)` |
| 8 | server.js | Route Order | Dynamic `:id` placed above static routes | Reorder static routes above parameterized routes |
| 9 | App.jsx | useEffect | Missing dependency array `[]` causing infinite fetch loop | Add `[]` as second argument in `useEffect` |
| 10 | App.jsx | fetch | Missing `await` keyword before `res.json()` | Use `const data = await res.json()` |
| 11 | App.jsx | State Update | Direct mutation using `tasks.push(newTask)` | Use immutable syntax: `setTasks([...tasks, newTask])` |
| 12 | App.jsx | Form Submit | Page reloads on submit | Add `e.preventDefault()` inside submit handler |
| 13 | App.jsx | Task List | Missing `key` prop in mapped `<li>` elements | Add `key={task.id}` to root mapped element |
| 14 | App.jsx | Input Control | Uncontrolled input without `value` or `onChange` | Bind `value={title}` and `onChange={(e) => setTitle(...)}` |
| 15 | App.jsx | API URL | Hardcoded `http://localhost:5000` breaking in production | Use `import.meta.env.VITE_API_URL` |
| 16 | App.jsx | Status Check | Fetch error handling ignores HTTP status | Check `if (!res.ok) throw new Error(...)` |
| 17 | .gitignore | Git config | Missing `.env` in gitignore | Add `.env` to `.gitignore` to prevent leaking secrets |
| 18 | .gitignore | Git config | Missing `node_modules` in gitignore | Add `node_modules/` to ignore large dependency folders |
| 19 | package.json | Scripts | Missing `start` or `dev` script in server | Add `"start": "node server.js"` in `scripts` |
| 20 | main.jsx | Mount root | Root ID typo (`document.getElementById('app')`) | Change to `document.getElementById('root')` |