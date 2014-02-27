var tilt = -3, roll = 0;

var good_tilt = false;
var regions = [
  {
    angle: [-40, -30],
    name: "agamatrix"
  },
  {
    angle: [-30, -20],
    name: "bird"
  },
  {
    angle: [-20, -10],
    name: "arduino"
  },
  {
    angle: [-10, 10],
    name: "code"
  },
  {
    angle: [10, 20],
    name: "ripta"
  },
  {
    angle: [20, 30],
    name: "bioscopic"
  },
  {
    angle: [30, 40],
    name: "locu"
  },
];
var active_article;

for (var i = 0; i < regions.length; i++) {
  regions[i].el = document.querySelector("." + regions[i].name);
}

window.addEventListener("deviceorientation", tilt_detect, true);

tilt_log = document.getElementById('tilt');
roll_log = document.getElementById('roll');


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
  }

  if (good_tilt) {
    for (var i = 0; i < regions.length; i++) {
      if (tilt < regions[i].angle[0] && tilt > regions[i].angle[1]) {
        if (active_article) active_article.el.classList.remove("active");
        active_article = regions[i];
        active_article.el.classList.add("active");
        return;
      }
    }
  }

}
