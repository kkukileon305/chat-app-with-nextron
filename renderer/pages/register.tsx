import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Title from '../components/text/Title';
import Text from '../components/text/Text';
import SquareButton from '../components/buttons/SquareButton';
import { auth, database } from '../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ref, set } from 'firebase/database';
import { krIntl } from '../lib/formatter';

type RegisterInputs = {
  email: string;
  password: string;
  displayName: string;
};

const register = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInputs>();

  const onSubmit = async ({ email, password, displayName }: RegisterInputs) => {
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {
        displayName,
      });

      await set(ref(database, `users/${credential.user.uid}`), {
        displayName: credential.user.displayName,
        email: credential.user.email,
        createdAt: krIntl.format(new Date()),
      });

      router.push('/login');
    } catch (error) {
      setError('email', {
        message: '이미 존재하는 이메일입니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <div className='max-w-[600px] min-w-[280px] w-full p-4'>
        <Title title='회원가입' />
        <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
          <Text className='mb-1'>Email</Text>
          <input
            className='block w-full text-gray-900'
            type='email'
            {...register('email', {
              required: true,
            })}
          />

          <Text className='mb-1 mt-4'>Password</Text>
          <input
            className='block w-full text-gray-900' //
            type='password'
            autoComplete='false'
            {...register('password', { minLength: 6, required: true })}
          />

          <Text className='mb-1 mt-4'>닉네임</Text>
          <input
            className='block w-full text-gray-900' //
            type='text'
            {...register('displayName', { minLength: 2, required: true })}
          />

          <Text className='my-4 text-center'>
            {errors.email || errors.password || errors.displayName ? (
              <span className='text-red-500'>
                이메일을 확인해주세요. <br /> 비밀번호는 6글자 이상이여야 합니다. <br /> 닉네임은 2글자 이상이여야 합니다.
              </span>
            ) : (
              '이메일과 비밀번호를 입력해주세요.'
            )}
          </Text>

          <SquareButton disabled={isLoading}>{isLoading ? '가입중...' : '회원가입'}</SquareButton>
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
