export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {}

  UserAdapter(data: any): any {
    return data as any;
  }

  UsersAdapter(data: any): any[] {
    return data as any[];
  }
}
