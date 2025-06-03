"use client";

import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReceiptScanner from "./receipt-scanner";

const AddTransactionForm = ({ accounts, categories, editMode= false, initialData = null }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    setValue,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData?{
         type: initialData.type,
         amount: initialData.amount.toString(),
         description: initialData.description,
         accountId: initialData.accountId,
         category: initialData.category,
         date: new Date(initialData.date),
         isRecurring: initialData.isRecurring,
         ...(initialData.recurringInterval && {
          recurringInterval: initialData.recurringInterval,
         }),

      }:{

          type: "EXPENSE",
      amount: "",
      description: "",
      accountId: accounts.find((ac) => ac.isDefault)?.id,
      date: new Date(),
      isRecurring: false,

      }
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch( editMode ? updateTransaction: createTransaction );

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const onsubmit = (data)=>{
    const formData = {
      ...data,
      amount: parseFloat(data.amount)
    };

    if(editMode){
        transactionFn(editId, formData);
    }else{
      transactionFn(formData);
    }
  }

  useEffect(()=>{

    if(transactionResult?.success && !transactionLoading){
        toast.success(editMode?"Transaction updated Successfully!":"Transaction created successfully!");
        reset();
        router.push(`/account/${transactionResult.data.accountId}`);
    }
     
  },[transactionResult,transactionLoading,editMode])

  const handleScanComplete = async(scannedData)=>{
    setValue("amount", scannedData.amount.toString());
    setValue("date",new Date(scannedData.date));

    if(scannedData.description){
      setValue("description",scannedData.description);
    }
    
    if(scannedData.category){
      setValue("category",scannedData.category);
      console.log("The category is: ",scannedData.category);
    }

  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
      {/* AI Receipt Scanner  */}

      <ReceiptScanner onScanComplete={handleScanComplete} />

      <div className="space-y-2">
        <label className="text-md font-medium text-gray-800 dark:text-gray-300">
          Type
        </label>
        <Select className="" defaultValue={type} onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger className="mt-2 border-2 w-full border-gray-400 dark:border-gray-700">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>

        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-800 dark:text-gray-300">
            Amount
          </label>
          <Input
            className={"mt-2 border-2 border-gray-400 dark:border-gray-700 "}
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
          />

          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-800 dark:text-gray-300">
            Account
          </label>
          <Select
            className=""
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={accounts.find((ac) => ac.isDefault)?.id}
          >
            <SelectTrigger className="mt-2 border-2 w-full border-gray-400 dark:border-gray-700">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => {
                return (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} (₹{parseFloat(account.balance).toFixed(2)})
                  </SelectItem>
                );
              })}
              <CreateAccountDrawer>
                <Button
                  variant={"ghost"}
                  className={
                    "w-full select-none text-sm outline-none items-center"
                  }
                >
                  Create New Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>

          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-md font-medium text-gray-800 dark:text-gray-300">
          Category
        </label>
        <Select
          className=""
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger className="mt-2 border-2 w-full border-gray-400 dark:border-gray-700">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-md font-medium text-gray-800 dark:text-gray-300">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"w-full border-2 border-gray-400 dark:border-gray-700 pl-3 text-left font-normal"}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date)=>setValue("date",date)}
              disabled={(date)=>date > new Date() || date < new Date("1900-01-01")}
              className="rounded-md w-auto p-0"
              align="start"
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

        <div className="space-y-2">
        <label className="text-md font-medium text-gray-800 dark:text-gray-300">
          Description
        </label>
   
        <Textarea
           className={'border-gray-400 border-2 dark:border-gray-700'}
           placeholder="Enter Description"
           {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between border-2 dark:border-gray-700 border-gray-400 rounded-lg p-3">
        <div className="space-y-0.5">
          <label
          className="text-sm font-medium cursor-pointer"
          >
              Recurring Transactions
          </label>

          <p className="text-xs text-red-500 font-semibold">
            Set up a recurring schedule for this transaction
          </p>

        </div>
        <Switch
        className={'cursor-pointer data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-blue-600 transition-colors'}
        id="isRecurring"
        onCheckedChange={(checked)=>setValue("isRecurring",checked)}
        checked={watch("isRecurring")}
        />
      </div>

          {isRecurring && (

              <div className="space-y-2">
        <label className="text-md font-medium text-gray-800 dark:text-gray-300">
          Recurring Interval
        </label>
        <Select
          className=""
          onValueChange={(value) => setValue("recurringInterval", value)}
        >
          <SelectTrigger className="mt-2 border-2 w-full border-gray-400 dark:border-gray-700">
            <SelectValue placeholder="Select Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAILY"> Daily </SelectItem >
            <SelectItem value="WEEKLY"> Weekly </SelectItem >
            <SelectItem value="MONTHLY"> Monthly </SelectItem >
            <SelectItem value="YEARLY"> Yearly </SelectItem >
          </SelectContent>
        </Select>
        {errors.recurringInterval && (
          <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>
        )}
      </div>
    )}

    <div className="flex gap-2">
      <Button onClick={()=>router.back()} className={'w-1/2 cursor-pointer'} type="button" variant={'destructive'}>Cancel</Button>
      <Button disabled={transactionLoading} className={'w-1/2 bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer'} type="submit" variant='outline'>{transactionLoading? <><Loader2 className="h-3 w-3 animate-spin"/>{editMode?"Updating...":"Creating..."}</>:<>{editMode?"Update Transaction":"Create Transaction"}</>}</Button>
    </div>
    </form>
  );
};

export default AddTransactionForm;
