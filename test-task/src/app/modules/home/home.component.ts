import { NgIf, NgClass } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/DTO/models/user';
import { TableComponent } from '../../shared/table/table.component';
import { UserFormComponent } from '../../shared/user-form/user-form.component';
import { PopupComponent } from '../../shared/popup/popup.component';
import { delay, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TableComponent, UserFormComponent, NgIf, NgClass, PopupComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  public userList: User[] = [];
  public showModal: boolean = false;
  public userId: number = 0;
  public popUpCondition: WritableSignal<string> = signal('');
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(private usersService: UsersService) {}

  public ngOnInit(): void {
    this.usersService.updateUserList
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.userList = this.usersService.getUsers();
      });

    this.usersService.showPopup
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((condition) => {
          this.popUpCondition.set(condition);
        }),
        delay(4000)
      )
      .subscribe(() => {
        this.popUpCondition.set('');
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  public setId(id: number) {
    this.userId = id;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
    this.userId = 0;
  }
}
