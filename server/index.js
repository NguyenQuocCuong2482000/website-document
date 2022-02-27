require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth') 
const postRouter = require('./routes/post')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.gawba.mongodb.net/mern-learnit?retryWrites=true&w=majority`, 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
        )

        console.log('Mongodb connected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000   //5000 là development ; process.env.PORT tự có khi mà chúng ta deploy lên heroku thì nó sẽ ko dùng cái port 5000 nữa

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))