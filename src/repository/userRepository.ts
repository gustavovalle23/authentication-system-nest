import { user } from "@prisma/client";
import prisma from "../../prisma/prisma";
import { userDTO } from "../shared/userDTO";

export const findUserById = async (userId: number): Promise<user> => {
    const user = prisma.user.findUnique({
        where: { id: userId }
    })
    return user;
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
};

export const deleteUserById = async (userId: number) => {
    prisma.user.delete({ where: { id: userId } });
}

export const findUserByEmail = async (userEmail: string): Promise<user> => {
    return prisma.user.findFirst({
        where: { email: userEmail }
    });
}

export const findUsersAll = async (): Promise<Array<userDTO>> => {
    let user = prisma.user.findMany({
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
    });

    return user;
};