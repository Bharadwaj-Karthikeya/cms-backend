import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
// import artifactRoutes from './routes/artifact.route.js';


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello World! Welcome to the CMS Backend API.'
    });
});

app.use('/auth', authRoutes);
// app.use('/artifacts', artifactRoutes);

export default app;
