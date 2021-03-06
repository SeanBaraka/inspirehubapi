import { Router, Request, Response, NextFunction } from "express";
import { UserController } from '../controller/UserController'
import { getConnection, getRepository, useContainer } from "typeorm"
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { BAD_REQUEST, CREATED, ACCEPTED, FORBIDDEN, UNAUTHORIZED, OK } from "http-status-codes";

const router = Router()

router.get('/', UserController.prototype.all)

router.get('/:id', UserController.prototype.one);

// Used to create customers from the CRM administrative end
router.post('/customer/create', UserController.prototype.registerCustomer)

// This is similar to create only that it is used during the creation of a
// customer from the e-commerce self guided registration
router.post('/customer/register', UserController.prototype.register);

router.get('/customers/all', UserController.prototype.customers)

router.get('/customer/:id', UserController.prototype.oneCustomer)

router.post('/login', UserController.prototype.login)

router.get('/userroles/', UserController.prototype.roles);

router.post('/addusertorole', async (req, res, next ) => {
    let userid = req.body.userid
    let roleid = req.body.roleid

    let user = await getRepository(User).findOne(userid)
    let role = await getRepository(Role).findOne(roleid)

    if(user != null && role != null ) {
        user.role = role
        let updateUser = await getRepository(User).save(user)
        if(updateUser) {
            res.status(OK).json()
        } else {
            res.status(BAD_REQUEST).json("error, the operation is not successful")
        }
    } else {
        res.status(400).json("error, the operation is not successful")
    }
})

router.post('/adduserroles', async(req,res,next) => {
    let role = new Role()
    role = req.body

    let addAttempt = await getRepository(Role).save(role)

    if(addAttempt) {
        res.status(300).json("New Role added successfully: "+ JSON.stringify(addAttempt))
    } else {
        res.status(400).json("error, the operaton could not be completed")
    }
})


module.exports = router;
