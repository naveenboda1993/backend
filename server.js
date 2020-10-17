const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const _ = require('lodash');
const PORT = process.env.PORT || 3000
// const logger = require('morgan');

const app = express(); //instance of express
app.use(cors());



const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const { User } = require('./helpers/UserClass')

require('./socket/streams')(io, User, _);
require('./socket/private')(io);

const dbConfig = require('./config/secret');
const auth = require('./routes/authRoutes.js');
const posts = require('./routes/postRoutes.js');
const users = require('./routes/userRoutes.js');
const friends = require('./routes/friendsRoutes.js');
const message = require('./routes/messageRoutes.js');
const image = require('./routes/imageRoutes.js');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET','POST','DELETE','PUT','OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

app.use(express.json({ limit: '50mb' })); //limit for exp images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());
// app.use(logger('dev')); 
//only for development

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
});






app.use('/api', auth);
app.use('/api/chat', posts);
app.use('/api/chat', users);
app.use('/api/chat', friends);
app.use('/api/chat', message);
app.use('/api/chat', image);

app.get("/",(req,res)=>{
    res.send("Hello HMS BACKEND")
})
server.listen(PORT, () => {
    console.log(`Running on new port ${PORT}`);
});