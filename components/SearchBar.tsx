"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler } from "react";
import _debounce from "lodash/debounce";

import { BsXSquare } from "react-icons/bs";
import Input from "./shared/Input";

const SearchBar = () => {
  const router = useRouter();

  const debouncedSearch = _debounce((query: string) => {
    router.push(`/tests/?query=${query}`);
  }, 400);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const handleReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(`/tests`);
    e.currentTarget.reset();
  };

  return (
    <section>
      <form onSubmit={handleReset} className='relative'>
        <Input
          placeholder='test name'
          type='text'
          name={"searchText"}
          className='w-full'
          onChange={handleInputChange}
        />
        <button
          className='absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-grey-2 hover:text-grey-3 duration-300'
          type='submit'
        >
          <BsXSquare size={20} />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
