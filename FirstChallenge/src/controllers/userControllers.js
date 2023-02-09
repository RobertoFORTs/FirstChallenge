//only needs to export the controllers  
const fs = require('fs');


const backup = JSON.parse(fs.readFileSync(`${__dirname}/./../data/user.json`));

checkEmail = (req,res) =>{

}

checkPassword = (req,res) =>{

}

exports.checkUserRegistration = (req,res,next) => {

    if (!req.body.firstName||!req.body.lastName||!req.body.birthDate||!req.body.city||!req.body.country||!req.body.email||!req.body.password||!req.body.confirmPassword){ //maybe add a function to check types later
        
        return res.status(400).json({
            status: 'failed',
            message: 'missing required information'
            });
    }
    next();

};

exports.checkUserLogin = (req,res,next) => {
    if (!req.body.email||!req.body.password){
        return res.status(400).json({
        status: 'failed',
        message: 'missing required information'
        });
    }
    next();
}


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