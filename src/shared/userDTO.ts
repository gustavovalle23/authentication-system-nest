import { Role } from "@prisma/client";

export interface userDTO {
    id: number
    name: string
    email: string
    role: Role
}