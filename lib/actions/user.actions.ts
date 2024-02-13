"use server";

import { Secret, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser(): Promise<ResponseUser | null> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return null;
    }
    const user = verify(
      token as string,
      process.env.JWT_TOKEN_SECRET as Secret
    ) as ResponseUser;
    return user;
  } catch (error: any) {
    throw new Error(`Error getting user:: ${error.message}`);
  }
}
