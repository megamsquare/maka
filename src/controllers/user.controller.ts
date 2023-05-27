import { Request, Response } from "express";
import status_code from "http-status";
import Model from "../models";
import Err from "../use_cases/error_handler";

async function sign_up(req: Request, res: Response) {
       try {

        const user_model = Model.User;
        const role_model = Model.Roles;
        
        const email_exist = await user_model.exists({ email: req.body.email })
        if (email_exist) {
            res.status(status_code.BAD_REQUEST).json({ message: 'Email is already taken' })
            return
        }

        const username_exist = await user_model.exists({ username: req.body.username })
        if (username_exist) {
            res.status(status_code.BAD_REQUEST).json({ message: 'Username is already taken' })
            return
        }
    
        const user = await user_model.create({ ...req.body })

        const save_role = {
            userId: user._id,
            role: "user"
        }

        const role = await role_model.create({ ...save_role })

        res.status(status_code.CREATED).json({ data: {user, role: role.role}})

       } catch (error) {
        res.status(status_code.BAD_REQUEST).json({ message: error })
       }
}

async function sign_in(req:Request, res: Response) {
    const { email, password } = req.body;

    if (!email || password) {
        res.status(status_code.BAD_REQUEST).json({ message: Err.ProvideLoginDetails });
        return;
    }
}

const User_controller = {
    sign_up,
};

export default User_controller;