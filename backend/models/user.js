import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Must be provided"]
    },
    password: {
        type: String,
        required: [true, "Must be provided"]
    }
});

export default mongoose.model('User', userSchema);
