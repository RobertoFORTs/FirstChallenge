const app = require('./app');

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Application runing on port ${port}...`);
});
