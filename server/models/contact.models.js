import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, trim: true, default: "" },
    service: {
      type: String,
      required: true,
      enum: ["Laptop Purchase", "Co-Working Space", "Training Academy", "General Enquiry", "Technical Support", "Partnership"],
    },
    message: { type: String, required: true, trim: true },
    status:  {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  { timestamps: true }
);

contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ name: "text", email: "text", message: "text" });

export default mongoose.model("Contact", contactSchema);