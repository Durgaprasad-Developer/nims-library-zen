import { X, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "./BookCard";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Book[];
  onRemoveFromCart: (bookId: string) => void;
  onConfirmBorrow: () => void;
}

export function CartSidebar({ isOpen, onClose, cartItems, onRemoveFromCart, onConfirmBorrow }: CartSidebarProps) {
  if (!isOpen) return null;

  const borrowedBooks = cartItems.filter(book => book.status === "borrowed");
  const reservedBooks = cartItems.filter(book => book.status === "reserved");
  const availableBooks = cartItems.filter(book => book.status === "available");

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">My Books</h2>
            <p className="text-sm text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "book" : "books"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No books yet</h3>
              <p className="text-sm text-muted-foreground">
                Browse the library and add books to borrow or reserve
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Available Books to Borrow */}
              {availableBooks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="success">To Borrow</Badge>
                    <span className="text-sm text-muted-foreground">({availableBooks.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {availableBooks.map(book => (
                      <Card key={book.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-2">{book.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                              <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => onRemoveFromCart(book.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Borrowed Books */}
              {borrowedBooks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="warning">Currently Borrowed</Badge>
                    <span className="text-sm text-muted-foreground">({borrowedBooks.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {borrowedBooks.map(book => (
                      <Card key={book.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-2">{book.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                              {book.dueDate && (
                                <p className="text-xs text-destructive mt-1">Due: {book.dueDate}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Reserved Books */}
              {reservedBooks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Badge variant="info">Reserved</Badge>
                    <span className="text-sm text-muted-foreground">({reservedBooks.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {reservedBooks.map(book => (
                      <Card key={book.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm line-clamp-2">{book.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                              <p className="text-xs text-info mt-1">Waiting for availability</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {availableBooks.length > 0 && (
          <div className="border-t p-6">
            <Button 
              className="w-full" 
              size="lg"
              onClick={onConfirmBorrow}
            >
              Confirm Borrow ({availableBooks.length} {availableBooks.length === 1 ? "book" : "books"})
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
