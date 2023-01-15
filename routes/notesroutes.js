const express = require("express");
const notesRoute = express.Router();
const { notemodel } = require("../models/notesmodels");

notesRoute.get("/", async (req, res) => {
  try {
    let data = await notemodel.find();
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

notesRoute.post("/add", async (req, res) => {
  let payload = req.body;
  try {
    const notesdata = new notemodel(payload);
    await notesdata.save();
    // res.send(notesdata);
    res.send({"message":"Created"})
  } catch (error) {
    console.log(error.message);
    res.send(`Something Wrong not added`);
  }
});

notesRoute.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let ID = req.params.id;
  try {
    let find_id = await notemodel.findOne({ _id: ID });
    if (find_id.userID === payload.userID) {
      await notemodel.findByIdAndUpdate({ _id: ID }, payload);
      // res.send(`Updated`);
      res.send({ message: "Updated" });
      
    } else {
      res.send(`U r not allowed to do modification`)
    }
  } catch (error) {
    console.log(`Eroor while updating`);
    res.send(error.message);
  }
});

notesRoute.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body
  try {
    let delete_obj = await notemodel.findOne({ _id: ID })
    // console.log();
    if (delete_obj.userID === payload.userID) {
      await notemodel.findByIdAndDelete({ _id: ID });
      res.send({ "message": "Notes Deleted" });
    } else {
      // let ans = JSON.stringify("U R not allowed delete someone else task")
      res.send({ message: "U r not allowed delete someone else task " });
      
    }
      
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { notesRoute };
