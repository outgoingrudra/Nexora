import  isStrongPassword  from "validator/lib/isStrongPassword.js"
import isEmail from "validator/lib/isEmail.js"

export async function  login(req,res) {

}
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password || name.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        if (!isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email!"
            });
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password is weak!"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                skills: []
            }
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: user.id
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}