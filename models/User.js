import mongoose from 'mongoose'

//Esquema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: {type:String, unique:true, required:true},
    name:{type:String, required:true},
    last_name:{type:String, required:true},
  }, { timestamps: true }) 
  

  const User = mongoose.model('User', userSchema)
  
  export default User