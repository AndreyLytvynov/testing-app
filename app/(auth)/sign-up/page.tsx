import SignupForm from "@/components/forms/SingupForm";
import Heading from "@/components/shared/Heading";
import WhiteContainer from "@/components/shared/WhiteContainer";
import Link from "next/link";

const Page = () => {
  return (
    <WhiteContainer className='p-14'>
      <Heading className='text-center'>Sign-up</Heading>
      <SignupForm />
      <p className={"text-sm my-2 text-center"}>
        You have an account?
        <Link
          className={"text-violet ml-2 font-semibold hover:text-grey-3"}
          href={"/login"}
        >
          Login
        </Link>
      </p>
    </WhiteContainer>
  );
};
export default Page;
