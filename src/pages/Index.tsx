import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BookCard, Book } from "@/components/BookCard";
import { CartSidebar } from "@/components/CartSidebar";
import { FilterSection } from "@/components/FilterSection";
import { useToast } from "@/hooks/use-toast";

// Sample book data
const initialBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Literature",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Fiction",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-15",
  },
  {
    id: "4",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    isbn: "978-0-06-231609-7",
    category: "History",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0-13-235088-4",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    status: "reserved",
  },
  {
    id: "6",
    title: "The Lean Startup",
    author: "Eric Ries",
    isbn: "978-0-307-88789-4",
    category: "Non-Fiction",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "7",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "978-0-553-10953-5",
    category: "Science",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-20",
  },
  {
    id: "8",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Literature",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "9",
    title: "The Art of War",
    author: "Sun Tzu",
    isbn: "978-1-59030-426-1",
    category: "History",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "10",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "978-0-374-27563-1",
    category: "Non-Fiction",
    coverImage: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop",
    status: "available",
  },
  {
    id: "11",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Fiction",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-18",
  },
  {
    id: "12",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0-262-03384-8",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=400&h=600&fit=crop",
    status: "available",
  },
];

const Index = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { toast } = useToast();

  const handleBorrow = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book && !cartItems.find(item => item.id === bookId)) {
      setCartItems([...cartItems, book]);
      toast({
        title: "Added to cart",
        description: `"${book.title}" has been added to your cart.`,
      });
    }
  };

  const handleReserve = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      const updatedBooks = books.map(b => 
        b.id === bookId ? { ...b, status: "reserved" as const } : b
      );
      setBooks(updatedBooks);
      
      const reservedBook = { ...book, status: "reserved" as const };
      setCartItems([...cartItems, reservedBook]);
      
      toast({
        title: "Book reserved",
        description: `"${book.title}" has been reserved. You'll be notified when it's available.`,
        variant: "default",
      });
    }
  };

  const handleRemoveFromCart = (bookId: string) => {
    const book = cartItems.find(item => item.id === bookId);
    setCartItems(cartItems.filter(item => item.id !== bookId));
    
    if (book?.status === "reserved") {
      const updatedBooks = books.map(b => 
        b.id === bookId ? { ...b, status: "borrowed" as const } : b
      );
      setBooks(updatedBooks);
    }
    
    toast({
      title: "Removed from cart",
      description: book ? `"${book.title}" has been removed.` : "Book removed.",
    });
  };

  const handleConfirmBorrow = () => {
    const availableInCart = cartItems.filter(book => book.status === "available");
    
    const updatedBooks = books.map(book => {
      const inCart = availableInCart.find(item => item.id === book.id);
      if (inCart) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        return { 
          ...book, 
          status: "borrowed" as const,
          dueDate: dueDate.toISOString().split('T')[0]
        };
      }
      return book;
    });
    
    setBooks(updatedBooks);
    
    const updatedCart = cartItems.map(book => {
      const wasAvailable = availableInCart.find(item => item.id === book.id);
      if (wasAvailable) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        return {
          ...book,
          status: "borrowed" as const,
          dueDate: dueDate.toISOString().split('T')[0]
        };
      }
      return book;
    });
    
    setCartItems(updatedCart);
    
    toast({
      title: "Books borrowed successfully!",
      description: `You've borrowed ${availableInCart.length} ${availableInCart.length === 1 ? "book" : "books"}. Due in 14 days.`,
    });
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery);
      
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || book.status === selectedStatus.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [books, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <main className="container px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-xl p-8 text-center bg-gradient-to-r from-primary to-secondary text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome to NIMS Library</h2>
          <p className="text-lg opacity-90">Discover thousands of books across all categories</p>
        </div>

        {/* Filters */}
        <FilterSection 
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
        />

        {/* Book Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              {searchQuery ? "Search Results" : "All Books"}
            </h3>
            <p className="text-muted-foreground">
              {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
            </p>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBorrow={handleBorrow}
                  onReserve={handleReserve}
                  isInCart={cartItems.some(item => item.id === book.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onConfirmBorrow={handleConfirmBorrow}
      />
    </div>
  );
};

export default Index;
