const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{type:'string', required:true},
        email:{type:'string', required:true, unique: true},
        password:{type:'string', required:true},
    },
    {
        collection: 'stores'
    }
)

module.exports = mongoose.model('stores', UserSchema)