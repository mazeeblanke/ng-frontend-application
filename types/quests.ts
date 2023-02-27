export type Quest = {
  id: number,
  skillTree: string,
  skill: string,
  title: string,
  difficulty: number,
  experience: number,
  gold: number,
  type: string,
  cover: string
}

type Image = string

export type RawQuestErr = {
  code: boolean
}

export type RawQuest = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: Image,
  images: Image[]
}

export type Quests = Quest[]