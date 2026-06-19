import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalPoints: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<Leaderboard>('Leaderboard', leaderboardSchema);
export default LeaderboardModel;
