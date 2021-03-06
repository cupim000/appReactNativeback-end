import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

import './database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`🏃 Server Online on port ${PORT}`);
});
