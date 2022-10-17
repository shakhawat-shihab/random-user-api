const express = require('express');
var cors = require('cors');

const userRoute = require('./routes/v1/user.router');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


app.use('/api/v1/users', userRoute);


app.get('/', (req, res) => {
    res.send('Hello World!')

})

app.get('*', (req, res) => {
    res.send('No Route Found')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
