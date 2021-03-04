import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'recycler-view',
  templateUrl: './recycler-view.component.html',
  styleUrls: ['./recycler-view.component.scss'],
})
export class RecyclerViewComponent implements OnInit {

  @Input() length: number = null;
  @Input() moreItemsAvailable: boolean = true;
  @Input() errorState: boolean = false;
  @Output() fetchMoreItems = new EventEmitter<undefined>();
  @Output() resetList = new EventEmitter<undefined>();
  isFetching: boolean = false;

  constructor() { }

  ngOnInit() { }

  getArray(): Array<any> {
    return Array(this.length == null ? 0 : this.length);
  }

  fetchItems(listview: HTMLElement) {
    if (listview.clientHeight + listview.scrollTop >= listview.scrollHeight - 100 && !this.isFetching && this.moreItemsAvailable) {
      this.isFetching = true;
      this.fetchMoreItems.emit();
      setTimeout(() => {
        this.isFetching = false;
      }, 3000);
    }
  }

  async reset(element?: HTMLElement) {
    this.resetList.emit();
    while (this.length == null) {
      await new Promise(function (resolve) {
        setTimeout(resolve, 500);
      });
    }
    element != null && element["complete"]();
  }

}
