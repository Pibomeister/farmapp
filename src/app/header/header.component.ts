import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  constructor() { }

  ngOnInit() {
  }

}
