import { FormEventHandler, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Title from '../components/text/Title';
import Text from '../components/text/Text';

type RegisterInputs = {
  email: string;
  password: string;
};

const register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit = async ({ email, password }: RegisterInputs) => {
    console.log(email, password);
  };

  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <>
        <Title title='회원가입' />
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Text>Email</Text>
            <input
              className='block w-full text-gray-900 focus:outline-none'
              type='email'
              {...register('email', {
                required: true,
              })}
            />
          </div>

          <div className='mt-4'>
            <Text>Password</Text>
            <input
              className='block w-full text-gray-900 focus:outline-none' //
              type='password'
              autoComplete='false'
              {...register('password', { minLength: 6, required: true })}
            />
          </div>

          <Text>이메일과 비밀번호를 입력해주세요</Text>
          <button className='w-full mt-4 border py-2'>회원가입</button>
        </form>

        <Link href='/home'>
          <a>back</a>
        </Link>
      </>
    </>
  );
};
export default register;
