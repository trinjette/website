import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'website';

  ngOnInit() {
    $(document).ready(function(){
      animateSquare();
      animateCircle();
  });
  
  function makeNewPosition(){
      
      // Get viewport dimensions (remove the dimension of the div)
      var h = $(window).height() - (180 + $(window).height() / 2);
      var w = $(window).width() - (180 + $(window).width() * (1/8));
      
      /* Position */
      var nh = Math.floor(Math.random() * h + $(window).height()/4); // x
      var nw = Math.floor(Math.random() * w + $(window).width() * (1/16)); // y
      
      return [nh,nw];    
      
  }
  
  function animateSquare(){
      var newq = makeNewPosition();
      var speeds = calcSpeed([$('.square').offset().top, $('.square').offset().left], newq);
      $('.square').stop().animate({ top: newq[0], left: newq[1]}, speeds, function() {
        animateSquare();
      });
      
  };

  function animateCircle() {
    var newq = makeNewPosition();
    var speedc = calcSpeed([$('.circle').offset().top, $('.circle').offset().left], newq);
    $('.circle').stop().animate({ top: newq[0], left: newq[1]}, speedc, function() {
      animateCircle();
    });
  }
  
  function calcSpeed(prev, next) {
      
      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);
      
      var greatest = x > y ? x : y;
      
      var speedModifier = .1;
  
      var speed = Math.ceil(greatest/speedModifier);
  
      return speed;
  
  }
  }

}

