export type FoodAllergen = Readonly<{
  name: string,
  color: string | null
}>

export type FoodLabel = Readonly<{
  name: string,
  color: string | null
}>

export type Food = Readonly<{
  name: string,
  allergens: readonly FoodAllergen[],
  labels: readonly FoodLabel[]
}>

export type Meal = Readonly<{
  entry?: readonly Food[] | undefined,
  main?: readonly Food[] | undefined,
  side?: readonly Food[] | undefined,
  fromage?: readonly Food[] | undefined,
  dessert?: readonly Food[] | undefined,
  drink?: readonly Food[] | undefined
}>

export type Menu = Readonly<{
  date: Date,
  lunch: Meal | undefined,
  dinner: Meal | undefined
}>