import { ResponseUser } from "./user";

export type Question = {
  _id?: string;
  question: string;
  answer: string[];
  correctAnswer: string;
  docs: string;
  image?: {
    publicId: string;
    url: string;
  };
};

export type TestRequest = {
  name: string;
  questions: Question[];
};

export type TestResponse = {
  _id: string;
  name: string;
  questions: Question[];
  creator: ResponseUser;
};

export type PassedTestResponse = {
  _id: string;
  incorrectlyAnswered: Question[];
  creator: ResponseUser;
  test: TestResponse;
  passed: boolean;
};
