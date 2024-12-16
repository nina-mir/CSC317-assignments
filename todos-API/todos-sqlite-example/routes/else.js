const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({message : "wilkommen sie! /else endpoint ist huebsch!"})
})

router.get("/group-2", (req, res)=>{
    // res.json({message : "let's add some routes!"})
    res.sendFile("C:\\Users\\ninam\\Documents\\SF-State\\temp\\CSC317-assignments\\todos-API\\todos-sqlite-example\\public\\else\\else.html")
})

router.get('/greet/:name', (req, res)=>{
    // console.log(req)
    let {name} = req.params
    // let name = req.params.name
    res.json({message: `Hallo to ${name}`});
})


module.exports = router;