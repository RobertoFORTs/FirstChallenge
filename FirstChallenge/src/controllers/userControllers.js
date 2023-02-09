//only needs to export the controllers  
const fs = require('fs');


const backup = JSON.parse(fs.readFileSync(`${__dirname}/./../data/user.json`));


exports.signUserUp = (req,res) => {
    // if (backup.find(el => el.email === req.body.email)){ //user already exists
    //     return res.json({
    //         status: 'failed',
    //         message: 'user already exists'
    //     })
    // }

    //creating new user

    const newuser = Object.assign(req.body);
    backup.push(newuser);
    fs.writeFile(`${__dirname}/./../data/user.json`, JSON.stringify(backup), (err)=>{
        res.status(201).json({
            status:"success",
            message:"User has been registered",
            data: {
                user: newuser
            }
        });
    });
};

exports.userSignIn = (req,res)=>{
    res.status(201).json({
        status:'success',
        message: 'User has logged in',
        data:
            {
            email: req.body.email,
            password: '**********'
            }
    });
};