const mongoose = require('mongoose')
const PlanSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    imagen:{
        type:String,
        required:true
    },
    
})
ServiceSchema.methods.toJSON = function() {
    const {__v, ...service} = this.toObject()
    return service
}
const ModelPlan = mongoose.model('planes', ServiceSchema)

module.exports=ModelPlan