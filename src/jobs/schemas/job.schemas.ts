import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type JobsDocument = HydratedDocument<Jobs>;

@Schema({
  timestamps: true,
})
export class Jobs {
  @Prop()
  name: string;

  @Prop()
  skills: string[];

  @Prop()
  company: string;

  @Prop()
  location: string;

  @Prop()
  salary: number;

  @Prop()
  quantity: string; // số lượng tuyển

  @Prop()
  level: string; // Vị trí INTERN/FRESHER/JUNIOR/SENIOR

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };

  @Prop()
  deletedBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
}

export const JobsSchema = SchemaFactory.createForClass(Jobs);
