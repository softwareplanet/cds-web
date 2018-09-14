import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigated-container',
  templateUrl: './navigated-container.component.html',
  styleUrls: ['./navigated-container.component.scss']
})
export class NavigatedContainerComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('In navigated container');
  }

}
