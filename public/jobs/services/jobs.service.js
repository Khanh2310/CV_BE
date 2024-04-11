"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const api_query_params_1 = require("api-query-params");
let JobsService = class JobsService {
    constructor(jobsModel) {
        this.jobsModel = jobsModel;
    }
    async create(createJobDto, user) {
        const { name, skills, location, company, salary, quantity, level, description, startDate, endDate, isActive, } = createJobDto;
        if (startDate < endDate) {
            const newJob = await this.jobsModel.create({
                name,
                skills,
                location,
                company,
                salary,
                quantity,
                level,
                description,
                startDate,
                endDate,
                isActive,
                createdBy: {
                    _id: user?._id,
                    email: user?.email,
                },
            });
            return {
                _id: newJob._id,
                createdAt: newJob.createdAt,
            };
        }
        else {
            throw new common_1.BadRequestException('startDate cannot be greater than endDate ');
        }
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        const offset = (+currentPage - 1) * +limit;
        const defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.jobsModel.find(filter)).length;
        const totalPage = Math.ceil(totalItems / defaultLimit);
        const result = await this.jobsModel
            .find(filter)
            .skip(offset)
            .sort(String(sort))
            .limit(defaultLimit)
            .populate(population)
            .exec();
        return {
            meta: {
                currentPage: currentPage ? currentPage : 1,
                pageSize: limit ? limit : 10,
                pages: totalPage,
                total: totalItems,
            },
            result,
        };
    }
    findOne(id) {
        return `This action returns a #${id} job`;
    }
    async update(id, updateJobDto, user) {
        const { startDate, endDate } = updateJobDto;
        if (startDate < endDate) {
            return this.jobsModel.updateOne({
                _id: id,
            }, {
                ...updateJobDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email,
                },
            });
        }
        else {
            throw new common_1.BadRequestException('startDate cannot be greater than endDate');
        }
    }
    async remove(id, user) {
        await this.jobsModel.updateOne({
            _id: id,
        }, {
            deletedBy: {
                _id: user._id,
                email: user.email,
            },
        });
        return this.jobsModel.softDelete({
            _id: id,
        });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Jobs.name)),
    __metadata("design:paramtypes", [Object])
], JobsService);
//# sourceMappingURL=jobs.service.js.map