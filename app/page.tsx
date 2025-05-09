import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const mockAccounts = [
  { name: "Checking", balance: 5240.32, type: "bank" },
  { name: "Savings", balance: 12500.0, type: "bank" },
  { name: "Credit Card", balance: -1240.5, type: "credit" },
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Transaction
          </button>
          <button className="px-4 py-2 border border-input bg-background rounded-md hover:bg-accent">
            Add Account
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-card rounded-lg border shadow-cyan-500 shadow-md hover:shadow-cyan-500/50 transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span className="text-sm">Total Balance</span>
          </div>
          <p className="text-2xl font-bold mt-2">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-[0_4px_12px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_12px_rgba(6,182,212,0.2)] transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-sm">Monthly Income</span>
          </div>
          <p className="text-2xl font-bold mt-2">${monthlyIncome.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-[0_4px_12px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_12px_rgba(6,182,212,0.2)] transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowDown className="h-4 w-4 text-red-500" />
            <span className="text-sm">Monthly Expenses</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            ${monthlyExpenses.toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-[0_4px_12px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_12px_rgba(6,182,212,0.2)] transition-shadow">
          <div className="flex items-center gap-2 text-muted-foreground">
            <PiggyBank className="h-4 w-4" />
            <span className="text-sm">Savings Rate</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {(
              ((monthlyIncome - monthlyExpenses) / monthlyIncome) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Accounts</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Add Account
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockAccounts.map((account) => (
            <Link
              key={account.name}
              href={`/accounts/${account.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="block p-6 border rounded-lg hover:border-primary transition-colors"
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
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="space-y-2">
          {mockTransactions.map((transaction, index) => (
            <div key={index} className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category}
                  </p>
                </div>
                <div className="text-right">
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
      </div>

      {/* Budget Progress */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Budget Progress</h2>
        <div className="space-y-4">
          {mockBudgets.map((budget) => (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between">
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
