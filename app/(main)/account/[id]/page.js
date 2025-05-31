import { getAccountWithTransactions } from "@/actions/accounts"
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";
import AccountChart from "../_components/account-chart";

const Account =  async ({params}) => {
   const accountData = await getAccountWithTransactions(params.id);

   if(!accountData){
      notFound();
   }

   const {transaction,...account} = accountData;
  return (
    <div className=" px-5">
      <div className="flex gap-4 container md:mx-10 items-end justify-between">
      <div className="capitalize">
        <h1 className="md:text-5xl text-4xl font-extrabold mb-5 gradient tracking-tigher pr-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 capitalize">{account.name}</h1>
        <p className="text-muted-foreground">{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
      </div>

      <div className="text-right pb-2">
        <div className="text-xl sm:text-2xl font-bold">₹{parseFloat(account.balance).toFixed(2)}</div>
        <p className="text-sm text-muted-foreground">{account._count.transaction} Transactions</p>
      </div>
      </div>
      {/* Chart Section */}

      <Suspense
      fallback={<BarLoader className="mt-4" width={'100%'} color="#9333ea"/>} 
      >
          <AccountChart transactions={transaction}/>
      </Suspense>

      {/* Transaction table */}
      <Suspense
         fallback={<BarLoader className="mt-4" width={'100%'} color="#933ea"/>}
      >
        <TransactionTable transactions={transaction} />
      </Suspense>
    </div>

  )
}

export default Account