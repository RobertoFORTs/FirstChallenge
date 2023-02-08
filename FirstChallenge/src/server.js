const app = require('./app');

const port = 8000;

app.listen(port, ()=> {
    console.log(`Application runing on port ${port}...`);
});
