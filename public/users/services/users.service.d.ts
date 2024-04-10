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
import mongoose from 'mongoose';
import { User as UserM, UserDocument } from '../schemas';
import { CreateUserDto, RegisterUserDto, UpdateUserDto } from '../dto';
import { IUser } from '../types';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
export declare class UsersService {
    private UserModel;
    constructor(UserModel: SoftDeleteModel<UserDocument>);
    getHashPassword: (Hashpassword: string) => string;
    create(createUserDto: CreateUserDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    findOneByUserName(username: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    isValidPassword(password: string, hash: string): boolean;
    remove(id: string, user: IUser): Promise<"User not found" | {
        deleted: number;
    }>;
    register(user: RegisterUserDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | "User not found">;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, UserM> & UserM & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    updateRefreshToken(refreshToken: string, _id: string): Promise<mongoose.UpdateWriteOpResult>;
    findUserByRefreshToken(refreshToken: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, UserM> & UserM & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
}
