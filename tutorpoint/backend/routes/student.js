const express=require('express');
const cryptoJs=require('crypto-js');
const db=require('../db');
const Router=express.Router();
Router.get('/students',(request,response)=>{
    const statement=`select firstname,lastname,email from students`;
    db.execute(statement,(error,data)=>{
        if(error){
response.status(400).send({message:'something went wrong!!!'});
        }
        else{
            if(data.length==0){
                response.send({message:'no students in list'});
            }
            else{
                 response.status(200).send({message:data});
              
            }
        }
    })


})
Router.post('/students',(request,response)=>{
    const{firstname,lastname,email,password}=request.body;
    const encryptPassword=cryptoJs.SHA256(password);
    const statement=`insert into students(firstname,lastname,email,password)values('${firstname}','${lastname}','${email}','${encryptPassword}')`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({msg:error});
        }
        else{
            response.status(200).send({message:data});
        }
    })


})
Router.post('/students/signin',(request,response)=>{
    const{email,password}=request.body;
    const encryptedPassword = cryptoJs.SHA256(password).toString(cryptoJs.enc.Hex);
    console.log(encryptedPassword);
    const statement=`select id,firstname,lastname,email from students where
                     email='${email}' and password='${encryptedPassword}'`;
                     db.execute(statement,(error,data)=>{
                        if(error){
                            response.status(400).send({message:"invalid credentials"});
                        }
                        else{
                            if(data.length==0){
                                response.status(400).send({message:"no record matched"});
                            }
                            else{
                            response.status(200).send({message:data});
                            }
                        }
                     })
})
Router.get('/students/:id',(request,response)=>{
    const {id}=request.params;
    const statement=`select firstname,lastname,email from students where id=${id}`;
    db.execute(statement,(error,data)=>{
        if(error){
response.status(400).send({message:'something went wrong!!!'});
        }
        else{
            if(data.length==0){
                response.send({message:'invalid student entry'});
            }
            else{
                response.status(200).send({message:data});
            }
        }
    })


})
Router.put('/students/:id',(request,response)=>{
    const {id}=request.params;
    const{firstname,lastname,email,password}=request.body;
    const encryptPassword=cryptoJs.SHA256(password);
    const statement=`update students set firstname='${firstname}',lastname='${lastname}' ,email='${email}',password='${encryptPassword}'where id=${id}`;
    db.execute(statement,(error,data)=>{
        if(error){
response.status(400).send({message:'something went wrong!!!'});
        }
        else{
            if(data.length==0){
                response.send({message:'student update failed'});
            }
            else{
                response.status(200).send({message:'student update success'});
            }
        }
    })


})
module.exports=Router;

