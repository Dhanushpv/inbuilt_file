let users = require('../db/models/user');
const usertype = require('../db/models/user_type');
const { success_function, error_function } = require('../util/userResponse')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendemail = require('../util/send-email').sendEmail
const resetpassword = require('../util/Email_template/setpassword').resetPassword
const resetpasswords = require('../util/Email_template/resetPassword').resetPassword
const fileUpload = require('../util/uploads').fileUpload;
const { dataUpload ,  getserverData } = require('../util/uploads');
const dotevn = require('dotenv');
dotevn.config();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
    
// exports.create1 = async function (req, res) {

//     try {

//         let body = req.body;
//         console.log('body',body);

//         // let password = body.password;
//         let emails = body.email
//         let name = body.name
//         let password =body.password

//         let image = req.body.image;
//             console.log("image : ", image);


//         let user_type = await usertype.findOne({user_type : body.user_type});
//         console.log("user type" , user_type);

//         let id = user_type._id
//         console.log("id",id)


//         body.user_type=id

//         if (image) {
//             let image_path = await fileUpload(image, "users");
//             console.log("image_path", image_path);
//             body.image = image_path;
//             }

//           let salt = bcrypt.genSaltSync(10);
//           let hashed_password = bcrypt.hashSync(password, salt);
//           console.log("password : ",password)
  
//           let userId = uuidv4();
        
//         random_body={
//             id: userId,
//             name : body.name,
//             email : body.email,
//             phoneno : body.phoneno,
//             password : hashed_password,
//             user_type : body.user_type,
//             image : body.image

//           }

//           let serverData = await getserverData()
//           console.log("serverData",serverData)
//           let strbody 
//           if(serverData === null){
//             let dataArr=[]
//               dataArr.push(random_body);
//             console.log('dataArr',dataArr)
//             strbody = JSON.stringify(dataArr)

//           }else{
//             let parsed_data = JSON.parse(serverData);
           
//             let dataArr
//             console.log("server adata",parsed_data,typeof(parsed_data));
//             // ser.push(parsed_data);
//             console.log('dataArr',dataArr);
  
//             parsed_data.push(random_body);
//             console.log('parsed ... ... ...',parsed_data);
//             strbody = JSON.stringify(parsed_data);
//           }


          

          
//         await dataUpload(strbody,'datas')

//         // let userData = await users.create(random_body);
//         // console.log('userData',userData);

//         let response = success_function({
//             success: true,
//             statuscode: 200,
//             message: "successfully added..",
//             // data:userData
            
//         })
//         res.status(response.statuscode).send(response)
//         return;

//     } catch (error) {

//         console.log("error : ", error);
//         let response = error_function({
//             success: false,
//             statuscode: 400,
//             message: "error"
            
//         })
//         res.status(response.statuscode).send(response)
//         return;
//     }
// }

exports.getall= async function(req,res){
    try {

      const filePath = path.join(__dirname, 'datas.json');
      const fileData = await fs.readFile(filePath, 'utf-8');

      const getuserData = JSON.parse(fileData);
      console.log("getuserData", getuserData);
      console.log("getuserData : ",getserverData)

      //  getuserData= await users.find();
      //  console.log("getuserData",getuserData);


       let response = success_function({
        success: true,
        statuscode: 200,
        data :getuserData,
        message: "successfully get all data ..",

    })
    res.status(response.statuscode).send(response)
    return;

} catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}
}

// exports.getsingle = async function (req,res){
//     try {

//         Singleid = req.params.id
//         console.log("Singleid",Singleid);

//         SingleData = await users.findOne({_id :Singleid});
//         console.log("SingleUser",SingleData);

//         let response = success_function({
//          success: true,
//          statuscode: 200,
//          data : SingleData,
//          message: "successfully get the single data.."
//      })
//      res.status(response.statuscode).send(response)
//      return;
 
//  } catch (error) {
 
//      console.log("error : ", error);
//      let response = error_function({
//          success: false,
//          statuscode: 400,

//          message: "error"
//      })
//      res.status(response.statuscode).send(response)
//      return;
//  }

// }

// exports.update = async function (req,res){
    
//     try {
//         let body = req.body;
//         console.log("body",body);



//         let data= {
//             name : body.name,
//             email : body.email,
//             phoneno : body.phoneno,
//             password : body.password,
//             usertype : body.user_type
//         }

        
//     updateId = req.params.id 
//     console.log("updateId",updateId);

//     let update_employee = await users.updateOne({_id : updateId},data);
//     console.log("updateemployee",update_employee);

//     let response = success_function({
//         success: true,
//         statuscode:200,
//         data:update_employee,
//         message: "successfully Updated..",
        
//     })
//     res.status(response.statuscode).send(response)
//     return;

    

//     } catch (error) {

//     console.log("error : ", error);
//     let response = error_function({
//         success: false,
//         statuscode: 400,
//         message: "error"
//     })
//     res.status(response.statuscode).send(response)
//     return;
// }


// }

// exports.delete = async function (req,res){
//     try {
//         DeleteId = req.params.id 
//         console.log("DeleteId",DeleteId);

//         deleteData = await users.deleteOne ({_id : DeleteId});
//         console.log("deleteData",deleteData);

//     let response = success_function({
//         success: true,
//         statuscode: 200,
//         message: "successfully deleted.."
//     })
//     res.status(response.statuscode).send(response)
//     return;

//     } catch (error) {

//     console.log("error : ", error);
//     let response = error_function({
//         success: false,
//         statuscode: 400,
//         message: "error"
//     })
//     res.status(response.statuscode).send(response)
//     return;
// }
// }

// exports.resetPassword =async function(req,res){
//     try {
        
//         _id =req.params.id;
//         console.log(_id)

//         let user = await users.findOne({_id : _id});
//         console.log("user",user)

//         let passwordMatch =  bcrypt.compareSync(req.body.password,user.password);
//         console.log("passwordMatch",passwordMatch);

//         if(passwordMatch){
//             let newpassword = req.body.newpassword;

//             let salt = bcrypt.genSaltSync(10);
//             let hashed_password = await bcrypt.hash(newpassword,salt);

//             console.log("hashed_password",hashed_password)


//             req.body.password=hashed_password
//             console.log("new password",req.body.password)



//             let updatePassword = await users.updateOne({_id},{$set:{password : req.body.password}});
//             console.log(updatePassword)

            
//             let response = success_function({
//                 success: true,
//                 statuscode: 200,
//                 data :updatePassword,
//                 message: "Password reset completed successfully..."
//             })
//             res.status(response.statuscode).send(response)
//             return;


//         }

//     } catch (error) {
//         console.log("error : ", error);
//         let response = error_function({
//             success: false,
//             statuscode: 400,
//             message: "error"
//         })
//         res.status(response.statuscode).send(response)
//         return;
//     }



      
// }

// exports.forgetPassword = async function (req, res) {
//     try {
//       let email = req.body.email;
//       if (email) {
//         let user = await users.findOne({ email: email });
//         console.log("user", user);
  
//         if (user) {
//           let reset_token = jwt.sign(
//             { user_id: user._id },
//             process.env.PRIVATE_KEY,
//             { expiresIn: "10m" }
//           );
  
//           let data = await users.updateOne(
//             { email: email },
//             { $set: { password_token: reset_token } }
//           );
//           console.log("email for update:", email);
//           console.log("user found:", reset_token);
//           console.log("data : ",data)

  
//           if (data.matchedCount === 1 && data.modifiedCount == 1) {
//             let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
//             let email_template = await resetpasswords(user.first_name, reset_link);
//             sendemail(email, "Forgot password", email_template);
//             let response = success_function({
//               status: 200,
//               message: "Email sent successfully",
//             });
//             res.status(response.statuscode).send(response);
//             return;
//           } else if (data.matchedCount === 0) {
//             let response = error_function({
//               status: 404,
//               message: "User not found",
//             });
//             res.status(response.statuscode).send(response);
//             return;
//           } else {
//             let response = error_function({
//               status: 400,
//               message: "Password reset failed",
//             });
//             res.status(response.statuscode).send(response);
//             return;
//           }
//         } else {
//           let response = error_function({ status: 403, message: "Forbidden" });
//           res.status(response.statuscode).send(response);
//           return;
//         }
//       } else {
//         let response = error_function({
//           status: 422,
//           message: "Email is required",
//         });
//         res.status(response.statuscode).send(response);
//         return;
//       }
//     } catch (error) {
//       console.log("Error in forgetPassword:", error);
//       let response = error_function({
//         status: 500,
//         message: "Internal Server Error",
//       });
//       res.status(response.statuscode).send(response);
//     }
// };

// exports.passwordResetController = async function (req, res) {
//     try {
//       const authHeader = req.headers["authorization"];
//       const token = authHeader.split(" ")[1];
  
//       let password = req.body.password;
//       console.log("password :",password);

//       decoded = jwt.decode(token);
//       console.log("decode : ",decoded)
 
//       let user = await users.findOne({
//         $and: [{ _id: decoded.user_id }, { password_token: token }],
//       });
//       console.log("user",user)
//       if (user) {
//         let salt = bcrypt.genSaltSync(10);
//         let password_hash = bcrypt.hashSync(password, salt);
//         let data = await users.updateOne(
//           { _id: decoded.user_id },
//           { $set: { password: password_hash, password_token: null } }
//         );
//         if (data.matchedCount === 1 && data.modifiedCount == 1) {
//           let response = success_function({
//             status: 200,
//             message: "Password changed successfully",
//           });
//           res.status(response.statuscode).send(response);
//           return;
//         } else if (data.matchedCount === 0) {
//           let response = error_function({
//             status: 404,
//             message: "User not found",
//           });
//           res.status(response.statuscode).send(response);
//           return;
//         } else {
//           let response = error_function({
//             status: 400,
//             message: "Password reset failed",
//           });
//           res.status(response.statuscode).send(response);
//           return;
//         }
//       }else{
//         let response = error_function({ status: 403, message: "Forbidden" });
//       res.status(response.statuscode).send(response);
//       return;
//       }

      
//     }  catch (error) {
//       console.log("error : ", error);
//       let response = error_function({
//           success: false,
//           statuscode: 400,
//           message: "error"
//       })
//       res.status(response.statuscode).send(response)
//       return;
//     }
// };
