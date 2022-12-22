type ValidationFails = {
  name: string[],
  email: string[],
  phone: string[],
  position_id: string[],
  photo: string[],
};

export type ApiError = {
  success: boolean,
  message: string,
  fails: ValidationFails,
};
