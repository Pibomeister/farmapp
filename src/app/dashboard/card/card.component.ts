import { ShopItem } from './../../models/shop-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  @Input() shopItem: ShopItem;

  constructor() { }

  ngOnInit() {
  }

}
