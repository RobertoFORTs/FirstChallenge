//only needs to export the controllers  
const fs = require('fs');

const backup = JSON.parse(fs.readFileSync(`${__dirname}/./../data/user.json`));


checkEmail = (req,res) =>{ //does the email exist?
    if(backup.find(el => el.email === req.body.email)){ 
        return false;
    }; //if email exists
    return true;
};

checkPassword = (req,res) =>{ //Is the password right?
    if(backup.find(el => el.password === req.body.password)){ 
        return false; //if password exists
    }
    else if (req.body.password !== req.body.confirmPassword){
        return false; //valid password and matches the confirm password
    }
    return true;
};

checkString = (req,res) => {
    if ( !isNaN(req.body.firstName*1)||  !isNaN(req.body.lastName*1)||  !isNaN(req.body.city*1) ||  !isNaN(req.body.country*1) ||  !isNaN(req.body.birthDate*1)){ //verifies if fields are filled incorrectly
        return false;
    }
    return true;
};

dateIsValid = (value) =>{

    const temp = new Date(value);
    if (!isNaN(temp.getTime())){
        return temp;
    }
    return false;

};

exports.checkUserRegistration = (req,res,next) => {

    if (!req.body.firstName||!req.body.lastName||!req.body.birthDate||!req.body.city||!req.body.country||!req.body.email||!req.body.password||!req.body.confirmPassword || !checkString(req,res)){ //Later: try to add new validation for birthDate

        return res.status(400).json({
            status:'failed',
            message: 'information filled incorrectly'
        });
    }

    else
    {
        if (!checkEmail(req,res) || !checkPassword(req,res) || !dateIsValid(req.body.birthDate))
        {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email / password or date"
            });
        }
    }
    
     next();
}
   



exports.checkUserLogin = (req,res,next) => {
    if (!req.body.email||!req.body.password){ 

        return res.status(400).json({
        status: 'failed',
        message: 'missing required information'
        });
    }
    else{
        validUser = backup.find(el => el.email === req.body.email && el.password === req.body.password); //tries to find a valid user
        if (!validUser){ //if user not found
            return res.status(404).json({
                status: 'failed',
                message: 'incorrect email and/or password'
            });
        }
    }
    next();
}


exports.signUserUp = (req,res) => {

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