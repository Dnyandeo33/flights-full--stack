import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userControllers = {
    signUp: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;
            const emailExist = await User.findOne({ email });

            if (emailExist) {
                return res.status(200).json({
                    success: true,
                    message: `Email already exist, please login`
                });
            }

            const validEmail = validateEmail(email);
            const validPassword = validatePassword(password);
            const verifyPassword = matchPasswords(password, rePassword);

            if (validEmail || validPassword || verifyPassword) {
                const hashedPassword = hashPassword(password);

                const newUser = await User.create({
                    email,
                    password: hashedPassword
                });

                return res.status(200).json({
                    success: true,
                    message: `Registration successfully completed... `
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, Error: error.message });
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const emailExist = await User.findOne({ email });

            if (emailExist) {
                const isValid = bcrypt.compare(password, emailExist.password);

                if (isValid) {
                    const token = jwt.sign(
                        { user: emailExist.email },
                        process.env.TOKEN_ACCESS_SECRET
                    );

                    return res.status(200).json({
                        success: true,
                        id: emailExist._id,
                        token: token
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: `Email or password isn't valid, please check...`
                    });
                }
            }

            return res.status(404).json({
                success: false,
                message: `Email doesn't exist, please register first...`
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, Error: error.message });
        }
    },

    signOut: async (req, res) => {
        try {
            await res.clearCookie('token');
            return res.status(200).json({
                success: true,
                message: `Sign out successfully...`
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, Error: error.message });
        }
    }
};

export default userControllers;
