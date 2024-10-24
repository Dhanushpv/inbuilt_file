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
    
exports.create1 = async function (req, res) {

    try {

        let body = req.body;
        console.log('body',body);

        // let password = body.password;
        let emails = body.email
        let name = body.name
        let password =body.password

        let image = req.body.image;
            console.log("image : ", image);


        let user_type = await usertype.findOne({user_type : body.user_type});
        console.log("user type" , user_type);

        let id = user_type._id
        console.log("id",id)


        body.user_type=id

        if (image) {
            let image_path = await fileUpload(image, "users");
            console.log("image_path", image_path);
            body.image = image_path;
            }

          let salt = bcrypt.genSaltSync(10);
          let hashed_password = bcrypt.hashSync(password, salt);
          console.log("password : ",password)
  
          let userId = uuidv4();
        
        random_body={
            id: userId,
            name : body.name,
            email : body.email,
            phoneno : body.phoneno,
            password : hashed_password,
            user_type : body.user_type,
            image : body.image

          }

          let serverData = await getserverData()
          console.log("serverData",serverData)
          let strbody 
          if(serverData === null){
            let dataArr=[]
              dataArr.push(random_body);
            console.log('dataArr',dataArr)
            strbody = JSON.stringify(dataArr)

          }else{
            let parsed_data = JSON.parse(serverData);
           
            let dataArr
            console.log("server adata",parsed_data,typeof(parsed_data));
            // ser.push(parsed_data);
            console.log('dataArr',dataArr);
  
            parsed_data.push(random_body);
            console.log('parsed ... ... ...',parsed_data);
            strbody = JSON.stringify(parsed_data);
          }


          

          
        await dataUpload(strbody,'datas')

        // let userData = await users.create(random_body);
        // console.log('userData',userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            message: "successfully added..",

            
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

exports.getall= async function(req,res){
    try {

      const filePath = path.join(__dirname, '../Datas/datas', 'datas.json');
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

exports.getsingle = async function (req, res) {
  try {
      const dataFilePath = path.join(__dirname, '../Datas/datas', 'datas.json');
      const jsonData = await fs.readFile(dataFilePath, 'utf-8');
      const parsedData = JSON.parse(jsonData);

      const Singleid = req.params.id;
      console.log("Singleid from request params", Singleid);

      const SingleData = parsedData.find(user => user.id === Singleid);
      console.log("SingleUser", SingleData);

      if (!SingleData) {
          throw new Error('User not found');
      }

      let response = success_function({
          success: true,
          statuscode: 200,
          data: SingleData,
          message: "Successfully retrieved the single data."
      });

      res.status(response.statuscode).send(response);
      return;

  } catch (error) {
      console.log("error : ", error);

      let response = error_function({
          success: false,
          statuscode: 400,
          message: "Error occurred while fetching the data."
      });

      res.status(response.statuscode).send(response);
      return;
  }
}

// exports.update = async function (req,res){
    
//     try {
//       const dataFilePath = path.join(__dirname, '../Datas/datas', 'datas.json');
//       const jsonData = await fs.readFile(dataFilePath, 'utf-8');
//       const parsedData = JSON.parse(jsonData);

//       const Singleid = req.params.id;
//       console.log("Singleid from request params", Singleid);

//         let body = req.body;
//         console.log("body",body);

//         let data= {
//             name : body.name,
//             email : body.email,
//             phoneno : body.phoneno,
//             password : body.password,
//             usertype : body.user_type
//         }

//         parsedData[Singleid]={...parsedData[Singleid],...data};
//         dataUpload(jsonData)
        

//     let response = success_function({
//         success: true,
//         statuscode:200,
//         // data:update_employee,
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



exports.delete = async function (req, res) {
  try {
    const dataFilePath = path.join(__dirname, '../Datas/datas', 'datas.json');
    
    const jsonData = await fs.readFile(dataFilePath, 'utf-8');
    const parsedData = JSON.parse(jsonData);

    const Singleid = req.params.id;
    console.log("Singleid from request params", Singleid);

    const index = parsedData.findIndex(user => user.id === Singleid);

    // If no user found with the given ID, throw an error
    if (index === -1) {
        throw new Error('User not found');
    }

    const deletedData = parsedData.splice(index, 1);
    console.log("Deleted User", deletedData);

    await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));

    let response = success_function({
        success: true,
        statuscode: 200,
        message: "Deleted the data"
    });

    res.status(response.statuscode).send(response);
  } catch (error) {
    console.log("error: ", error);

    // Send error response
    let response = error_function({
        success: false,
        statuscode: 400,
        message: error.message || "Error occurred while deleting"
    });

    res.status(response.statuscode).send(response);
  }
};


