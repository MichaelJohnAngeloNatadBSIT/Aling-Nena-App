import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectTabs: string = "favorites";

  favorites = [];

  constructor( private favoriteService: FavoritesService) { }

  ngOnInit(){
    this.favorites = this.favoriteService.getFavorites();
  }

}
