import express from 'express'
import HelloController from "./controllers/hello-controller.js"
const app = express()
HelloController(app)
app.listen(4000)