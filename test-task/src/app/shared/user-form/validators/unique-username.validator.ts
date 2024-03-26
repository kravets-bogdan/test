import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UsersService } from '../../../core/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate(
    control: AbstractControl<string | null>
  ): Observable<ValidationErrors | null> {
    return this.usersService.getUserByUsername(control.value).pipe(
      map((user) => {
        return user ? { uniqueName: { isTaken: true } } : null;
      }),
      catchError(() => of(null))
    );
  }
}
