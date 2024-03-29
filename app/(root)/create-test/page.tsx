import WhiteContainer from "@/components/shared/WhiteContainer";
import CreateTestForm from "@/components/forms/CreateTestForm";
import Heading from "@/components/shared/Heading";

const Create = () => {
  return (
    <section>
      <Heading>Create Test</Heading>
      <WhiteContainer>
        <CreateTestForm />
      </WhiteContainer>
    </section>
  );
};

export default Create;
