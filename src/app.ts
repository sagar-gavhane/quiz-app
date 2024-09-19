import express from "express"
import quizRoutes from "./routes/quiz.route"
import userRoutes from "./routes/user.route"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/health", (req, res) => {
  res.status(200).send("OK")
})

app.use("/api/quiz", quizRoutes)
app.use("/api/user", userRoutes)

export default app
