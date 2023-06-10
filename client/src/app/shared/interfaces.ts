export interface User
{
  email: string,
  password: string
}

export interface Category
{
  name:string,
  imageSrc?:string,
  user?: string,
  id?: string
}

export interface Message_Categories
{
  message:string,
  categories: Category[]
}

export interface Position
{
  name:string,
  cost:number,
  categoryId:number,
  user?:number,
  id?:number,
  count?:number
}

export interface Message
{
  message: string
}

export interface Message_Position
{
  message: string
  position: Position
}

export interface Order
{
  date?: Date,
  order?: number,
  user?: number,
  list:string,
  positions?:Position[],
  id?:number
}

export interface Orders_menu_view
{
  name:string,
  cost:number,
  count:number,
  id?:number
}

export interface Filter
{
  start?: Date,
  end?: Date,
  order?: number
}

export interface Analytics
{
  gain:
  {
    percent:number,
    compare:number,
    yesterday:number,
    isHigher: boolean
  },
  orders:
  {
    percent:number,
    compare:number,
    yesterday:number,
    isHigher: boolean
  }
}
