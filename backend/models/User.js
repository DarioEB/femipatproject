import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: { type: String, required: false, trim: true },
    lastname: { type: String, required: false, trim: true},
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: false, trim: true },
    role: { 
        type: String, 
        enum: {
            values: ['admin', 'staff'],
            message: '{VALUE} no es un rol válido',
            required: true,
        },  
        default: 'client'
    },
    authToken: { type: String, required: false },
    signToken: { type: String, required: false },
    confirmed: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;