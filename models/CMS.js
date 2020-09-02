const mongoose=require('mongoose')
const CMSchema=new mongoose.Schema(
    {
        page:{type:String,required:true},
        type:{type:String,required:true},
        elements:[{
            rank:{type:String},
            data:[{
                name:{type:String},
                value:{type:String}
              }]
          }]
    }
)
module.exports=mongoose.model("CMS",CMSchema)
