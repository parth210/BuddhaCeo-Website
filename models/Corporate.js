const mongoose=require('mongoose')
const CorporateSchema= new mongoose.Schema(
{
    name:{type:String, required:true},
    title:{type:String,required:true},
    company:{type:String,required:true},
    domain:{type:String,required:true},
    purpose:{type:String,required:true},
    timeframe:{type:String,required:true},
   target:{type:String,required:true},
    additonal_info:{type:String,required:true},
}
);
module.exports=mongoose.model('Corporate',CorporateSchema)
