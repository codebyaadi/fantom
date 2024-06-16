import { getRandomProfileImg } from "@/lib/utils";

export const register = async (name: string, username: string, email: string, password: string) => {
    const hashedPassword = await Bun.password.hash(password);
    const imageUrl = getRandomProfileImg();
}