import { Check, Clock } from "lucide-react";

// Mock data - this will come from Supabase later
const mockAccount = {
  id: "1",
  name: "Checking",
  balance: 5240.32,
  type: "bank",
  transactions: [
    {
      id: "1",
      date: "2024-03-15",
      description: "Grocery Store",
      amount: -85.32,
      category: "Food",
      posted: true,
    },
    {
      id: "2",
      date: "2024-03-14",
      description: "Salary",
      amount: 3200.0,
      category: "Income",
      posted: true,
    },
    {
      id: "3",
      date: "2024-03-13",
      description: "Gas Station",
      amount: -45.0,
      category: "Transportation",
      posted: false,
    },
    {
      id: "4",
      date: "2024-03-12",
      description: "Restaurant",
      amount: -65.5,
      category: "Food",
      posted: true,
    },
    {
      id: "5",
      date: "2024-03-11",
      description: "Movie Theater",
      amount: -25.0,
      category: "Entertainment",
      posted: false,
    },
  ],
};

export default function AccountPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the account data based on the ID
  const account = mockAccount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{account.name}</h1>
          <p className="text-muted-foreground">{account.type}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-left sm:text-right">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-xl sm:text-2xl font-bold">
              ${account.balance.toFixed(2)}
            </p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Transaction
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full sm:w-auto px-3 py-1.5 text-sm border rounded-md"
            />
            <select className="w-full sm:w-auto px-3 py-1.5 text-sm border rounded-md">
              <option>All Categories</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>Income</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Description</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {account.transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4 font-medium">{transaction.description}</td>
                  <td className="p-4 text-muted-foreground">
                    {transaction.category}
                  </td>
                  <td className="p-4">
                    {transaction.posted ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <Check className="h-4 w-4" />
                        Posted
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Clock className="h-4 w-4" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td
                    className={`p-4 text-right font-medium ${
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {account.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{transaction.description}</p>
                <p
                  className={`font-medium ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {transaction.date}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {transaction.category}
                  </span>
                </div>
                {transaction.posted ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <Check className="h-4 w-4" />
                    Posted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Clock className="h-4 w-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
