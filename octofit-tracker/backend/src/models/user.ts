import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 30 },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);
export default UserModel;
