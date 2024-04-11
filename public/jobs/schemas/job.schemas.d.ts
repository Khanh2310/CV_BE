/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { HydratedDocument } from 'mongoose';
export type JobsDocument = HydratedDocument<Jobs>;
export declare class Jobs {
    name: string;
    skills: string[];
    company: {
        _id: mongoose.Types.ObjectId;
        name: string;
    };
    location: string;
    salary: number;
    quantity: string;
    level: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: Date;
    createdBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Types.ObjectId;
        email: string;
    };
}
export declare const JobsSchema: mongoose.Schema<Jobs, mongoose.Model<Jobs, any, any, any, mongoose.Document<unknown, any, Jobs> & Jobs & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Jobs, mongoose.Document<unknown, {}, mongoose.FlatRecord<Jobs>> & mongoose.FlatRecord<Jobs> & {
    _id: mongoose.Types.ObjectId;
}>;
