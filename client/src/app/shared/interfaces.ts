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

export interface Position
{
  name:string,
  cost:number,
  categoryId:number,
  user?:number,
  id?:number
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
