'use client';

import { NotAccountType } from '@/types/global';
import { Dispatch, SetStateAction } from 'react';
import { Field, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerAction } from '@/actions/users';
import { toast } from 'sonner';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterInput = z.infer<typeof registerSchema>;

export default function Register({
  setNotAccountType,
}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    const res = await registerAction(data.email, data.name, data.password);
    if (res.status === 200) {
      toast.success('注册成功');
      setNotAccountType('login');
    } else {
      toast.error(`注册失败: ${res.body}`);
    }
  };

  return (
    <div className="container2 my-20">
      <h1 className="text-xl mb-3 text-center font-bold">Create an account</h1>
      <p className="text-center mb-6 text-sm text-slate-500">
        Enter your details to create your account.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>

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

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </Field>

        <Button
          type="submit"
          className="w-full mt-6"
        >
          Create Account
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-600">
        Already have an account?{' '}
        <span
          onClick={() => setNotAccountType('login')}
          className="text-primary underline cursor-pointer hover:text-primary/80"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
