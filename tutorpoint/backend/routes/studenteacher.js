const express=require('express');
const Router=express.Router();
const db=require('../db');
Router.post('/studentteachers/:id',(request,response)=>{
const {id}=request.params;
const {tid}=request.body;
const statement=`insert into studentteachers values(${id},${tid})`;
db.execute(statement,(error,data)=>{
    if(error){
        response.status(400).send({message:'data not inserted'});
    }
    else{
        response.status(200).send({message:'data inserted success'});
    }
})
})
Router.get('/tempTable',(request,response)=>{
    const statement=`select * from teachers where id in(select id from tempTable)`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({message:error});
        }
        else{
            response.status(200).send({message:data});
        }
    
        
    })
})
Router.post('/tempTable',(request,response)=>{
    const {tid}=request.body;
    const statement=`insert into tempTable values(${tid})`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({message:'error in insertion in temp table'});
        }
        else{
            response.status(200).send({message:data});
        }
    })
    Router.delete('/tempTable/:tid',(request,response)=>{
        const {tid}=request.params;
        console.log(tid);
        const statement=`delete from tempTable where id=${tid} `;
        db.execute(statement,(error,data)=>{
            if(error){
            response.status(400).send({message:error});
            }
            else{
                response.status(200).send({message:data});
            }
        })
    })
    Router.delete('/tempTable',(request,response)=>{
        
        console.log(tid);
        const statement=`delete from tempTable`;
        db.execute(statement,(error,data)=>{
            if(error){
            response.status(400).send({message:error});
            }
            else{
                response.status(200).send({message:data});
            }
        })
    })

})
Router.get('/student/filter/:id',(request,response)=>{
    const {id}=request.params;
    // const statement=`select * from teachers where id != all(select tid from studentteachers where sid=${id})`;
   const statement= `select * from teachers where id != all(select tid from studentteachers where sid=${id}) and id!=all(select id from temptable)`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({message:'data not inserted'});
        }
        else{
            response.status(200).send({message:data});
        }
    })

})

Router.get('/studentteachers/Amt/:id',(request,response)=>{
    const {id}=request.params;
    const statement=`select Sum(t.Price) as total from studentteachers st inner join teachers t on t.id=st.tid where sid=${id}`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({message:'data not inserted'});
        }
        else{
            response.status(200).send({message:data});
        }
    })
})

Router.get('/studentteachers/:id',(request,response)=>{
    const {id}=request.params;
 const statement=`select t.name,t.exp,t.subject,t.rating,t.Price,t.contact from studentteachers st inner join teachers t on t.id=st.tid where st.sid=${id}`;
    db.execute(statement,(error,data)=>{
        if(error){
            response.status(400).send({message:'data not inserted'});
        }
        else{
            response.status(200).send({message:data});
        }
    })
    })
    


module.exports=Router;