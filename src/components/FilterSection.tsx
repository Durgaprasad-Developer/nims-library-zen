import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterSectionProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

const categories = ["All", "Fiction", "Non-Fiction", "Science", "History", "Technology", "Literature"];
const statuses = ["All", "Available", "Borrowed", "Reserved"];

export function FilterSection({ 
  selectedCategory, 
  selectedStatus, 
  onCategoryChange, 
  onStatusChange 
}: FilterSectionProps) {
  return (
    <div className="space-y-4 py-6 border-b">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase text-muted-foreground">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "secondary" : "outline"}
              size="sm"
              onClick={() => onStatusChange(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
