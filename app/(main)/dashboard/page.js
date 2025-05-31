import { getUserAccounts } from "@/actions/dashboard"
import CreateAccountDrawer from "@/components/create-account-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import AccountCard from "./_components/account-card"

const DashboardPage = async() => {

  const accounts = await getUserAccounts();
  return (
    <div className="px-5">
           {/* Budget Progress */}

           {/* Overview */}

           {/* Accounts grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <CreateAccountDrawer>
                <Card className={'cursor-pointer h-full w-full dark:bg-[#09090b] border-2 border-dashed hover:shadow-lg transition-shadow'}>
                    <CardContent className={'flex flex-col items-center justify-center text-muted-foreground h-full pt-5'}>
                        <Plus className="h-10 mb-2 w-10"/>
                        <p className="text-sm font-medium">Add New Account</p>
                    </CardContent>
                </Card>
            
            </CreateAccountDrawer>
               {accounts.length > 0 && accounts?.map((account)=>{
                return <AccountCard key={account.id} account={account}/>
               })}
                </div>
    </div>
  )
}

export default DashboardPage