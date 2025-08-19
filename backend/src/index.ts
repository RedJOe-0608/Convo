import express from 'express'
import { createServer } from 'http';

const app = express();
const server = createServer(app);

app.get('/',(req,res)=> {
    res.send('<h1>Hello World</h1>')
})

app.listen(8000,()=> {
    console.log('server running at http://localhost:8000');
    
})