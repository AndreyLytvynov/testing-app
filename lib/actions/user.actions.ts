"use server";

import { Secret, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../models/user.model";
import { connectToDB } from "../mongo";
import { ResponseUser } from "@/types/user";
import PassedTest from "../models/passedTests.model";
import Test from "../models/test.mode";
import Question from "../models/question.model";

export async function getUserFromToken(): Promise<ResponseUser | null> {
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

export async function aaaaa() {
  await connectToDB();
  try {
    const aaa = await PassedTest.find();
    const bbbb = await Test.find();
    const ccccc = await Question.find();
  } catch (error: any) {
    throw new Error(`Error getting user:: ${error.message}`);
  }
}

export async function getUser(): Promise<ResponseUser> {
  await connectToDB();
  try {
    const user = await getUserFromToken();
    const userWithPassedTest = await User.findOne({
      _id: user?.id,
    })
      .populate({
        path: "passedTest",
        populate: { path: "test", populate: { path: "questions" } },
      })
      .populate({
        path: "passedTest",
        populate: { path: "incorrectlyAnswered" },
      });
    return userWithPassedTest;
  } catch (error: any) {
    throw new Error(`Error getting user:: ${error.message}`);
  }
}
