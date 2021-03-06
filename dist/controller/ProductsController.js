"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Product_1 = require("../entity/Product");
var http_status_codes_1 = require("http-status-codes");
var ProductCategory_1 = require("../entity/ProductCategory");
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.products = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Product_1.Product).find({ relations: ['category', 'orders'] })];
                    case 1:
                        products = _a.sent();
                        if (products == null || products.length <= 0)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: "Not found" });
                        res.status(http_status_codes_1.OK).json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.getOneProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Product_1.Product).findOne(req.params.productcode, { relations: ['category'] })];
                    case 1:
                        product = _a.sent();
                        if (product == null)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: http_status_codes_1.NOT_FOUND });
                        res.status(http_status_codes_1.OK).json(product);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.productsByCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var productCategory, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productCategory = req.params.categoryId;
                        return [4 /*yield*/, typeorm_1.getRepository(Product_1.Product).find({
                                where: { category: { id: productCategory } },
                                relations: ['orders']
                            })];
                    case 1:
                        products = _a.sent();
                        if (products == null || products.length <= 0)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: "No product matching the category was found" });
                        res.status(http_status_codes_1.OK).json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.categories = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var productCategories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(ProductCategory_1.ProductCategory).find()];
                    case 1:
                        productCategories = _a.sent();
                        if (productCategories === null || productCategories.length <= 0)
                            res.status(http_status_codes_1.NOT_FOUND).json({ error: "Not found" });
                        res.status(http_status_codes_1.OK).json(productCategories);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.createcategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var category, categoryInsertAttempt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = new ProductCategory_1.ProductCategory();
                        category = req.body;
                        if (category == null)
                            res.status(http_status_codes_1.BAD_REQUEST).json({ error: http_status_codes_1.BAD_REQUEST });
                        return [4 /*yield*/, typeorm_1.getRepository(ProductCategory_1.ProductCategory).save(category)];
                    case 1:
                        categoryInsertAttempt = _a.sent();
                        if (!categoryInsertAttempt)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: "An error caused the operation not to be successful" });
                        res.status(http_status_codes_1.ACCEPTED).json({ success: categoryInsertAttempt });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.createproduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var product, _a, productInsertAttempt;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product = req.body;
                        if (product == null)
                            res.status(http_status_codes_1.BAD_REQUEST).json({ error: http_status_codes_1.BAD_REQUEST });
                        _a = product;
                        return [4 /*yield*/, typeorm_1.getRepository(ProductCategory_1.ProductCategory).findOne(req.body.categoryId)];
                    case 1:
                        _a.category = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Product_1.Product).save(product)];
                    case 2:
                        productInsertAttempt = _b.sent();
                        if (!productInsertAttempt)
                            res.status(http_status_codes_1.NOT_MODIFIED).json({ error: "An error cause the operation not to be successful" });
                        res.status(http_status_codes_1.ACCEPTED).json({ success: productInsertAttempt });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductsController;
}());
exports.ProductsController = ProductsController;
