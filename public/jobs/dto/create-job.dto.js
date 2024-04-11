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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class Company {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Company.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
class CreateJobDto {
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name cannot be empty' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Skills cannot be empty' }),
    (0, class_validator_1.IsArray)({ message: 'Skills the format must be of type array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Skills the format must be of type string' }),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Company cannot be empty' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Company),
    __metadata("design:type", Company)
], CreateJobDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Location cannot be empty' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Salary cannot be empty' }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity cannot be empty' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Level cannot be empty' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'startDate cannot be empty' }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)({ message: 'startDate is format Date' }),
    __metadata("design:type", Date)
], CreateJobDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'endDate cannot be empty' }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)({ message: 'endDate is format Date' }),
    __metadata("design:type", Date)
], CreateJobDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'isActive cannot be empty' }),
    (0, class_validator_1.IsBoolean)({ message: 'isActive is format boolean' }),
    __metadata("design:type", Boolean)
], CreateJobDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-job.dto.js.map