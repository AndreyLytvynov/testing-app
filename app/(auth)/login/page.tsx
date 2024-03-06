import LoginForm from "@/components/forms/LoginForm";
import Heading from "@/components/shared/Heading";
import WhiteContainer from "@/components/shared/WhiteContainer";
import Link from "next/link";

const Page = () => {
  return (
    <WhiteContainer className='p-14'>
      <Heading className='text-center'>Login</Heading>
      <LoginForm />
      <p className={"text-sm my-2 text-center"}>
        Don't have an account?
        <Link
          className={"text-violet ml-2 font-semibold hover:text-grey-3"}
          href={"/sign-up"}
        >
          Sign Up
        </Link>
      </p>
    </WhiteContainer>
  );
};
export default Page;
