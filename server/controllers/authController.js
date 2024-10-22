// const success_function = require('../util/userResponse').success_function;
// const error_function = require('../util/userResponse').error_function;
// const users = require('../db/models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const fs = require('fs');
// const path = require('path');



// // Function to read JSON data from file
// function getDataFromJson() {
//     const filePath = path.join(__dirname, '../data/datas.json');
//     const jsonData = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(jsonData);
// }

// exports.login = async function (req, res) {
//     try {
//         let email = req.body.email;
//         console.log("email : ", email);

//         let password = req.body.password;
//         console.log("password : ", password);

//         // Load data from datas.json
//         let usersData = getDataFromJson();
//         let user = usersData.find(user => user.email === email);
//         console.log("user : ", user);

//         if (user) {
//             let db_password = user.password;
//             console.log("db_password  : ", db_password);

//             let passwordMatch = bcrypt.compareSync(password, db_password);
//             console.log("passwordMatch", passwordMatch);

//             if (passwordMatch) {
//                 let token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

//                 let id = user._id;
//                 console.log('id', id);
//                 let user_type = user.user_type;
//                 console.log('user_type', user_type);

//                 let token_data = {
//                     token,
//                     id,
//                     user_type
//                 };

//                 let response = success_function({
//                     success: true,
//                     statuscode: 200,
//                     data: token_data,
//                     message: "Successfully logged in.",
//                 });
//                 res.status(response.statuscode).send(response);
//                 return;
//             } else {
//                 let response = error_function({
//                     success: false,
//                     statuscode: 400,
//                     message: "Invalid password.",
//                 });
//                 res.status(response.statuscode).send(response);
//                 return;
//             }
//         } else {
//             let response = error_function({
//                 statuscode: 404,
//                 message: "User not found.",
//             });
//             res.status(response.statuscode).send(response);
//             return;
//         }
//     } catch (error) {
//         console.log("error : ", error);

//         let response = error_function({
//             success: false,
//             statuscode: 400,
//             message: "An error occurred.",
//         });
//         res.status(response.statuscode).send(response);
//         return;
//     }
// };

const success_function = require('../util/userResponse').success_function;
const error_function = require('../util/userResponse').error_function;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');

// Function to read JSON data from file
function getDataFromJson() {
    // Adjust the path if your datas.json file is located in a different folder
    const filePath = path.join(__dirname, '../uploads/datas','datas.json');  // Assuming the file is in the /uploads/datas folder
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}

exports.login = async function (req, res) {
    try {
        let email = req.body.email;
        console.log("email : ", email);

        // let password = req.body.password;
        // console.log("password : ", password);

        // Load data from datas.json
        let usersData = getDataFromJson();
        console.log("usersData : ", usersData);

        if (!usersData) {
            let response = error_function({
                success: false,
                statuscode: 500,
                message: "Unable to load user data.",
            });
            res.status(response.statuscode).send(response);
            return;
        }

        let user = usersData.find(user => user.email === email);
        console.log("user : ", user);

        if (user) {
            let db_password = user.password;
            console.log("db_password  : ", db_password);

            // Corrected password comparison: plain password first, hashed password second
            let passwordMatch = bcrypt.compareSync(req.body.password, db_password); 
            console.log("passwordMatch", passwordMatch);

            if (passwordMatch) {
                let token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

                let id = user._id;
                console.log('id', id);
                let user_type = user.user_type;
                console.log('user_type', user_type);

                let token_data = {
                    token,
                    id,
                    user_type
                };

                let response = success_function({
                    success: true,
                    statuscode: 200,
                    data: token_data,
                    message: "Successfully logged in.",
                });
                res.status(response.statuscode).send(response);
                return;
            } else {
                let response = error_function({
                    success: false,
                    statuscode: 400,
                    message: "Invalid password.",
                });
                res.status(response.statuscode).send(response);
                return;
            }
        } else {
            let response = error_function({
                statuscode: 404,
                message: "User not found.",
            });
            res.status(response.statuscode).send(response);
            return;
        }
    } catch (error) {
        console.log("error : ", error);

        let response = error_function({
            success: false,
            statuscode: 400,
            message: "An error occurred.",
        });
        res.status(response.statuscode).send(response);
        return;
    }
};
