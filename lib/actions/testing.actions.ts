"use server";
import { connectToDB } from "../mongo";

import { getUserFromToken } from "./user.actions";
import { transformIdToObjectID } from "@/helpers";
import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import Test from "../models/test.mode";
import Question from "../models/question.model";
import PassedTest from "../models/passedTests.model";

import { PassedTestResponse, TestRequest, TestResponse } from "@/types/test";

export async function createTest(data: TestRequest): Promise<void | null> {
  await connectToDB();
  try {
    const user = await getUserFromToken();
    const email = user?.email;

    const userDB = await User.findOne({ email });

    const questions = await Question.insertMany(data.questions);

    const test = {
      name: data.name,
      questions,
      creator: userDB._id,
    };

    const newTest = new Test(test);
    await newTest.save();

    revalidatePath("/tests");
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getAllTests(): Promise<TestResponse[]> {
  await connectToDB();
  try {
    const tests = await Test.find().populate("questions");
    if (!tests) {
      throw new Error(`Error getting list of tests`);
    }
    return tests as TestResponse[];
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getTest(_id: string): Promise<string> {
  await connectToDB();
  try {
    const test = await Test.findOne({ _id }).populate("questions");
    if (!test) {
      throw new Error(`Error getting test`);
    }

    // use JSON.stringify to fix the error on client "next 13 RangeError: Maximum call stack size exceeded at String.replace (<anonymous>)"
    return JSON.stringify(test);
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getPopularTests(): Promise<TestResponse[]> {
  await connectToDB();
  try {
    const tests = await Test.find(
      {},
      { _id: 1, name: 1, countingPassedTests: 1 }
    )
      .sort({ countingPassedTests: -1 })
      .limit(5);

    if (!tests) {
      throw new Error(`Error getting list of tests`);
    }
    return tests as TestResponse[];
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function CreatePassedTest(
  testId: string,
  incorrectlyAnswered: any[],
  passed: boolean
) {
  await connectToDB();
  try {
    const user = await getUserFromToken();

    const incorrectAnswersId = incorrectlyAnswered.map(
      (answered) => answered._id
    );

    const searchResult = await PassedTest.findOne({
      creator: transformIdToObjectID(user?.id),
      test: transformIdToObjectID(testId),
    });

    const passedTestUnique = await PassedTest.findOneAndUpdate(
      {
        creator: transformIdToObjectID(user?.id),
        test: transformIdToObjectID(testId),
      },
      {
        $set: {
          incorrectlyAnswered: incorrectAnswersId,
          passed,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    const aaa = await Test.findByIdAndUpdate(
      { _id: testId },
      { $inc: { countingPassedTests: 1 } },
      { new: true }
    );

    if (!searchResult) {
      await User.findByIdAndUpdate(
        user?.id,
        { $push: { passedTest: passedTestUnique } },
        { new: true }
      );
    }

    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getPassedTests(): Promise<PassedTestResponse[]> {
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
    return userWithPassedTest.passedTest;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
