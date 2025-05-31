"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categoryColors } from "@/data/categories";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileEdit,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { bulkDeleteTransactions } from "@/actions/accounts";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,

    

  } = useFetch(bulkDeleteTransactions);

  const filteredAndSortedTransactions = useMemo(()=>{

    let result = [...transactions];

    // Apply search term
    if(searchTerm){
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction)=> transaction.description?.toLowerCase().includes(searchLower));
    }

    // Recurring filter
    if(recurringFilter){
      result = result.filter((transaction)=>{
        if(recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      })
    }

    //Apply type filter
    if(typeFilter){
      result = result.filter((transaction)=>transaction.type === typeFilter);
    }

    //Apply sorting 
    result.sort((a,b)=>{
      let comparision = 0;
        
      switch(sortConfig.field){
        case "date":
          comparision = new Date(a.date) - new Date(b.date);
          break;
        
        case "amount":
          comparision = a.amount - b.amount;
          break;
        
        case "category":
          comparision = a.category.localeCompare(b.category);
          break;

          default:
            comparision = 0;
      }

      return sortConfig.direction === "asc" ? comparision : -comparision;
    })

    return result;
  },[
    transactions,
    searchTerm,
    typeFilter,
    recurringFilter,
    sortConfig
  ]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field == field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item != id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id)
    );
  };

  const handleBulkDelete = async ()=>{

      if(!window.confirm(`Are you sure you want to delete ${selectedIds} transactions?`)){
          return;
      }
     await deleteFn(selectedIds);
  }

  useEffect(()=>{
      if(deleted && !deleteLoading){
        toast.success("Transactions deleted successfully!");
      }
  },[deleted,deleteLoading]);




  const handleClearFilter = ()=>{

    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedIds([]);
 }

  return (
    <div className="space-y-4">

      {deleteLoading && <BarLoader className="mt-4 md:ml-20" width={'94%'} color="#9333ea" />}
      {/* Filters */}

      <div className="flex flex-col sm:flex-row gap-4 md:ml-20 mt-10">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={"Search Transactions..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={"pl-8 border-2 dark:border-gray-700 border-gray-300"}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className={'border-2 dark:border-gray-700 border-gray-300'} >
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>


          <Select value={recurringFilter} onValueChange={(value)=> setRecurringFilter(value)}>
            <SelectTrigger className='w-[160px] border-2 dark:border-gray-700 border-gray-300'>
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring only</SelectItem>
              <SelectItem value="non-recurring">Non-recurring only</SelectItem>
            </SelectContent>
          </Select>
           </div>
           <div className="flex items-center gap-2">
  
            {(searchTerm || typeFilter || recurringFilter) && (
              <Button onClick={handleClearFilter} variant={'outline'} title={"Clear Filters"}>
                <X className="h-3 w-3 hover:cursor-pointer"/>
                Clear Filters
              </Button>
            )}

               {selectedIds.length > 0 && <div>
            <Button onClick={handleBulkDelete} className={'hover:cursor-pointer flex items-center gap-1'} variant={'destructive'}>
              <Trash2 className="h-3 w-3"/>
            Delete Selected ({selectedIds.length})
            </Button>
            </div>}
            </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-md border md:ml-20 my-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length ===
                      filteredAndSortedTransactions.length &&
                    filteredAndSortedTransactions.length > 0
                  }
                  className="border border-gray-400 text-black data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:text-black rounded-md hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                />
              </TableHead>
              <TableHead
                className={"cursor-pointer"}
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date{" "}
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead>Description</TableHead>

              <TableHead
                className={"cursor-pointer"}
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category{" "}
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead
                className={"cursor-pointer"}
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount{" "}
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className={"w-[50px]"} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className={"text-center text-muted-foreground"}
                >
                  No Transactions Found!
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction.id)}
                      checked={selectedIds.includes(transaction.id)}
                      className="border border-gray-400 text-black data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:text-black rounded-md hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={"capitalize"}>
                    <span
                      className="px-2 py-1 text-white text-xs font-semibold rounded-md"
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    style={{
                      color: transaction.type === "EXPENSE" ? "red" : "green",
                    }}
                    className={"text-right font-medium"}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}₹{" "}
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            className={
                              "bg-purple-200 hover:bg-purple-400 text-purple-700 cursor-pointer  text-xs gap-1 flex items-center"
                            }
                            variant={"outline"}
                          >
                            <RefreshCcw className="h-3 w-3" />
                            {RECURRING_INTERVALS[transaction.recurringInterval]}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <div className="font-medium">Next Date:</div>
                            <div>
                              {format(
                                new Date(transaction.nextRecurringDate),
                                "PP"
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge
                        className={
                          "bg-gray-300 dark:bg-black text-xs gap-1 flex items-center"
                        }
                        variant={"outline"}
                      >
                        <Clock className="h-3 w-3" />
                        One Time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="outline-none border-none"
                        asChild
                      >
                        <Button
                          className={"hover:cursor-pointer h-8 w-8 p-0"}
                          variant={"ghost"}
                        >
                          <MoreHorizontal className="h-4 w-4 " />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className={
                            "text-sm font-bold cursor-pointer flex items-center gap-4"
                          }
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                        >
                          <FileEdit
                            size={2}
                            className=" text-blue-600 border-none"
                          />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={
                            " flex items-center cursor-pointer gap-4 text-sm font-bold"
                          }
                          onClick={()=>deleteFn([transaction.id])}
                        >
                          <Trash2 className="h-2 w-2 text-destructive" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
