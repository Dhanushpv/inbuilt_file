const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accessControl =require('../util/access-control').accessControl

function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }

}


router.post('/user',userController.create1);
router.get('/user',userController.getall);
router.get('/users/:id',userController.getsingle);
// router.put('/singleUpdate/:id',userController.update);
router.delete('/userDelete/:id',userController.delete);
// router.put('/resetPassword/:id',setAccessControl('2'),userController.resetPassword);
// router.post('/forgot_password',setAccessControl('*'),userController.forgetPassword);
// router.patch('/reset-password', setAccessControl('*') ,userController.passwordResetController);

module.exports = router;