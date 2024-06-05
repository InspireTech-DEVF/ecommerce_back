import mongoose from 'mongoose'

// Esquema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    match: /.+\@.+\..+/ 
  },
  password: {
    type: String, 
    required: true,
    minlength: 8 
  },
  name: {
    type: String, 
    required: true 
  },
  last_name: {
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
}) 

// Índices para mejorar el rendimiento de las búsquedas
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;
