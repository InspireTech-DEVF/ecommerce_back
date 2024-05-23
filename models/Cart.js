import mongoose from 'mongoose'


cartSchema.pre('save', function(next) {
  this.sumTotal = this.quantity * this.unitPrice
  next()
})

// Modifica el esquema para incluir sumTotal
const cartSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  item_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
  quantity: {type: Number, required: true},
  unitPrice: {type: Number, required: true},
  sumTotal: {type: Number},
  isActive: {type: Boolean, default: true}
}, { timestamps: true })

  

  const Cart = mongoose.model('Cart', cartSchema)
  
  export default Cart