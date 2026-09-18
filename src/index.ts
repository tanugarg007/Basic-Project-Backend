import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/Approuter';
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
  origin: '*', 
  methods: '*',        
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.use('/users', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);       
})
