import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  closeSideNav() {
    this.sideNavClose.emit();
  }

}
