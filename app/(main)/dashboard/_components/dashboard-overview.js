"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

const DashboardOverview = ({ accounts, transactions }) => {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account

  const accountTransactions = transactions.filter(
    (t) => (t.accountId === selectedAccountId)
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  //Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpeses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);

    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  //Group expenses by category
  const expensesByCategory = currentMonthExpeses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += transaction.amount;
    return acc;
  }, {});

  //Format data for pie chart

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-5 ">
      <Card className={"dark:bg-[#09090b]"}>
        <CardHeader
          className={
            "flex flex-row items-center justify-between space-y-0 pb-4"
          }
        >
          <CardTitle className={"text-gray-800 dark:text-gray-200 font-medium"}>
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[150px] border-2 text-xs font-semibold text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-800">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent className={""}>
              {accounts.map((account) => (
                <SelectItem className={""} key={account.id} value={account.id}>
                  {account.name} Account
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => {
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1 my-2">
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "PP")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center",
                          transaction.type === "EXPENSE"
                            ? "text-red-500 text-xs font-semibold"
                            : "text-green-500 text-xs font-semibold"
                        )}
                      >
                        {transaction.type === "EXPENSE" ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        ₹{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Card className={"dark:bg-[#09090b]"}>
        <CardHeader>
          <CardTitle className={"text-gray-800 dark:text-gray-200 font-medium"}>
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className={"p-0 pb-5"}>
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No expenses recorded for this month.
            </p>
          ) : (
            <div className="w-full h-[300px] md:h-[400px]">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        outerRadius="70%"
        dataKey="value"
        fill="#8884d8"

      >
        {pieChartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend 
        verticalAlign="bottom" 
        height={36}
        wrapperStyle={{
          fontSize: '12px',
          paddingTop: '10px'
        }}
        formatter={(value, entry) => (
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {value}
          </span>
        )}
      />
      <Tooltip
        formatter={(value, name) => [
          `₹${value.toFixed(2)}`,
          name
        ]}
        labelStyle={{ display: 'none' }}
        contentStyle={{
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
