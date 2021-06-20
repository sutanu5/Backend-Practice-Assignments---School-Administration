const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;
var studentArray = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
// console.log(studentArray);


//GET REQUEST

app.get("/api/student",(req,res) => {
    res.send(studentArray);
})

app.get("/api/student/:id",(req,res) => {
    const student = studentArray.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Invalid Id");
    res.send(student);
})


//POST REQUEST

app.post('/api/student',(req,res) => {
    if(!req.body.name || !req.body.currentClass || !req.body.division){
        return res.status(400).send('Incomplete details')
    }

    const student = {
        id : studentArray.length + 1,
        name : req.body.name,
        currentClass : parseInt(req.body.currentClass),
        division : req.body.division
    }
    studentArray.push(student);
    res.send({id:student.id});
})

//PUT REQUEST

app.put('/api/student/:id',(req,res) => {
    const student = studentArray.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(400).send("Invalid Id");

    // if(!req.body.name && !req.body.currentClass && !req.body.division){
    //     return res.status(400).send('Incomplete details')
    // }

    if(req.body.name){
        student.name = req.body.name
    }
    if(req.body.currentClass){
        student.currentClass = parseInt(req.body.currentClass)
    }
    if(req.body.division){
        student.division = req.body.division
    }

    res.send(student);

})



//DELETE REQUEST

app.delete('/api/student/:id', (req,res) => {
    const student = studentArray.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Invalid Id");

    const index = studentArray.indexOf(student);
    studentArray.splice(index,1);

    res.send(student);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   

//api/student
