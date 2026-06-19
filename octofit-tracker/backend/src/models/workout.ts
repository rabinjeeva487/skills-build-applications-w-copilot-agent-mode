import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, enum: ['Endurance', 'Strength', 'Mobility', 'Fat Burn'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    intensity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true },
    targetSkillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model<Workout>('Workout', workoutSchema);
export default WorkoutModel;
