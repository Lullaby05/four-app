'use client';

import { NotAccountType } from '@/types/global';
import { Dispatch, SetStateAction } from 'react';
import { Field, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '@/actions/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function Login({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const res = await loginAction(data.email, data.password);
    console.log(res.status);
    if (res.status === 200) {
      toast.success('登录成功');
      router.refresh();
    } else {
      toast.error(`登录失败: ${res.body}`);
    }
  };

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Welcome back</h1>
      <p className="text-center mb-6 text-sm text-slate-500">
        Sign in to access an enhanced shopping experience.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        <Button
          type="submit"
          className="w-full mt-6"
        >
          Sign In
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <span
          onClick={() => setNotAccountType('register')}
          className="text-primary underline cursor-pointer hover:text-primary/80"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
