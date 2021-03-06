import { Router } from "express";
import { ProductsController } from "../controller/ProductsController";

const router = Router()

router.get('/', ProductsController.prototype.products)

router.get('/:productcode', ProductsController.prototype.getOneProduct);

router.get('/category/:categoryId', ProductsController.prototype.productsByCategory);

router.get('/categories/all', ProductsController.prototype.categories);

router.post('/createcategory', ProductsController.prototype.createcategory);

router.post('/createproduct', ProductsController.prototype.createproduct);

router.delete('/categories/remove/:id', ProductsController.prototype.removeCategory);

router.delete('/products/remove/:id', ProductsController.prototype.removeProduct)

module.exports = router;
