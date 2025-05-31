"use client"
import { updateDefaultAccount } from '@/actions/accounts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { BarLoader, FadeLoader, HashLoader } from 'react-spinners';
import { toast } from 'sonner';

const AccountCard = ({account}) => {
    const {name,type,id,isDefault,balance} = account;

    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updatedAccount,
        error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async(event)=>{
          event.preventDefault();

          if(isDefault){
            toast.warning("You need atleast 1 default account!");
            return;
          }

          await updateDefaultFn(id);
    };

    useEffect(()=>{
        if(updatedAccount?.success){
            toast.success("Default account updated successfully!");
        }
    },[updatedAccount,updateDefaultLoading])


    useEffect(()=>{
        if(error){
            toast.error(error.message || "Failed to update default account!");
        }
    },[error])

  return (
    <div>
    <Card key={id} className={`dark:bg-[#09090b] dark:hover:bg-gray-900 hover:bg-blue-100`}>
  <CardHeader className={'flex flex-row justify-between items-center space-y-0 pb-2'}>
    <CardTitle className={'text-sm font-medium capitalize'}>{name}</CardTitle>
        {updateDefaultLoading ? <HashLoader size={20} color='#0EA5E9'/>:
           <Switch checked={isDefault} disabled={updateDefaultLoading} onClick={handleDefaultChange} className={updateDefaultLoading?'cursor-not-allowed':`data-[state=unchecked]:bg-gray-400 cursor-pointer data-[state=checked]:bg-blue-600 transition-colors`}/>
         }
    
  </CardHeader>
   <Link href={`/account/${id}`}>
  <CardContent>
    <div className='text-2xl font-bold'>
        ₹{parseFloat(balance).toFixed(2)}
    </div>
    <p className='text-xs text-muted-foreground'>{type.charAt(0) + type.slice(1).toLowerCase()} Account</p>
  </CardContent>
  <CardFooter className={'flex justify-between text-sm text-muted-foreground mt-2'}>
    <div className='flex items-center'>
        <ArrowUpRight className='mr-1 h-4 w-4 text-green-500'/>
        Income
    </div>
    <div className='flex items-center'>
        <ArrowDownRight className='mr-1 h-4 w-4 text-red-500'/>
        Expense
    </div>
  </CardFooter>
  </Link>
</Card>
</div>
  )
}

export default AccountCard