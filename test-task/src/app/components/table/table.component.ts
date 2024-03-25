import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/user';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [NgFor],
})
export class TableComponent {
  @Input({ required: true }) public users: User[] = [];
  @Output() public setUpUser: EventEmitter<number> = new EventEmitter<number>();
}
