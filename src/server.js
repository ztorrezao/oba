import express from 'express';
import cors from 'cors';
import v1Routes from './routes';

const app = express();

const {PORT = 3000} = process.env;

app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

app.use(v1Routes);

// 404 error handler
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

// listening
app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`));