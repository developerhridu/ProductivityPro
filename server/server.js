const app = require('./app');


const port = 5000;
app.listen(port, function (){
    console.log(`Server running on http://localhost:${port}`);
});