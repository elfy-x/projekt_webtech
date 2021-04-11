const express = require('express');
const index_router = require('./app/controller');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
app.use('/', index_router);
app.listen(4000, () => {
    console.log('listening on port 4000');
})
