const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel');
// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler (async (req,res) =>{
    const goals  = await Goal.find();
    res.status(200).json(goals);
})

// @desc Post goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler( async (req,res) =>{
    console.log(req.body)
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field')
    } 

    const goal = await Goal.create({
        text:req.body.text
    })
    res.status(200).json(goal)
})

// @desc Update goals
// @route PUT /api/goals
// @access Private
const updateGoals = asyncHandler( async (req,res) =>{
   
   const goal = await Goal.findById(req.params.id);
   if(!goal){
       res.status(400);
       throw new Error('No record found!')
   }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new:true
  })
   res.status(200).json(updatedGoal)
})

// @desc Delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoals = asyncHandler (async (req,res) =>{

    const goal = await Goal.findById(req.params.id);
    if(!goal){
        req.status(400);
        throw new Error('No record found');
    }

    //const deletedGoal = await Goal.findByIdAndDelete(req.params.id, req.body);
    await goal.remove();
    res.status(200).json({id:req.params.id})
})


module.exports = {
    getGoals,setGoals,updateGoals,deleteGoals
}