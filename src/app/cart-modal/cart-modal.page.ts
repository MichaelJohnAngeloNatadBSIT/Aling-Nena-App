import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})

export class CartModalPage implements OnInit {
  products = [];
 
  constructor(private productService: ProductService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
 
  ngOnInit() {
    const cartItems = this.productService.cart.value;
 
    this.productService.getProducts().pipe(take(1)).subscribe(allProducts => {
      this.products = allProducts.filter(p => cartItems[p.id]).map(product => {
        return { ...product, count: cartItems[product.id] };
      });
    });
  }
 
  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Thanks for your order',
      buttons: ['Continue shopping']
    });
 
    await alert.present();
 
    this.productService.checkoutCart();
    this.modalCtrl.dismiss();
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}


// export class CartModalPage implements OnInit {

//   cart: Product[] = [];

//   constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

//   ngOnInit() {
//     this.cart = this.cartService.getCart();
//   }
//   decreaseCartItem(product) {
//     this.cartService.decreaseProduct(product);
//   }
 
//   increaseCartItem(product) {
//     this.cartService.addProduct(product);
//   }
 
//   removeCartItem(product) {
//     this.cartService.removeProduct(product);
//   }
 
//   getTotal() {
//     return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
//   }
 
//   close() {
//     this.modalCtrl.dismiss();
//   }
 
//   async checkout() {
//     // Perfom PayPal or Stripe checkout process
 
//     let alert = await this.alertCtrl.create({
//       header: 'Thanks for your Order!',
//       message: 'We will deliver your food as soon as possible',
//       buttons: ['OK']
//     });
//     alert.present().then(() => {
//       this.modalCtrl.dismiss();
//     });
//   }

// }
