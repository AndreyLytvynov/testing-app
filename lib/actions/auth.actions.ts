"use server";

import { cookies } from "next/headers";
import { connectToDB } from "../mongo";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestUser } from "@/types/user";

export async function LogOut(): Promise<void> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error(`Not logged in`);

    cookieStore.delete("token");
  } catch (error: any) {
    throw new Error(`Failed to logOut: ${error.message}`);
  }
}

export async function logIn(data: RequestUser): Promise<void> {
  await connectToDB();
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`Incorrect email or password`);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error(`Incorrect email or password`);
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await jwt.sign(
      tokenData,
      process.env.JWT_TOKEN_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    const cookieStore = cookies();
    cookieStore.set("token", token);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signUp(data: RequestUser): Promise<void> {
  await connectToDB();
  try {
    const { username, email, password } = data;

    const checkUser = await User.findOne({ email });
    if (checkUser) throw new Error(`This email is already in use`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const user = await newUser.save();

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await jwt.sign(
      tokenData,
      process.env.JWT_TOKEN_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    const cookieStore = cookies();
    cookieStore.set("token", token);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
