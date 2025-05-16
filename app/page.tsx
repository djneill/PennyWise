import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const mockAccounts = [
  { name: "Checking", balance: 5240.32, type: "Bank" },
  { name: "Savings", balance: 12500.0, type: "Bank" },
  { name: "Savings", balance: 12500.0, type: "New Tires" },
  { name: "Credit Card", balance: -1240.5, type: "Credit" },
];

const mockTransactions = [
  {
    date: "2024-03-15",
    description: "Grocery Store",
    amount: -85.32,
    category: "Food",
    posted: true,
  },
  {
    date: "2024-03-14",
    description: "Salary",
    amount: 3200.0,
    category: "Income",
    posted: true,
  },
  {
    date: "2024-03-13",
    description: "Gas Station",
    amount: -45.0,
    category: "Transportation",
    posted: false,
  },
];

const mockBudgets = [
  { category: "Food", spent: 450.32, budget: 600.0 },
  { category: "Transportation", spent: 245.0, budget: 300.0 },
  { category: "Entertainment", spent: 180.5, budget: 200.0 },
];

export default function Dashboard() {
  const totalBalance = mockAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const monthlyIncome = mockTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = mockTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Transaction
          </button>
          <button className="w-full sm:w-auto px-4 py-2 border border-input bg-background rounded-md hover:bg-accent">
            Add Account
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 sm:p-6 bg-card rounded-lg border shadow-cyan-500 shadow-md hover:shadow-cyan-500/50 transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span className="text-sm">Total Balance</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            ${totalBalance.toFixed(2)}
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-card rounded-lg border shadow-green-500 shadow-md hover:shadow-green-500/50 transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-sm">Monthly Income</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            ${monthlyIncome.toFixed(2)}
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-card rounded-lg border shadow-red-500 shadow-md hover:shadow-red-500/50 transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowDown className="h-4 w-4 text-red-500" />
            <span className="text-sm">Monthly Expenses</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            ${monthlyExpenses.toFixed(2)}
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-card rounded-lg border shadow-pink-500 shadow-md hover:shadow-pink-500/50 transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <PiggyBank className="h-4 w-4" />
            <span className="text-sm">Savings Rate</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            {(
              ((monthlyIncome - monthlyExpenses) / monthlyIncome) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Accounts */}
      {/* <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Accounts</h2>
          <button className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Account
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mockAccounts.map((account) => (
            <Link
              key={account.name}
              href={`/accounts/${account.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="block p-4 sm:p-6 border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {account.type}
                  </p>
                </div>
                <p className="text-lg font-semibold">
                  ${account.balance.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div> */}

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        {/* Desktop/tablet view */}
        <div className="hidden sm:block space-y-4">
          {mockTransactions.map((transaction, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-lg border shadow-slate-500 shadow-md hover:shadow-amber-500/50 transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 ">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p
                    className={`font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile view */}
        <div className="sm:hidden space-y-4">
          {mockTransactions.map((transaction, index) => (
            <div key={index} className="border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <span className="font-semibold text-base">
                  {transaction.description}
                </span>
                <span
                  className={`font-bold text-lg ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  {transaction.date} &bull; {transaction.category}
                </span>
                {transaction.posted && (
                  <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Posted
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Progress */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Budget Progress</h2>
        <div className="space-y-4">
          {mockBudgets.map((budget) => (
            <div key={budget.category} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <p className="font-medium">{budget.category}</p>
                <p className="text-sm text-muted-foreground">
                  ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                </p>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(budget.spent / budget.budget) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
