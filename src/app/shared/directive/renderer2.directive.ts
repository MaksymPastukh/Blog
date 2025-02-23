import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core'

@Directive({
  selector: '[theoryRenderer2]'
})
export class Renderer2Directive implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    const div = this.renderer.createElement('div')
    const text = this.renderer.createText('Create with help Renderer2')
    this.renderer.appendChild(div, text)
    this.renderer.appendChild(this.el.nativeElement, div)

  }

  @HostListener('click', ['event'])
  onClick(event: Event) {
    console.log('Elem clicked', event)
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue')
  }
}
