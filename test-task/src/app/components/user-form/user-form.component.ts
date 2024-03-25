import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User, UserType } from '../../types/user';
import { NgFor, NgIf } from '@angular/common';
import { passwordShouldMatch } from './validators/password-should-match.validator';
import { UsersService } from '../../services/users.service';
import { UniqueUsernameValidator } from './validators/unique-username.validator';
import { passwordStrengthValidator } from './validators/digit-letter-validator';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  imports: [ReactiveFormsModule, NgFor, NgIf],
})
export class UserFormComponent implements OnChanges {
  @Input() public userId: number = 0;
  @Output() public closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() public createUser: EventEmitter<void> = new EventEmitter<void>();

  public userTypeOptions = Object.values(UserType);
  public form = this.fb.group({
    username: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [
          this.uniqueUsername.validate.bind(this.uniqueUsername),
        ],
      },
    ],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.email]],
    userType: ['', [Validators.required]],
    password: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            passwordStrengthValidator,
          ],
        ],
        confirmPassword: '',
      },
      {
        validators: passwordShouldMatch,
      }
    ),
  });
  private user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private uniqueUsername: UniqueUsernameValidator
  ) {}

  public ngOnChanges(): void {
    if (this.userId) {
      this.user = this.usersService.getUserById(this.userId);
      if (this.user) {
        this.form.patchValue({
          username: this.user.username,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          userType: this.user.userType,
          password: {
            password: this.user.password.password,
            confirmPassword: this.user.password.confirmPassword,
          },
        });
      }
    }
  }

  public submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const userData = this.form.value as User;

      this.usersService.addUser({ ...userData, id: Math.random() });
      this.closeModal.emit();
    }
  }

  public updateUser(): void {
    const userData = this.form.value as User;
    if ((this.user = { ...userData, id: this.userId })) {
      this.closeModal.emit();
    }

    if (this.form.valid) {
      this.usersService.updateUser({ ...userData, id: this.userId });
      this.closeModal.emit();
    }
  }

  public deleteUser(): void {
    this.usersService.deleteUser(this.userId);
    this.closeModal.emit();
  }
}
