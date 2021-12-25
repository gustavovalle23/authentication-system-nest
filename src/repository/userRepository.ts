import { user } from "@prisma/client";
import prisma from "../../prisma/prisma";

export const findUserById = async (userId: number): Promise<user> => {
    return prisma.user.findUnique({
        where: { id: userId }
    })
};

export const saveUser = async (name: string, email: string, password: string) => {
    prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            role: "USER"
        }
    })
}


export const findUserByEmail = async (userEmail: string): Promise<user> => {
    return prisma.user.findFirst({
        where: { email: userEmail }
    });
}

export const findUsersAll = async (): Promise<user> => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: false
        },
        where: {
            role: "USER"
        }
    })
};