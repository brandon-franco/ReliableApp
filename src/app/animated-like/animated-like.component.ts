import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animated-like',
  templateUrl: './animated-like.component.html',
  styleUrls: ['./animated-like.component.scss'],
  animations: [
    trigger('heart', [
        state('liked', style({
            color: '#e74c3c',
            fill: '#e74c3c',
            opacity: '1',
            transform: 'scale(1.1)'
        })),
        transition('unliked <=> liked', animate('100ms ease-out'))
    ])
  ]
})
export class AnimatedLikeComponent implements OnInit {

  public likeState: string = 'heart';
  public iconName: string = 'heart-empty';

  constructor() { }

  ngOnInit() {

  }

  toggleLikeState(){

    if(this.likeState == 'unliked'){
      this.likeState = 'liked';
      this.iconName = 'heart';
    } else {
      this.likeState = 'unliked';
      this.iconName = 'heart-empty';
    }

  }

}