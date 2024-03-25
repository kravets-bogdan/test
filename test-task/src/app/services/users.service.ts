import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public updateUserList: BehaviorSubject<null> = new BehaviorSubject(null);
  public showPopup: Subject<any> = new Subject();

  private userList: User[] = [
    {
      id: 1,
      username: 'mperry1992',
      firstname: 'Metthew',
      lastname: 'Perry',
      email: 'metthew@mail.com',
      password: {
        password: 'metthew',
        confirmPassword: 'metthew',
      },
      userType: 'Administrator',
    },
    {
      id: 2,
      username: 'jsmith23',
      firstname: 'John',
      lastname: 'Smith',
      email: 'jsmith@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 3,
      username: 'michael_green',
      firstname: 'Michael',
      lastname: 'Green',
      email: 'mgreen@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 4,
      username: 'sarah_1985',
      firstname: 'Sarah',
      lastname: 'Johnson',
      email: 'sjohnson@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 5,
      username: 'emily88',
      firstname: 'Emily',
      lastname: 'Davis',
      email: 'edavis@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 6,
      username: 'alex_23',
      firstname: 'Alexander',
      lastname: 'Brown',
      email: 'abrown@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 7,
      username: 'julia_m',
      firstname: 'Julia',
      lastname: 'Martinez',
      email: 'jmartinez@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 8,
      username: 'daniel34',
      firstname: 'Daniel',
      lastname: 'Wilson',
      email: 'dwilson@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 9,
      username: 'laura_c',
      firstname: 'Laura',
      lastname: 'Clark',
      email: 'lclark@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 10,
      username: 'robert_89',
      firstname: 'Robert',
      lastname: 'Anderson',
      email: 'randerson@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
    {
      id: 11,
      username: 'amanda_k',
      firstname: 'Amanda',
      lastname: 'King',
      email: 'aking@mail.com',
      password: {
        password: 'password123',
        confirmPassword: 'password123',
      },
      userType: 'Driver',
    },
  ];

  public getUsers(): User[] {
    return this.userList;
  }

  public getUserById(id: number): User | undefined {
    return this.userList.find((user) => user.id === id);
  }

  public addUser(data: User): void {
    this.userList.push(data);
    this.showPopup.next('success');
  }

  public deleteUser(id: number): void {
    this.userList = this.userList.filter((item) => item.id !== id);
    this.updateUserList.next(null);
    this.showPopup.next('success');
  }

  public updateUser(updatedUser: User): void {
    this.userList = this.userList.map((user) => {
      if (user.id === updatedUser.id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    this.showPopup.next('success');
    this.updateUserList.next(null);
  }

  public getUserByUsername(username: string | null): Observable<User | null> {
    const foundUser = this.userList.find((user) => user.username === username);

    return of(foundUser || null);
  }
}
