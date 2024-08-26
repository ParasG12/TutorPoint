const express=require('express');
const Router=express.Router();
const db=require('../db');
Router.get('/teachers',(request,response)=>{
    const statement=`select id,name,exp,subject,rating from teachers`;
    db.execute(statement,(error,data)=>{
        if(error){
response.status(400).send({message:'something went wrong!!!'});
        }
        else{
            if(data.length==0){
                response.send({message:'no teachers in list'});
            }
            else{
                response.status(200).send({message:data});
            }
        }
    })


})

module.exports=Router;