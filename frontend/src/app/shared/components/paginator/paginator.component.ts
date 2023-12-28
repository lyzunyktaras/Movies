import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() value = 1;
  @Input() total: number;
  @Input() pageSize: number;
  @Input() visibleRangeLength = 5;
  @Output() valueChange = new EventEmitter<number>();
  public totalPages: number;
  public visiblePages: number[];

  public ngOnInit(): void {
    this.updateVisiblePages();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.total || changes.pageSize) this.updateTotalPages();
  }

  public selectPage(page: number): void {
    this.value = page;
    this.updateVisiblePages();
    this.valueChange.emit(this.value);
  }
  private updateVisiblePages(): void {
    const length = Math.min(this.totalPages, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(
        this.value - Math.ceil(length / 2),
        this.totalPages - length
      ),
      0
    );
    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }
  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.pageSize);
  }

}
