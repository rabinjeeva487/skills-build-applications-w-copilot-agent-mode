import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Run', 'Cycle', 'Strength', 'Yoga', 'HIIT'], required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model<Activity>('Activity', activitySchema);
export default ActivityModel;
