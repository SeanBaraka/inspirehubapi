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
var ProductCategory_1 = require("./ProductCategory");
var OrderDetail_1 = require("./OrderDetail");
var Quotation_1 = require("./Quotation");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return ProductCategory_1.ProductCategory; }, function (pc) { return pc.products; }, {
            cascade: true
        }),
        __metadata("design:type", ProductCategory_1.ProductCategory)
    ], Product.prototype, "category", void 0);
    __decorate([
        typeorm_1.Column('float'),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return OrderDetail_1.OrderDetail; }, function (od) { return od.products; }),
        __metadata("design:type", Array)
    ], Product.prototype, "orders", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Product.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Product.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Quotation_1.Quotation; }, function (qt) { return qt.products; }),
        __metadata("design:type", Array)
    ], Product.prototype, "quotations", void 0);
    Product = __decorate([
        typeorm_1.Entity()
    ], Product);
    return Product;
}());
exports.Product = Product;
