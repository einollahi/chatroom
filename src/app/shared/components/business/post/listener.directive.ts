import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[listener]',
})
export class ListenerDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(this.el.nativeElement, 'sender');
    this.renderer.addClass(this.el.nativeElement, 'listener');
  }
}
