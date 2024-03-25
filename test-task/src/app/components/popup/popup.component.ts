import { NgClass } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

enum Conditional {
  SUCCES = 'success',
  ERROR = 'error',
}

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  imports: [NgClass],
})
export class PopupComponent implements OnChanges {
  @Input() public condition: string = '';
  @Input() public position: string = '';
  public message: string = '';

  public ngOnChanges(): void {
    this.getMessage();
  }

  private getMessage(): string {
    switch (this.condition) {
      case Conditional.SUCCES:
        return (this.message = 'Success message');
      case Conditional.ERROR:
        return (this.message = 'Error message');
      default:
        return '';
    }
  }
}
