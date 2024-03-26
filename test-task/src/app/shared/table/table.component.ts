import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../core/DTO/models/user';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [NgFor],
})
export class TableComponent {
  @Input({ required: true }) public items: User[] = [];
  @Output() public changeRow: EventEmitter<number> = new EventEmitter<number>();
}
