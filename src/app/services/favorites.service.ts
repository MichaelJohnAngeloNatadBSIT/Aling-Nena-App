import { Injectable } from '@angular/core';

export interface Favorites {
  id: number;
  name: string;
  price: number;
  amount: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  data: Favorites[] = [
    { id: 0, name: 'Adobo', price: 50.25, amount: 0, img:'/assets/img/adobo.jpg' },
    { id: 1, name: 'Afritada', price: 50.25, amount: 0, img:'/assets/img/afritada.jpg' },
    { id: 2, name: 'Sinigang', price: 50.25, amount: 0, img:'/assets/img/sinigang.jpg' },
    { id: 3, name: 'Pakbet', price: 50.25, amount: 0, img:'/assets/img/pakbet.jpg' }
  ];

  constructor() { }

  getFavorites() {
    return this.data;
  }
}
