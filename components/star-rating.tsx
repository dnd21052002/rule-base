import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            className={`size-3 ${
              filled
                ? "star-filled fill-yellow-400"
                : half
                  ? "star-filled fill-yellow-400/50"
                  : "text-white/10 fill-white/5"
            }`}
          />
        );
      })}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </div>
  );
}
