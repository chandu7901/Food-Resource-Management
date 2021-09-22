const express=require('express')
const connectDB=require('./config/db')
const User=require('./models/User')
// const {check,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
const cors=require('cors')

const app=express();
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',require('./routes/api/auth')) // login
app.use('/api/users',require('./routes/api/users')) // register a user 
app.use('/api/admin/auth',require('./routes/api/adminauth')) //admin login
app.use('/api/admin/users',require('./routes/api/admin')) // register admin
app.use('/api/profile',require('./routes/api/userProfile')) // user profile
app.use('/api/responses',require('./routes/api/userResponses')) // absent and present 
app.use('/api/admin/addtimetable',require('./routes/api/addTimeTable')) //add timetable
app.use('/api/admin/addDetails',require('./routes/api/addFullDetails')) // adding messname and 
app.use('/api/admin/wastage',require('./routes/api/foodUpdates'))
// app.use('/api/responses',require('./routes/api/userResponses'))
app.get('/',(req,res)=>{
    res.send('API running')
})
connectDB();
app.listen(PORT,()=>{
    console.log("listening in port 5000")
})