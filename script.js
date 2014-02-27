var tilt = -3, roll = 0;

var good_tilt = false;
var regions = [
  {
    tilt: 45,
    roll: -1,
    name: "agamatrix"
  },
  {
    tilt: 60,
    roll: -1,
    name: "bird"
  },
  {
    tilt: 70,
    roll: -1,
    name: "arduino"
  },
  {
    tilt: 90,
    roll: 0,
    name: "code"
  },
  {
    tilt: 70,
    roll: 1,
    name: "ripta"
  },
  {
    tilt: 60,
    roll: 1,
    name: "bioscopic"
  },
  {
    tilt: 45,
    roll: 1,
    name: "locu"
  },
];
var active_article
  , active_timer
  , active_timer_el = document.getElementById('activetimer')
  , active_timer_max = 3000 // ms
  , tilt_log = document.getElementById('tilt')
  , roll_log = document.getElementById('roll')
  ;

for (var i = 0; i < regions.length; i++) {
  regions[i].el = document.querySelector("." + regions[i].name);
}

window.addEventListener("deviceorientation", tilt_detect, true);



function tilt_detect(event) {
  t = event.beta;
  r = event.gamma;

  tilt = ~~(t * 1000) / 1000;
  roll = ~~(r * 1000) / 1000;
  tilt_update()
}

function tilt_update() {
  tilt_log.innerText = tilt;
  roll_log.innerText = roll;



  var sum = Math.abs(tilt) + Math.abs(roll);

  if (sum > 70 && tilt > 30 && !good_tilt) {
    good_tilt = true;
    document.body.classList.add("goodtilt");
  }
  else if ((sum < 70 || tilt < 30) && good_tilt) {
    good_tilt = false;
    document.body.classList.remove("goodtilt");
    cancelTilt();
  }

  if (good_tilt) {
    for (var i = 0; i < regions.length; i++) {
      var r = regions[i];
      var region_triggered = false;
      if ((roll < 0 && r.roll < 0)||(roll > 0 && r.roll > 0)||(r.roll == 0)) {
        if (Math.abs(r.tilt - tilt) < 5) {
          region_triggered = true;
        }
      }

      if (region_triggered && active_article !== r) {
        
        timer.reset_and_start();
        
        if (active_article) active_article.el.classList.remove("active");
        active_article = r;
        active_article.el.classList.add("active");
        return;
      }
    }
  }

}

function cancelTilt() {
  timer.cancel();
  if (active_article) active_article.el.classList.remove("active");
  active_article = null;
  active_timer_el.classList.remove("timer-active");
}


var timer = {
  count: 0,
  goal: 2000,
  running: false,
  resetting: false,
  started: 0,
  el: document.getElementById('activetimer'),
  inner: document.getElementById('activetimerinner'),
  cancel: function() {
    timer.resetting = true;
    timer.running = false;
  },
  reset_and_start: function() {
    timer.resetting = true;
    timer.running = true;
    timer.started = Date.now()
    timer.step();
  },
  step: function() {
    if (timer.running || timer.resetting) {
      window.requestAnimationFrame(timer.step);
    }

    if (timer.resetting) {
      if (timer.count > 10) {
        timer.count -= 10;
      }
      else {
        timer.resetting = false;
        timer.count = 0;
      }
    }

    if (timer.running) {
      //timer.count++;
      timer.count = Date.now() - timer.started;
      console.log(timer.count);
    }

    timer.inner.style.webkitTransform = "scale(" + timer.count/timer.goal + ")";

    if (timer.count > timer.goal) {
      timer.callback();
    }
  },
  callback: function() {
    timer.resetting = true;
    timer.running = false;
    alert("test callback")
  }
}