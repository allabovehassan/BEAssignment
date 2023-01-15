const express = require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const app = express()
const { router } = require("./routes/route")
const { notesRoute } = require("./routes/notesroutes");
const {auth} = require("./middleware/authmiddle")

app.use(express.json())
app.use(cors())

app.use("/user", router)
app.use(auth)
app.use("/notes", notesRoute);


app.get("/", (req, res) => {
    res.send(`Home PAGE`)
})



app.listen(process.env.port, async () => {
  try {
      await connection
      console.log(`Connected to DB`);
  } catch (error) {
    console.log({"Error":error.message});
  }  
  console.log(`Server is Running at ${process.env.port}`);
})