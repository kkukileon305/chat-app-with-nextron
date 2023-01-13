import { FormEventHandler, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Title from '../components/text/Title';
import Text from '../components/text/Text';
import SquareButton from '../components/buttons/SquareButton';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

type RegisterInputs = {
  email: string;
  password: string;
};

const register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInputs>();

  const onSubmit = async ({ email, password }: RegisterInputs) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error) {
      setError('email', {
        message: '이미 존재하는 이메일입니다.',
      });
    }
  };

  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <div className='max-w-[600px] min-w-[280px] w-full'>
        <Title title='회원가입' />
        <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
          <Text className='mb-1'>Email</Text>
          <input
            className='block w-full text-gray-900 focus:outline-none'
            type='email'
            {...register('email', {
              required: true,
            })}
          />

          <Text className='mb-1 mt-4'>Password</Text>
          <input
            className='block w-full text-gray-900 focus:outline-none' //
            type='password'
            autoComplete='false'
            {...register('password', { minLength: 6, required: true })}
          />

          <Text className='my-4 text-center'>
            {errors.email || errors.password ? (
              <>
                이메일을 확인해주세요. <br /> 비밀번호는 6글자 이상이여야 합니다.
              </>
            ) : (
              '이메일과 비밀번호를 입력해주세요.'
            )}
          </Text>

          <SquareButton>회원가입</SquareButton>
        </form>

        <div className='flex justify-between my-2'>
          <Link href='/home'>
            <a className='text-gray-700'>메인으로 가기</a>
          </Link>
          <Link href='/login'>
            <a className='text-gray-700'>로그인하러 가기</a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default register;
