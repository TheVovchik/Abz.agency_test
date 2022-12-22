export interface NewUser {
  name: string,
  email: string,
  phone: string,
  position_id: number,
  photo: File | null,
}

export interface User{
  id: number,
  position: string,
  registration_timestamp: Date,
  name: string,
  email: string,
  phone: string,
  position_id: number,
  photo: string,
}
