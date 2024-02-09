import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongo";

export async function POST(request: any) {
  await connectToDB();
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save the user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
