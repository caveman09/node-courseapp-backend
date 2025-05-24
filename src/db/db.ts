import mongoose, { mongo } from "mongoose";
import { join } from "path";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
})

const creatorSchema = new Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
})

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Creator', required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const purchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    purchaseDate: { type: Date, default: Date.now }
})

const userModel = mongoose.model('User', userSchema);
const creatorModel = mongoose.model('Creator', creatorSchema);
const courseModel = mongoose.model('Course', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

export { userModel, creatorModel, courseModel, purchaseModel };