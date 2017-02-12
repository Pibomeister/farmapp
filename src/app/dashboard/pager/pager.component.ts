import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fa-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() pager: any;
  @Input() showNo: number;
  @Output() sPage: EventEmitter<number> = new EventEmitter();
  constructor() {   }

  ngOnInit() {
    
  }

  setPage(page: number){
    this.sPage.emit(page);
  }

}
