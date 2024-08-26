const express=require('express');
const bodyParser=require('body-parser');
const studentRouter=require('./routes/student');
const teacherRouter=require('./routes/teacher');
const studentteachers=require('./routes/studenteacher');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(studentRouter);
app.use(teacherRouter);
app.use(studentteachers);
app.get('/',(request,response)=>{
    response.send('hello');
})

app.listen(6800,'0.0.0.0',()=>{
    console.log(`server lsitening at port no 6800`);
})