"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

// Mock accounts data - this will come from Supabase later
const mockAccounts = [
  { id: "1", name: "Checking", balance: 5240.32, type: "Bank" },
  { id: "2", name: "Savings", balance: 12500.0, type: "Bank" },
  { id: "3", name: "Savings", balance: 250.0, type: "New Tires" },
  { id: "4", name: "Credit Card", balance: -1240.5, type: "Credit" },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground sm:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="h-full flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b">
              <Link href="/" className="text-xl font-bold">
                PennyWise
              </Link>
            </div>

            {/* Accounts List */}
            <nav className="flex-1 overflow-y-auto p-4">
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">
                Accounts
              </h2>
              <div className="space-y-1">
                {mockAccounts.map((account) => (
                  <Link
                    key={account.id}
                    href={`/accounts/${account.id}`}
                    className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                      pathname === `/accounts/${account.id}`
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {account.type}
                      </p>
                    </div>
                    <p
                      className={`font-medium ${
                        account.balance < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      ${Math.abs(account.balance).toFixed(2)}
                    </p>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  const theme = document.documentElement.classList.contains(
                    "dark"
                  )
                    ? "light"
                    : "dark";
                  document.documentElement.classList.toggle("dark");
                }}
                className="w-full px-4 py-2 text-sm border rounded-md hover:bg-accent"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`min-h-screen transition-all duration-200 ease-in-out ${
            isOpen ? "ml-64" : "ml-0"
          } sm:ml-64`}
        >
          <div className="p-4 sm:p-6">{children}</div>
        </main>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
