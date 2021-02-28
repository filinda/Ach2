const express = require("express");
const app = express();
const pool = require("./config/db");
const errHandler = require("./custom_modules/error_handler");
let n = 100;

app.use(express.json());

pool.query('delete from used_vars');

app.post("/newValue",function (req,res){
    try {
		res.setHeader("Content-Type","application/json");
		res.setHeader("Connection","close");
        let newVar = parseInt(req.body.newVal);
        if(newVar+"" == "NaN"){
			errHandler.endWithException(res,"newValue must be an integer"); 
			return;
		}
		if(parseInt(newVar)>n | parseInt(newVar)<0){
			errHandler.endWithException(res,"newValue must be >0 and <"+n); 
			return; 
		}
		pool.query("select variable from used_vars where variable in("+newVar+","+(newVar*1+1)+")",
			function(error,results,fields){
				if(error){
					errHandler.endWithError(res,0,error);
					return;
				}
				try{
					if(results.length==0){
						pool.query('insert into used_vars(variable) values ('+newVar+')', 
						function(){
							try{
								if(error){
									errHandler.endWithError(res,1,error);
									return; 
								}

								res.end(JSON.stringify({
									success: 1,
									message: 'success',
									outValue: newVar+1
								})); 
								console.log('success');  
								return;
								
							}catch(e){
								errHandler.endWithError(res,2,e);
								return;
							}
						});
						return;
					}
					if(results[0].variable == newVar){
						errHandler.endWithException(res,newVar + ' was added earlier'); 
						return;
					}
					if(results[0].variable == newVar+1){
						errHandler.endWithException(res,(newVar*1+1)+ ' was added earlier'); 
						return;
					}
					
					errHandler.endWithError(res,3,error);
					return;
				}catch(e){
				   errHandler.endWithError(res,4,e);
				   return;
				}
		}); 
    }
    catch(e){
       errHandler.endWithError(res,5,e); 
	   return;
    }
    
})


app.listen(3000,function(){
    console.log("Server up and runs")
})