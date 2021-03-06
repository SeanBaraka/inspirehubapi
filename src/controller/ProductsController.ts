import { Response, Request, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { NOT_FOUND, OK, BAD_REQUEST, NOT_MODIFIED, ACCEPTED } from "http-status-codes";
import { ProductCategory } from "../entity/ProductCategory";
import { OrderDetail } from "../entity/OrderDetail";

export class ProductsController {

    async products(req: Request, res: Response, next: NextFunction) {
        let products = await getRepository(Product).find({relations: ['category', 'orders']})
        if (products == null || products.length <= 0) res.status(NOT_FOUND).json({error: "Not found"})

        res.status(OK).json(products)
    }

    async getOneProduct(req: Request, res: Response, next: NextFunction) {
        let product = await getRepository(Product).findOne(req.params.productcode, {relations: ['category']})

        if (product == null) res.status(NOT_FOUND).json({error: NOT_FOUND})

        res.status(OK).json(product)
    }

    async productsByCategory(req: Request, res: Response, next: NextFunction) {
        let productCategory = req.params.categoryId

        let products = await getRepository(Product).find({
            where: {category: {id: productCategory}},
            relations: ['orders']
        })

        if (products == null || products.length <= 0) res.status(NOT_FOUND).json({error: "No product matching the category was found"})

        res.status(OK).json(products)
    }


    async categories(req: Request, res: Response, next: NextFunction) {
        let productCategories = await getRepository(ProductCategory).find()

        if (productCategories === null || productCategories.length <= 0) res.status(NOT_FOUND).json({error: "Not found"})

        res.status(OK).json(productCategories)
    }

    async createcategory(req: Request, res: Response, next: NextFunction) {
        let category = new ProductCategory()
        category = req.body
        if (category == null) res.status(BAD_REQUEST).json({error: BAD_REQUEST})
        let categoryInsertAttempt = await getRepository(ProductCategory).save(category)

        if (!categoryInsertAttempt) res.status(NOT_MODIFIED).json({error: "An error caused the operation not to be successful"})

        res.status(ACCEPTED).json({success: categoryInsertAttempt})
    }

    async createproduct(req: Request, res: Response, next: NextFunction) {
        let product: Product
        product = req.body

        if (product == null) res.status(BAD_REQUEST).json({error: BAD_REQUEST})

        product.category = await getRepository(ProductCategory).findOne(req.body.categoryId)

        let productInsertAttempt = await getRepository(Product).save(product)

        if (!productInsertAttempt) res.status(NOT_MODIFIED).json({error: "An error cause the operation not to be successful"})

        res.status(ACCEPTED).json({success: productInsertAttempt})
    }

    async removeCategory(req: Request, res: Response, next: NextFunction) {
        const categoryRepo = await getRepository(ProductCategory);
        const id = req.params.id // Get the category id passed with the request object.
        // the category to be deleted
        const category = await categoryRepo.findOne(id)

        const removeCategory = await categoryRepo.delete(category.id)

        console.log(removeCategory)

    }

    async removeProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id

    }

}