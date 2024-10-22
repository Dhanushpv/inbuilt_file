const dayjs = require('dayjs');
const fs = require('fs');
let path = require('path')

exports.fileUpload = async function (file, directory){

    return new Promise ((resolve ,reject)=>{
        try {
            
            let mime_type = file.split(';')[0].split(":")[1].split('/')[1];
            console.log("mime_type : ", mime_type);

            if(mime_type === "png" || "jpeg" || "jpg" || "mp4" || "pdf") {
                console.log("Allowed file type...");

                console.log("random number : ", String(Math.floor(Math.random()*100)));
                console.log("dayjs() : ", dayjs());

                let file_name = dayjs() + String(Math.floor(Math.random()*100))  + "." + mime_type;;
                console.log("file_name : ", file_name);

                
                let upload_path = `uploads/${directory}`;
                console.log("upload_path : ", upload_path);

                let base64 = file.split(';base64,')[1];
                // console.log("base64 : ", base64);

                fs.mkdir(upload_path, {recursive : true}, (err) => {

                    if(err) {
                        console.log("err : ", err);
                        reject(err.message ? err.message : err);
                    }else {
                        let upload_path = `uploads/${directory}/${file_name}`;
                        console.log("upload_path : ", upload_path);
                    }
                }) 
                
                fs.mkdir(upload_path, {recursive : true}, (err) => {
                    if(err) {
                        console.log("err : ", err);
                        reject(err.message ? err.message : err);
                    }else {
                        let upload_path = `uploads/${directory}/${file_name}`;
                        console.log("upload_path : ", upload_path);

                        fs.writeFile(
                            upload_path,
                            base64,
                            {encoding : "base64"},
                            function(err) {
                                if(err) {
                                    console.log("err : ", err);
                                    reject(err.message ? err.message : err);
                                }else {
                                    resolve(upload_path);
                                }
                            }
                        )
                    }
                })




            }else {
                console.log("Invallid file type ")
                reject("File size up to 100mb and Formats .png, .jpeg, .jpg, .mp4, .pdf are only allowed");
            }


        } catch (error) {
            console.log("error",error);
            reject(error.message ? error.message : error);
        }

    })
    
    
}

exports.getserverData = async function() {
    return new Promise((resolve, reject) => {
        try {
            // Construct the absolute file path using __dirname
            const file_path = path.join(__dirname, '../uploads/datas', 'datas.json'); 
            
            // Check if the file exists
            if (!fs.existsSync(file_path)) {
                console.log("File does not exist.");
                resolve(null); // Return null or default value if file doesn't exist
                return;
            }

            fs.readFile(file_path, (err, data) => {
                if (err) {
                    console.log("File read error:", err);
                    reject(err);
                } else if (!data || data.length === 0) {
                    console.log("JSON file is empty.");
                    resolve(null);
                } else {
                    try {
                        let parsed_data = JSON.parse(data);
                        console.log("Parsed data:", parsed_data);
                        let strparsed_data = JSON.stringify(parsed_data);
                        resolve(strparsed_data);
                    } catch (parseErr) {
                        console.log("JSON parsing error:", parseErr);
                        reject(new Error("Invalid JSON data."));
                    }
                }
            });
        } catch (error) {
            console.log("Error:", error);
            reject(error);
        }
    });
};

exports.dataUpload = async function (file, directory) {
    return new Promise((resolve, reject) => {
        try {
    

            // Use __dirname to ensure the correct path is used
            let upload_path = path.join(__dirname, '../uploads', directory); 
            console.log('upload_path', upload_path);

            fs.mkdir(upload_path, { recursive: true }, (err) => {
                if (err) {
                    reject(err.message ? err.message : err);
                } else {
                    console.log("Directory created: ", upload_path);
                    let filename = "datas.json";

                    fs.writeFile(path.join(upload_path, filename), file, (err) => {
                        if (err) {
                            console.error('Error writing JSON file:', err);
                            reject(err);
                        } else {
                            console.log(`JSON file successfully created in ${upload_path}/${filename}`);
                            resolve(`File uploaded to ${upload_path}/${filename}`);
                        }
                    });
                }
            });

        } catch (error) {
            console.log("Error:", error);
            reject(error);
        }
    });
};