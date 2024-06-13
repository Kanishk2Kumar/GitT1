let x1=0, y1=0;
window.client
const 
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  dist_to_draw = 50,
  delay = 1000,
  fsize = [
    '1.1rem', '1.4rem', '.8rem', '1.7rem'
  ],
  colors = [
  '#E23636',
  '#F9F3EE',
  '#E1F8DC',
  '#B8AFE6',
  '#AEE1CD',
  '#5EB0E5'
],
  rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min,
  selRand = (o) => o[rand(0, o.length -1)],
  distanceTo =  (x1, y1, x2, y2) => 
    Math.sqrt((Math.pow(x2-x1,2))+(Math.pow(y2-y1,2))),
  shouldDraw = (x, y) => 
    (distanceTo(x1, y1, x, y) >= dist_to_draw),
  addStr = (x, y) => {
    const str = document.createElement("div");
    str.innerHTML = '&#10022;';
    str.className = 'star';
    str.style.top = `${y + rand(-20,20)}px`;
    str.style.left = `${x}px`;
    str.style.color = selRand(colors);
    str.style.fontSize = selRand(fsize);
    document.body.appendChild(str);
    //console.log(rand(0, 3));
    const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
    
    str.animate({
      translate: `0 ${(y+fs)>vh?vh-y:fs}px`,
      opacity: 0,
      transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`
    }, {
      duration: delay,
      fill: 'forwards',

    });
    //could add a animation terminate listener, but why add the additional load
    setTimeout(() => {
        str.remove();
      }, delay);
  }

addEventListener("mousemove", (e) => {
  const {clientX, clientY} = e;
  if(shouldDraw(clientX, clientY)){
    addStr(clientX, clientY);
    x1 = clientX;
    y1 = clientY;
  }
});

// Projects
const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

// Contact Info
var focusedCard = document.querySelector('.spotlight');

window.addEventListener('mousemove', e => {
    /* Get mouse page coordinates */
    var percentageX = e.pageX / window.innerWidth * 100;
    var percentageY = e.pageY / window.innerHeight * 100;

    /* Center the background spotlight on mouse coordinates */
    focusedCard.style.backgroundImage = `radial-gradient(circle at ${percentageX}% ${percentageY}%, transparent 80px, rgba(0,0,0,0.6) 140px)`;
});

addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    if (shouldDraw(clientX, clientY)) {
        addStr(clientX, clientY);
        x1 = clientX;
        y1 = clientY;
    }
});

// Loader
// Random stop between 30% and 80%
let randomStop = Math.random() * (0.8 - 0.3) + 0.3;

let tl = gsap.timeline();

tl
 .to(".text", {
  duration: 2,
  text: "$ sudo apt-get install Portfolio"
 })
 .from(".progress-bar", {
  duration: 0.5,
  opacity: 0
 })
 .to(".progress", {
  duration: 1,
  width: `${randomStop * 100}%`
 })
 .to(".progress", {
  duration: 1 - randomStop,
  width: "100%"
 })
 .to(".text, .progress-bar", {
  duration: 0.5,
  opacity: 0
 })
 .to(".preloader", {
  duration: 0.5,
  height: 0,
  onComplete: () => {
   document.querySelector(".preloader").style.display = "none";
  }
 });
