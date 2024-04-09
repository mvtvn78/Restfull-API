/*
  Author : Mvt
  GitHub : mvtvn78
*/
const express = require("express")
const app = express()
const morgan = require('morgan')
const bodyParser = require("body-parser")
// Mongoose
const AccountModel = require("./connnectDB")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
// CRUD
// RESFUL POST (Create)
// URL : http://domain/path
// http://localhost/user
// Notice : Default method of Browser is GET.
// You can download Postman to try another method it on your API
app.post('/api/v1/user', (req,res)=>{
  // send request with body data
  // using falsy to check user pass data to the body
  if(req.body.username && req.body.password)
  {
    AccountModel.findOne({
      username: req.body.username
    })
    .then(data=> {
      return (!data) ?  AccountModel.create( {
      username : req.body.username,
      password : req.body.password
     }) : new WebTransportError( " USER EXSIT")
    }
  )
    .then( data => { res.json( { status:200, data})})
    .catch( err => res.json({status: 401,err}))
  }
  else
  {
    res.json( {
      status : 400
    })
  }
})

// RESFUL GET (READ)
app.get('/api/v1/user', (req,res)=>{
  // Query Param Case
  if(req.query.username)
  {
    AccountModel.find( {
      username: req.query.username
    }).then(data => {
      res.json( 
       {
          status:200,
          data
       }
      )
    })
    .catch( err => res.json({err,status: "404"}))
  }
  // No Query Param
  else
  {
    AccountModel.find( {}).then(data => {
      res.json( 
       {
          status:200,
          data
       }
      )
    })
    .catch( err => res.json({err,status: "404"}))
  }
})

// RESFUL PUT(UPDATE) 
app.put('/api/v1/user', (req,res)=>{
  if(req.body.username && req.body.password)
  {
      return  AccountModel.updateOne( {
        username : req.body.username,
      }, {
      password : req.body.password
     })
    .then( data => { res.json( { status:200, data})})
    .catch( err => res.json({status: 401,err}))
  }
  else
  {
    res.json( {
      status : 400
    })
  }
})


// RESFUL DELETE(UPDATE) 
app.delete('/api/v1/user', (req,res)=>{
 // Query Param Case
 if(req.query.username)
 {
   AccountModel.deleteOne({
    username : req.query.username
   }).then(data => {
     res.json( 
      {
         status:200,
         data
      }
     )
   })
   .catch( err => res.json({err,status: "404"}))
 }
 // No Query Param
 else
 {
   AccountModel.deleteMany( {}).then(data => {
     res.json( 
      {
         status:200,
         title : " ALL Document be removed",
         data
      }
     )
   })
   .catch( err => res.json({err,status: "404"}))
 }
})
// OPEN PORT AND LISTEN
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})