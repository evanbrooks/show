var tilt = -3, roll = 0;
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
}