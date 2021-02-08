const express = require("express");
const app = express();
const pool = require("./config/db");
let n = 100;

app.use(express.json());

pool.query('delete from used_vars');

/*insert into used_vars(variable) values (1)*/ 
app.get("/api",function (req,res){
    pool.query('select variable from used_vars',function(error,results,fields){
        if(error){
            res.json({
                success: 0,
                message: 'sql error'
            });
        }else{
            req._read
            res.json({
                success: 1,
                message: ''+results[0].variable
            })    
        }
    });
    
})

app.post("/newValue",function (req,res){
    
    try {
        let newVar = parseInt(req.body.newVal);
        if(newVar+"" != "NaN"){
            if(parseInt(req.body.newVal)<n & parseInt(req.body.newVal)>0){
                pool.query('select variable from used_vars where variable in('+newVar+','+(newVar*1+1)+')',
                    function(error,results,fields){
                        try{
                            if(error){
                                res.json({
                                    success: 0,
                                    message: 'server error 1'
                                });
                                console.log('server error 5'); 
                            }else{
                                if(results.length==0){
                                    pool.query('insert into used_vars(variable) values ('+newVar+')', 
                                    function(){
                                        try{
                                            if(error){
                                                res.json({
                                                    success: 0,
                                                    message: 'server error 5'
                                                });
                                                console.log('server error 5');  
                                            }else{
                                                res.json({
                                                    success: 1,
                                                    message: 'success',
                                                    outValue: newVar+1
                                                })  
                                                console.log('success');  
                                            }
                                        }catch(e){
                                            console.log(e);
                                            res.json({
                                                success: 0,
                                                message: 'server error 6'
                                            });
                                        }
                                    });
                                }else{
                                    if(results[0].variable == newVar){
                                        res.json({
                                            success: 0,
                                            message: newVar + ' was added earlier'
                                        }) 
                                        console.log( newVar +" was added earlier");  
                                    }
                                    else if(results[0].variable == newVar+1){
                                        res.json({
                                            success: 0,
                                            message: (newVar+1)+ ' was added earlier'
                                        }) 
                                        console.log((newVar+1)+ ' was added earlier');  
                                    }
                                    else {
                                        res.json({
                                            success: 0,
                                            message: 'server error 3'
                                        }) 
                                        console.log('server error 3');  
                                    }
                                    
                                }
                                
                            }
                        }catch(e){
                            console.log(e);
                            res.json({
                                success: 0,
                                message: 'server error 7'
                            });
                        }
                }); 
            }
            else{
                res.json({
                    success: 0,
                    message: "newValue must be >0 and <"+n
                }) 
                console.log("newValue must be >0 and <"+n);  
            }
        }
        else{
            res.json({
                success: 0,
                message: "newValue must be an integer"
            })  
            console.log("newValue must be an integer");  
        }
    }
    catch(e){
        res.json({
            success: 0,
            message: "server error 4"
        }) 
         console.log(e);  
    }
    
})


app.listen(3000,function(){
    console.log("Server up and runs")
})
