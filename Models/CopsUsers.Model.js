import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import validator from "validator";

const cpoUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      maxlength: [20, "Username must be less than or equal to 10 characters."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    Brand_Name: { type: String, required: true },
    GST_No: { type: String, required: true },
    MID: { type: String, required: true },
    Registered_Address: { type: String, required: true },
    state: { type: String, required: true },
    regional: { type: Boolean,
        default: false },
    National: { type: Boolean,
        default: false},
    Initial_Balance: { type: Number, default: 0 }, // Assuming the initial balance is a number
    Number: { type: String, required: true },
    ABB_TestCharger: { type: String, required: true },
    Select_Price: { type: String, required: true },
    Fixed_Rent: { type: Number, default: 0 }, // Assuming the fixed rent is a number
    Company_Share: { type: Number, default: 0 },
    image: {
      type: String,
      default: "default_image.jpg",
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
  },
  {
    timestamps: {},
  }
);

cpoUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

cpoUserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
/**
 * Reset Password
 */
cpoUserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

cpoUserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

cpoUserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime());
    return JWTTimestamp < changedTimestamp;
  }
  // False means Not Changed
  return false;
};

export const CpoUser = mongoose.model("CpoUsers", cpoUserSchema);
