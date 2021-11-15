import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { MenuController } from '@ionic/angular';  

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectTabs: string = "favorites";

  favorites = [];

  constructor( private favoriteService: FavoritesService, private menu: MenuController) { }

  ngOnInit(){
    this.favorites = this.favoriteService.getFavorites();
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
