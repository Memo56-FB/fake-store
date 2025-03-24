import { Star, StarHalf } from "lucide-react"

export const renderRating = (rating: number) => {
  // ? if rating is a float, round it to 0.5 up
  const roundedRating = rating % 1 === 0 ? rating : Math.ceil(rating * 2) / 2
  const fullStars = Math.floor(roundedRating)
  const halfStars = roundedRating - fullStars === 0.5

  return Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) {
      return (
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    } else if (halfStars && i === fullStars) {
      return (
        <StarHalf
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    } else {
      return (
        <Star
          key={i}
          className="w-4 h-4 fill-muted text-muted-foreground"
        />
      );
    }
  })
}