import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";

export const getUsers = async(req,res)=> {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res)=>{
    const {name, email, password, confpassword} = req.body;
    if(password !== confpassword) return res.status(400).json({msg: "Password and your Confirm Password is Wrong"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password:hashPassword
        });
        res.json({msg: "Register berhasil"});
    } catch (error) {
        console.log(error);
    }
}