import { getUserAccounts } from "@/actions/dashboard"
import { defaultCategories } from "@/data/categories"
import AddTransactionForm from "./_components/add-transactions"
import { Suspense } from "react"
import { getTransaction } from "@/actions/transaction"

const AddTransactionPage = async ({searchParams}) => {
  const accounts = await getUserAccounts();

  const editId = searchParams?.edit;

  let initialData = null;
  if(editId){
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  console.log(editId);

  return (
    <div className="max-w-3xl border-2 border-gray-400 dark:border-gray-700 shadow-lg md:shadow-gray-300 shadow-gray-800 rounded-md pb-5 mx-auto px-5">
      <h1 className="md:text-4xl text-4xl mt-3 font-extrabold mb-8 gradient tracking-tigher pr-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">
        {editId?"Edit Transaction":"Add Transaction"}
      </h1>

      <Suspense fallback={<div className="text-center py-10 text-xl">Loading form...</div>}>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode = {!!editId}
          initialData = {initialData}
        />
      </Suspense>
    </div>
  )
}

export default AddTransactionPage
