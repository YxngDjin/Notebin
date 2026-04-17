import bcrypt from "bcrypt"

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10)
}
export const comparePassword = (plainText: string, hash: string) => {

    return bcrypt.compare(plainText, hash);
}