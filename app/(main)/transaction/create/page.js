import { getUserAccounts } from "@/actions/dashboard"
import { defaultCategories } from "@/data/categories"
import AddTransactionForm from "./_components/add-transactions"

const AddTransactionPage = async () => {
  const accounts = await getUserAccounts()
  return (
    <div className="max-w-3xl border-2 border-gray-400 dark:border-gray-700 shadow-lg md:shadow-gray-300 shadow-gray-800 rounded-md pb-5 mx-auto px-5">
      <h1 className="md:text-4xl text-4xl mt-3 font-extrabold mb-8 gradient tracking-tigher pr-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">Add Transaction</h1>
      <AddTransactionForm
      accounts={accounts}
      categories={defaultCategories}
      />
    </div>
  )
}

export default AddTransactionPage