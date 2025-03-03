declare module './api' {
  interface UserData {
    email: string;
    password: string;
    name?: string;
  }

  export function register(userData: UserData): Promise<any>;
  export function login(userData: UserData): Promise<any>;
  export function fetchData(): Promise<any>;
}