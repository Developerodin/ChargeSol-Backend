import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [20, 'Username must be less than or equal to 10 characters.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        
        required: [true, 'Please provide a password'],
        minlength: 4
    },
    phone_number: {
        type: Number,
        unique: true,
        required: [true, 'Please provide a phone number'],
        minlength: 10
    },
    notification: {
        type: String,
        default: 1
    },
    is_muted: {
        type: String,
        default: 1
    },
    image: {
        type: String,
        default: 'default_image.jpg'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    status: {
        type: Boolean,
        default: true,
      },
    active: {
        type: Boolean,
        default: false,
    },
    cpoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CpoUsers',
        required: true,
      }
},
    {
        timestamps: {
        }
    });

    CustomerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

CustomerSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
/**
 * Reset Password
 */
CustomerSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

CustomerSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

CustomerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime());
        return JWTTimestamp < changedTimestamp;
    }
    // False means Not Changed
    return false;
}



export const CustomerModel = mongoose.model('Customers', CustomerSchema);