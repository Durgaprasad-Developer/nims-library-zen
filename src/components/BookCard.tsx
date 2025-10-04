import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

export type BookStatus = "available" | "borrowed" | "reserved";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  coverImage: string;
  status: BookStatus;
  dueDate?: string;
}

interface BookCardProps {
  book: Book;
  onBorrow: (bookId: string) => void;
  onReserve: (bookId: string) => void;
  isInCart?: boolean;
}

export function BookCard({ book, onBorrow, onReserve, isInCart }: BookCardProps) {
  const getStatusBadge = () => {
    switch (book.status) {
      case "available":
        return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" />Available</Badge>;
      case "borrowed":
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" />Borrowed</Badge>;
      case "reserved":
        return <Badge variant="info" className="gap-1"><BookOpen className="h-3 w-3" />Reserved</Badge>;
    }
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{book.author}</p>
        <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
        <p className="text-xs text-muted-foreground mt-1">Category: {book.category}</p>
        {book.dueDate && (
          <p className="text-xs text-destructive mt-2">Due: {book.dueDate}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        {book.status === "available" && !isInCart && (
          <Button 
            className="w-full" 
            onClick={() => onBorrow(book.id)}
          >
            Borrow Book
          </Button>
        )}
        {book.status === "available" && isInCart && (
          <Button 
            className="w-full" 
            variant="secondary"
            disabled
          >
            In Cart
          </Button>
        )}
        {book.status === "borrowed" && !isInCart && (
          <Button 
            className="w-full" 
            variant="secondary"
            onClick={() => onReserve(book.id)}
          >
            Reserve
          </Button>
        )}
        {(book.status === "reserved" || (book.status === "borrowed" && isInCart)) && (
          <Button 
            className="w-full" 
            variant="outline"
            disabled
          >
            {book.status === "reserved" ? "Reserved" : "Borrowed"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
