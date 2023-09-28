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
PlanSchema.methods.toJSON = function() {
    const {__v, ...plan} = this.toObject()
    return plan
}
const ModelPlan = mongoose.model('planes', PlanSchema)

module.exports = ModelPlan