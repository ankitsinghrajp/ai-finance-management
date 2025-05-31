import { Suspense } from "react"
import {BarLoader} from "react-spinners"
const Dashboard = ({children}) => {
  return (
    <div className="px-5">
     
            <h1 className="md:text-5xl text-4xl font-extrabold mb-5 gradient tracking-tigher pr-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">Dashboard</h1>
        
        {/* Dashboard Page */}
        <Suspense fallback={<BarLoader className="mt-4" width={'100%'} color="#9333ea"/>}>
        {children}
        </Suspense>
    </div>
  )
}

export default Dashboard