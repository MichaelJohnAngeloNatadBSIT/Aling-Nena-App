import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  products: Observable<any[]>;
  @ViewChild('myfab', { read: ElementRef }) carBtn: ElementRef;
  cart = {};
  cartAnimation: Animation;
 
  constructor(private productService: ProductService, private animationCtrl: AnimationController, private modalCtrl: ModalController) {}
 
  ngOnInit() {
    this.products = this.productService.getProducts();
 
    // Listen to Cart changes
    this.productService.cart.subscribe(value => {
      this.cart = value;
    });
  }
 
  ngAfterViewInit() {
    // Setup an animation that we can reuse
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
    .addElement(this.carBtn.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    .duration(300)
    .easing('ease-out');
  }
 
  addToCart(event, product) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
    this.cartAnimation.play();
  }
 
  removeFromCart(event, product) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
    this.cartAnimation.play();
  }
 
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage
    });
    await modal.present();
  }
}



// export class Tab1Page implements OnInit {
//   cart = [];
//   products = [];
//   cartItemCount : BehaviorSubject<number>;

//   @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

//   constructor( private cartService: CartService, private modalCtrl: ModalController ) {}
  
//   ngOnInit(){
//     this.products = this.cartService.getProducts();
//     this.cart = this.cartService.getCart();
//     this.cartItemCount = this.cartService.getCartItemCount();
//   }

//   addToCart(product){
//     this.cartService.addProduct(product);
//     this.animateCSS('tada');
//   }

//   async openCart(){
//     let modal = await this.modalCtrl.create({
//       component: CartModalPage,
//       cssClass: 'cart-modal'
//     });
//     modal.onWillDismiss().then(() => {
//       this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
//       this.animateCSS('bounceInLeft');
//     });
//     modal.present();
//   }

//   animateCSS(animationName, keepAnimated = false) {
//     const node = this.fab.nativeElement;
//     node.classList.add('animated', animationName)
    
//     function handleAnimationEnd() {
//       if (!keepAnimated) {
//         node.classList.remove('animated', animationName);
//       }
//       node.removeEventListener('animationend', handleAnimationEnd)
//     }
//     node.addEventListener('animationend', handleAnimationEnd)
//   }
// }
