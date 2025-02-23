import {Component, computed, effect, input, signal} from '@angular/core'
import {InputTextModule} from 'primeng/inputtext'
import {NgForOf} from '@angular/common'
import {Button} from 'primeng/button'
import {Renderer2Directive} from '../../shared/directive/renderer2.directive'


interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-main',
  imports: [
    InputTextModule,
    NgForOf,
    Renderer2Directive
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  host: {'[class.dark]': 'isDarkTheme()'}
})


export class MainComponent {
  count = signal(0)
  isEven = computed(() => this.count() % 2 === 0)
  text = signal(localStorage.getItem('autosave-text') || '')
  isDarkTheme = signal(localStorage.getItem('theme') === 'dark');
  products = signal<Product[]>([
    {id: 1, name: 'Книга', price: 10},
    {id: 2, name: 'Флешка', price: 20}
  ])


  constructor() {
    effect(() => {
      localStorage.setItem('theme', this.isDarkTheme() ? 'dark' : 'light');
      localStorage.setItem('autosave-text', this.text());
    })
  }



  toggleTheme(): void {
    this.isDarkTheme.update(v => !v)
  }

  addProduct(): void {
    const newProduct = {
      id: Date.now(),
      name: 'Product' + (this.products().length + 1),
      price: Math.floor(Math.random() + 100)
    }
    this.products.update(product => [...product, newProduct])
  }

  removeProduct(id: number): void {
    this.products.update(product => product.filter(product => product.id !== id))
  }

  total = computed(() =>
    this.products().reduce((sum, product) => sum + product.price, 0)
  )


  increment() {
    this.count.update(v => v + 1)
  }

  decrement() {
    this.count.update(v => v - 1)
  }

}
