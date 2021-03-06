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
var typeorm_1 = require("typeorm");
var Role_1 = require("./Role");
var Customer_1 = require("./Customer");
var Admin_1 = require("./Admin");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "salt", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "emailAddress", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Role_1.Role; }, function (role) { return role.users; }, {
            cascade: true
        }),
        __metadata("design:type", Role_1.Role)
    ], User.prototype, "role", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Customer_1.Customer; }, function (customer) { return customer.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "customers", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Admin_1.Admin; }, function (admin) { return admin.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "admins", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
