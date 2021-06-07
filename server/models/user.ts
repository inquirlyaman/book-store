import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    roles: {
        type: Array,
        default: ['customer']
    }
})
const User = mongoose.model('User', userSchema);
export {User};