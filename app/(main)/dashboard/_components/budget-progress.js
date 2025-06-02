"use client"
import { updateBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/use-fetch";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BudgetProgress = ({initialBudget,currentExpenses}) => {

    const [isEditing,setIsEditing] = useState(false);
    const [newBudget,setNewBudget] = useState(
        initialBudget?.amount?.toString() || ""
    );

    const percentUsed = initialBudget? (currentExpenses / initialBudget.amount) * 100 : 0;


    const {
        loading: isLoading,
        fn: updateBudgetFn,
        data: updatedBudget,
        error,
    } = useFetch(updateBudget);
    const handleUpdateBudget = async()=>{
        const amount = parseFloat(newBudget);

        if(isNaN(amount) || amount<=0){
             toast.error("Please enter a valid amount!");
             return;
        }

        await updateBudgetFn(amount);

    }

    useEffect(()=>{

        if(updatedBudget?.success){
            setIsEditing(false);
            toast.success("Budget updated successfully!");
        }

    },[updatedBudget]);

    useEffect(()=>{

        if(error){
            toast.error("Failed to update budget!");
        }

    },[error])

    const handleCancelBudget = ()=>{
        setNewBudget(initialBudget?.amount?.toString() || "");
        setIsEditing(false);
    }


    return(
   <Card className={'dark:bg-[#09090b] mb-5'}>
  <CardHeader className={'flex flex-row items-center justify-between space-y-0 pb-2'}>
    <div className="flex-1">
    <CardTitle>Monthly Budget (Default Account)</CardTitle>
    <div className="flex items-center gap-1 mt-3">
        {isEditing? (<div className="flex items-center gap-2 "> 
            <Input
            type="number"
            value={newBudget}
            onChange={(e)=>{setNewBudget(e.target.value)}}
            placeholder="Enter amount"
            className={'w-36'}
            disabled={isLoading}
            autoFocus
            />
            <Button disabled={isLoading} variant={'ghost'} size={'icon'} onClick={handleUpdateBudget}>
                <Check className="h-4 w-4 cursor-pointer text-green-500"/>
            </Button>
            <Button disabled={isLoading} variant={'ghost'} size={'icon'} onClick={handleCancelBudget}>
                <X className="h-4 w-4 cursor-pointer text-red-500"/>
            </Button>

        </div>):(
            <>
            <CardDescription>
                {
                    initialBudget ? `₹${currentExpenses.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`:"You haven't set a budget yet"
                }

            </CardDescription>
            <Button
            variant={'ghost'}
            size={'icon'}
            onClick={()=> setIsEditing(true)}
            className={'h-6 w-6'}
            >
            <Pencil className="h-3 cursor-pointer w-3"/>
            </Button>
            </>
        )} 
        </div>
    </div>
    
  </CardHeader>
  <CardContent>
   {initialBudget && (
    <div>
        <Progress value={percentUsed}
        extraStyles ={`${percentUsed >=90 ? 'bg-red-500': percentUsed >=75? 'bg-yellow-500': 'bg-green-500'}`}

        />
        <p className="text-xs text-muted-foreground text-right mt-1 mr-1">{percentUsed.toFixed(1)}% used</p>
    </div>
   )}
  </CardContent>
</Card>
  )
}

export default BudgetProgress