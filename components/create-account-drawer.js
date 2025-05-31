"use client"

import { useEffect, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


const CreateAccountDrawer = ({children}) => {
    const [open, setOpen] = useState(false);

   const {
     register,
     handleSubmit,
     formState:{errors},
     setValue,
     watch,
     reset

   } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues:{
            name:"",
            type:"",
            balance: "",
            isDefault: false,
        }
    })

   const {
      data: newAccount,
      error,
      fn: createAccountFn,
      loading: createAccountLoading,

   } =  useFetch(createAccount);

   useEffect(()=>{

    if(newAccount && !createAccountLoading){
      toast.success("Account created successfully!");
      reset();
      setOpen(false);
    }

   },[createAccountLoading,newAccount]);

   useEffect(()=>{
      if(error){
        toast.error(error.message || "failed to create account");
      }
   },[error])

    const onsubmit = async (data)=>{
        await createAccountFn(data);
       reset();
    }

  return (
    <div>
        <Drawer className="dark:bg-[#09090b]" open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>{children}</DrawerTrigger>
  <DrawerContent className={'pb-10'}>
    <DrawerHeader>
      <DrawerTitle>Create New Account</DrawerTitle>
    </DrawerHeader>
     <div className="pb-4 px-4">
    <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
       
       <div className="space-y-2 mx-5">
        <label className="text-sm text-gray-900 dark:text-gray-200 ml-2 font-medium" htmlFor="name">Account Name</label>
       <Input
          id="name"
          type={'text'}
          placeholder="e.g., Main Checking"
          {...register("name")}
          className={'mt-1 border-1 border-gray-400'}
        
       />
       {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
       </div>


       <div className="space-y-2 mx-5">
        <label className="text-sm text-gray-900 dark:text-gray-200 ml-2 font-medium" htmlFor="type">Account Type</label>
         <Select onValueChange={(value)=>setValue("type",value)}
            defaultValue={watch("type")}
            >
      <SelectTrigger className={'w-full border-1 mt-1 border-gray-400'} id="type">
       <SelectValue  placeholder="Select Account Type" />
       </SelectTrigger>
       <SelectContent>
       <SelectItem value="CURRENT">Current</SelectItem>
       <SelectItem value="SAVINGS">Savings</SelectItem>

       </SelectContent>
       </Select>

       {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
       </div>

           <div className="space-y-2 mx-5">
        <label className="text-sm text-gray-900 dark:text-gray-200 ml-2 font-medium" htmlFor="balance">Initial Balance</label>
       <Input
          id="balance"
          type={'number'}
          step="0.01"
          placeholder="0.00"
          {...register("balance")}
          className={'mt-1 border-1 border-gray-400'}
        
       />
       {errors.balance && <p className="text-sm text-red-500">{errors.balance.message}</p>}
       </div>


           <div className="flex items-center justify-between rounded-lg border-1 border-gray-400 p-3 mx-5">
            <div>
        <label className="text-sm text-gray-900 cursor-pointer dark:text-gray-200 ml-2 font-medium" htmlFor="isDefault">Set as Default</label>
       <p className="text-sm text-muted-foreground">This account will be selected by default for transactions.</p>
       </div>
       <Switch className={'data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-blue-600 transition-colors'}
        id="isDefault"
               onCheckedChange = {(checked)=>setValue("isDefault",checked)}
               defaultValue = {watch("isDefault")}
       />
       </div>
      <div className="flex items-center gap-2 mx-5">
     <DrawerClose asChild>
      <Button type="button" variant={'destructive'} className={'flex-1 cursor-pointer'}>
           Cancel
      </Button>
     </DrawerClose>
     <Button disabled={createAccountLoading} type="submit" className={'flex-1 cursor-pointer'}>
     {createAccountLoading?<><Loader2 className="h-4 w-4 animate-spin"/>Creating...</>:"Create Account"}
     </Button>
</div>

    </form>
   </div>
  </DrawerContent>
</Drawer>

    </div>
  )
}

export default CreateAccountDrawer