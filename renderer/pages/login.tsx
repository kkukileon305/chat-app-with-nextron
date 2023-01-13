import { FormEventHandler, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Title from '../components/text/Title';
import Text from '../components/text/Text';
import SquareButton from '../components/buttons/SquareButton';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

type LoginInputs = {
  email: string;
  password: string;
};

const login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputs>();

  const onSubmit = async ({ email, password }: LoginInputs) => {
    setIsLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      console.log(credential);
    } catch (error) {
      setError('email', {
        message: '이메일과 비밀번호를 다시 확인해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>login</title>
      </Head>
      <div className='max-w-[600px] min-w-[280px] w-full'>
        <Title title='로그인' />
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

          <SquareButton disabled={isLoading}>{isLoading ? '로그인중...' : '로그인'}</SquareButton>
        </form>

        <div className='flex justify-between my-2'>
          <Link href='/home'>
            <a className='text-gray-700'>메인으로 가기</a>
          </Link>
          <Link href='/register'>
            <a className='text-gray-700'>가입하러 가기</a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default login;
