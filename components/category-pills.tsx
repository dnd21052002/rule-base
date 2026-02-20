"use client";

import { cn } from "@/lib/utils";
import { type Category, categories } from "@/lib/data";

interface CategoryPillsProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            selected === category
              ? "border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
              : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
