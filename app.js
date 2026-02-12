import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import artifactRouter from './routes/artifact.route.js';
import likeRouter from './routes/likes.route.js'
import commentRouter from './routes/comment.route.js';
import chatRouter from './routes/chats.route.js';
import webhookRouter from './webhook/webhook.js';


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

app.use('/webhook', webhookRouter);

app.use('/auth', authRouter);
app.use('/artifacts', artifactRouter);
app.use('/likes', likeRouter);
app.use('/comments', commentRouter);
app.use('/chats', chatRouter);

export default app;