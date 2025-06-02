const app = require('./app'); //importing from app.js 
const db = require('./config/db') //importing from db.js
const userModel = require('./model/user.model')

const port = 5000; //creating and defining the port 

app.get('/', (req,res)=>{ //routing 
    res.send("welcome")
})
app.listen(port, ()=>{
    console.log(`Server listening on port http://localhost:${port}`); //declaring the port as function 
});
