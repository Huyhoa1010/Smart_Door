export const isValidEmail = (stringEmail: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(stringEmail);
export const isValidPassword = (stringPassword: string) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(stringPassword);
