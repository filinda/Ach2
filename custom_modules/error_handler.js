var errorMessagesForCode = [
	"server error 0",
	"server error 1",
	"server error 2",
	"server error 3",
	"server error 4",
	"server error 5",
];

module.exports.endWithError = function (result, errorCode, error){
	result.end(JSON.stringify({
									success: 0,
									message: errorMessagesForCode[errorCode]
								}));
	console.log(error);
}

module.exports.endWithException = function (result, errorMessage){
	result.end(JSON.stringify({
									success: 0,
									message: errorMessage
								}));
	
	console.log(errorMessage);
}