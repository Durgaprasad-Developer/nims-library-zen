import { ShoppingCart, Search, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import nimsLogo from "@/assets/nims-logo.png";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (value: string) => void;
}

export function Header({ cartItemCount, onCartClick, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img src={nimsLogo} alt="NIMS College" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary">NIMS Library</h1>
            <p className="text-xs text-muted-foreground">Institute of Management & Science</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books, authors, ISBN..."
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <BookOpen className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                {cartItemCount}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
