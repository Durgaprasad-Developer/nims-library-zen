import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BookCard, Book } from "@/components/BookCard";
import { CartSidebar } from "@/components/CartSidebar";
import { FilterSection } from "@/components/FilterSection";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

// JEE & NEET focused book data
const initialBooks: Book[] = [
  {
    id: "1",
    title: "Concepts of Physics Vol. 1",
    author: "H.C. Verma",
    isbn: "978-8177091878",
    category: "Physics",
    subject: "Mechanics",
    examType: "JEE",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    status: "available",
    description: "Complete guide to mechanics for JEE preparation",
  },
  {
    id: "2",
    title: "NCERT Biology Class 11",
    author: "NCERT",
    isbn: "978-8174506948",
    category: "Biology",
    subject: "Cell Biology",
    examType: "NEET",
    difficulty: "Basic",
    coverImage: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&h=600&fit=crop",
    status: "available",
    description: "Foundation for NEET Biology preparation",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    author: "Morrison and Boyd",
    isbn: "978-0136436690",
    category: "Chemistry",
    subject: "Organic Chemistry",
    examType: "Both",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-15",
    description: "Advanced organic chemistry concepts",
  },
  {
    id: "4",
    title: "Problems in Calculus",
    author: "I.A. Maron",
    isbn: "978-9388511520",
    category: "Mathematics",
    subject: "Calculus",
    examType: "JEE",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop",
    status: "available",
    description: "Advanced calculus problems for JEE Advanced",
  },
  {
    id: "5",
    title: "NCERT Physics Class 12",
    author: "NCERT",
    isbn: "978-8174507204",
    category: "Physics",
    subject: "Electromagnetism",
    examType: "Both",
    difficulty: "Basic",
    coverImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=600&fit=crop",
    status: "reserved",
    description: "Essential physics concepts for competitive exams",
  },
  {
    id: "6",
    title: "Trueman's Biology Vol. 1",
    author: "K.N. Bhatia",
    isbn: "978-9388031585",
    category: "Biology",
    subject: "Zoology",
    examType: "NEET",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    status: "available",
    description: "Comprehensive zoology for NEET",
  },
  {
    id: "7",
    title: "Physical Chemistry",
    author: "O.P. Tandon",
    isbn: "978-9386320902",
    category: "Chemistry",
    subject: "Physical Chemistry",
    examType: "Both",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-20",
    description: "Complete physical chemistry guide",
  },
  {
    id: "8",
    title: "Concepts of Physics Vol. 2",
    author: "H.C. Verma",
    isbn: "978-8177093315",
    category: "Physics",
    subject: "Modern Physics",
    examType: "JEE",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    status: "available",
    description: "Advanced physics topics for JEE",
  },
  {
    id: "9",
    title: "Objective NCERT Biology",
    author: "MTG Editorial",
    isbn: "978-9389167849",
    category: "Biology",
    subject: "Botany",
    examType: "NEET",
    difficulty: "Basic",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    status: "available",
    description: "NCERT-based objective questions",
  },
  {
    id: "10",
    title: "Coordinate Geometry",
    author: "S.L. Loney",
    isbn: "978-9387663510",
    category: "Mathematics",
    subject: "Coordinate Geometry",
    examType: "JEE",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    status: "available",
    description: "Classic coordinate geometry text",
  },
  {
    id: "11",
    title: "GRB Organic Chemistry",
    author: "Dr. O.P. Agarwal",
    isbn: "978-9387158283",
    category: "Chemistry",
    subject: "Organic Chemistry",
    examType: "JEE",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    status: "borrowed",
    dueDate: "2025-10-18",
    description: "Advanced organic chemistry problems",
  },
  {
    id: "12",
    title: "Biology Vol. 1",
    author: "Pradeep Publications",
    isbn: "978-8178079042",
    category: "Biology",
    subject: "Cell Biology & Genetics",
    examType: "NEET",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=600&fit=crop",
    status: "available",
    description: "Detailed biology for NEET aspirants",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { toast } = useToast();

  // Move useMemo before early returns to follow Rules of Hooks
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

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
      />
      
      <div className="container px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Welcome, <span className="font-semibold text-foreground">{user.email}</span>
            </p>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {userRole === "teacher" ? "Teacher/Admin" : "Student"}
            </span>
          </div>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </div>

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
