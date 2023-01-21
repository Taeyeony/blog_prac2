const express = require('express');

const router = require('./routes')
const { sequelize } = require('./models');

const app = express();

app.use(express.json()); // body로 들어오는 데이터를 해석하는 middleware
app.use('/api', router); // api 주소로 들어 온 요청들을 router로 보냄

app.listen(3000, async () => {
  console.log('server started!');
  await sequelize.authenticate();
  console.log('db authenticated!');
})