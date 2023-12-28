import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Input() public edit: boolean;
  @Output() public submit = new EventEmitter();

  public submitPhoto(): void {
    this.submit.emit();
  }

}
