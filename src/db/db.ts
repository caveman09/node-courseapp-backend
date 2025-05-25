import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

creatorSchema.pre('save', function (next) {
    const creator = this;
    if (!creator.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(creator.password, salt, (err, hash) => {
            if (err) return next(err);
            creator.password = hash;
            next();
        });
    });
});

const userModel = mongoose.model('User', userSchema);
const creatorModel = mongoose.model('Creator', creatorSchema);
const courseModel = mongoose.model('Course', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

export { userModel, creatorModel, courseModel, purchaseModel };