var tilt = -3, roll = 0;
window.addEventListener("deviceorientation", tilt_detect, true);

function tilt_detect(event) {
  tilt = event.beta;
  roll = event.gamma;
}

function tiltsense(it) {
  it.vel.x += 0.0001 * roll;
  it.vel.y += 0.0001 * tilt;
}