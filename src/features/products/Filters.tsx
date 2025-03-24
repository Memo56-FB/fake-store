import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import useProducts from "./hooks/useProducts"
import { renderRating } from "./utils/renderRating"

export default function ProductFilters() {
  const {
    categories,
    handleCategoryChange,
    priceSort,
    setPriceSort,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    selectedCategories
  } = useProducts()

  const minPrice = 0
  const maxPrice = 1000

  return (
    <div className="px-4 py-8 relative">
      <aside className="grid gap-8 lg:sticky lg:top-20 lg:z-10">
        <div className="sticky top-4 space-y-6 bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          {/* Category filter */}
          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-base">Categorías</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Price sort */}
          <div className="space-y-2">
            <h3 className="font-medium">Ordenar por precio</h3>
            <RadioGroup value={priceSort} onValueChange={setPriceSort}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="price-none" />
                <Label htmlFor="price-none">Sin ordenar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="price-asc" />
                <Label htmlFor="price-asc">Precio: menor a mayor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="desc" id="price-desc" />
                <Label htmlFor="price-desc">Precio: mayor a menor</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price range */}
          <div className="space-y-4">
            <h3 className="font-medium">Rango de precios</h3>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              max={maxPrice}
              min={minPrice}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating filter */}
          <div className="space-y-2">
            <h3 className="font-medium">Calificación mínima</h3>
            <RadioGroup
              value={ratingFilter.toString()}
              onValueChange={(value) => setRatingFilter(Number.parseInt(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="rating-0" />
                <Label htmlFor="rating-0">Todas las calificaciones</Label>
              </div>
              {[1, 2, 3, 4].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center">
                    {renderRating(rating)}
                    <span className="ml-1">o más</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </aside>
    </div>
  )
}

