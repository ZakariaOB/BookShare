import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { isNullOrWhiteSpace } from 'src/app/_utils/isNullOrWhiteSpace';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input() appHighlight: string;

  @Input() differentColorName: string;

  @Input('appHighlight') nameWhatYouWant: string;

  get usedColor(): string {
    if (!isNullOrWhiteSpace(this.nameWhatYouWant)) {
      return this.nameWhatYouWant;
    }
    return isNullOrWhiteSpace(this.appHighlight)
      ? this.differentColorName
      : this.appHighlight;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.usedColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
    this.el.nativeElement.style.color = 'black';
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = color === "yellow" ? 'black' : 'white';
  }
}
