import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-bshare-collapsible',
  templateUrl: './bshare-collapsible.component.html',
  styleUrls: ['./bshare-collapsible.component.scss'],
})
export class BshareCollapsibleComponent implements OnInit {
  @Input() title: string = 'Title';

  isOpen: boolean = false;

  isCollapsed = false;
  
  constructor() {}

  ngOnInit(): void {
    
  }
  
  toggleOpenState($event: any): void {
    this.isOpen = !this.isOpen; 
    $event.stopPropagation();
  }

}
