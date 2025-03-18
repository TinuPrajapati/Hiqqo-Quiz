const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
});
=======
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: { type: String, required: [true,"Password is required"] },
    otp: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
>>>>>>> a43fa47b10bedaa6da57211b7acd47ee71be4387

// hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrypt.hash(this.password, 10);
  }
  next();
});

// method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
