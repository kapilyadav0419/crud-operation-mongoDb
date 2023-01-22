const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray=require("./InitialData")
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student",(req,res)=>{
    res.status(200).json({
        status:"SUCCESS",
        data:studentArray
    })
})
app.get("/api/student/:id",(req,res)=>{
    const index=studentArray.findIndex(element=>element.id==req.params.id)
    if(index!=-1){
        const student=studentArray[index]
        res.status(200).json({
            student
        })
    }else{
        res.status(404).json({
            status:"Failed",
            message:"record is not found"
        })
    }
})


app.post("/api/student", async (req, res) => {
    try {
      req.body.id = studentArray[studentArray.length - 1].id + 1;
      if (
        req.body.name == undefined ||
        req.body.currentClass == undefined ||
        req.body.division == undefined
      ) {
        res.status(400).json({
          status: "failed",
          message: "incomplete details",
        });
      } else {
        studentArray.push(req.body);
        res.json({ studentArray });
      }
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
});

app.put("/api/student/:id",(req,res)=>{
    const index=studentArray.findIndex(element=>element.id==req.params.id)
    if(index!=-1){
        studentArray[index]=req.body;
        res.status(200).json({
            name:req.body.name,
            currentClass:req.body.currentClass,
            division:req.body.division
        })
    }else{
        res.status(404).json({
            status:"Failed",
            message:"record is not found"
        })
    }
})
app.delete("/api/student/:id",(req,res)=>{
    const index=studentArray.findIndex(element=>element.id==req.params.id)
    if(index!=-1){
        studentArray[index]=req.body
        res.status(200).json({
            status:"Success"
        })
    }else{
        res.status(404).json({
            status:"Failed",
            message:"id is invalid"
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
