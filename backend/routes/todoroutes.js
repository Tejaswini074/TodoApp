const express = require ("express");
const Todo = require ("../models/ToDo");
const router = express.Router();

router.post("/",async (req,res)=>{
    const todo =await Todo.create(req.body);
    res.json(todo);
});

router.get("/",async(req,res)=>{
    const todos =await Todo.findAll();
    res.json(todos);
});

router.put("/:id",async(req,res)=>{
    await Todo.update(req.body,{where: {id:req.params.id}});
    res.send("updated");
});

router.delete("/:id",async (req,res)=>{
    await Todo.destroy({where:{id:req.params.id}});
    res.send("Deleted");
});

module.exports =router;