'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Trash2, Edit } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  addAddressAction,
  removeAddressAction,
  updateAddressAction,
} from '@/actions/address';
import { JwtPayload } from 'jsonwebtoken';
import { Address as AddressType, UpdateAddress } from '@/types/global';

const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .min(6, 'Phone must be at least 6 digits'),
});

type AddressInput = z.infer<typeof addressSchema>;

export default function Address({
  authData,
  addresses,
}: {
  authData: JwtPayload;
  addresses: AddressType[];
}) {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      city: '',
      address: '',
      phone: '',
    },
  });

  const handleClick = async (id: number) => {
    await removeAddressAction(id);
    toast.success('地址删除成功');
  };

  const onSubmit = async (data: AddressInput) => {
    const res = editId
      ? await updateAddressAction(editId, data as UpdateAddress)
      : await addAddressAction(
          data.name,
          data.city,
          data.address,
          data.phone,
          authData.userId,
        );
    if (res.status === 200) {
      toast.success(editId ? '地址更新成功' : '地址添加成功');
      reset();
      setEditId(undefined);
      setOpen(false);
    } else {
      toast.error(
        editId ? `地址更新失败: ${res.body}` : `地址添加失败: ${res.body}`,
      );
    }
  };

  const handleEdit = (address: UpdateAddress) => {
    reset({
      name: address.name,
      city: address.city,
      address: address.address,
      phone: address.phone,
    });
    setEditId(address.id);
    setOpen(true);
  };

  return (
    <div className="mt-6 mb-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border rounded-sm h-40 relative text-slate-600 mb-3"
        >
          <p className="m-3">{address.name}</p>
          <div className="text-sm ml-5">
            <p>{address.city}</p>
            <p>{address.address}</p>
            <p>{address.phone}</p>
          </div>
          <div className="absolute bottom-2 left-3 flex text-xs gap-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleEdit(address)}
            >
              <Edit width={14} />
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleClick(address.id)}
            >
              <Trash2 width={14} />
            </div>
          </div>
        </div>
      ))}

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogTrigger
          render={<Button variant="outline">Add Address</Button>}
        />
        <AlertDialogContent className="sm:max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Address</AlertDialogTitle>
              <AlertDialogDescription>
                Please fill in the details below to add a new address to your
                account.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-3 my-4">
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Receiver's name"
                  {...register('name')}
                />
                <FieldError>{errors.name?.message}</FieldError>
              </Field>

              <Field data-invalid={!!errors.city}>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  id="city"
                  type="text"
                  placeholder="e.g. New York"
                  {...register('city')}
                />
                <FieldError>{errors.city?.message}</FieldError>
              </Field>

              <Field data-invalid={!!errors.address}>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  type="text"
                  placeholder="Street address, P.O. box, company"
                  {...register('address')}
                />
                <FieldError>{errors.address?.message}</FieldError>
              </Field>

              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Phone number"
                  {...register('phone')}
                />
                <FieldError>{errors.phone?.message}</FieldError>
              </Field>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => reset()}>
                Cancel
              </AlertDialogCancel>
              <Button type="submit">Save Address</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
