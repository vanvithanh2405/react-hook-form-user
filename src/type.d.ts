export interface IOptionItem {
  label: string,
  value: string
}

export interface IUser {
  id: number,
  full_name: string,
  email: string,
  address: {
    name: string
  },
  city: string,
  country: string,
  state: string,
  billing: boolean
}