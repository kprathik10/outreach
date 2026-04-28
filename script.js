function openMenu(){
  const menu = document.getElementById("mobileMenu");
  if(menu){
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMenu(){
  const menu = document.getElementById("mobileMenu");
  if(menu){
    menu.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* HEADER OFFSET */
function getHeaderOffset(){
  const nav = document.querySelector("nav");
  const secondary = document.querySelector(".secondary-nav");

  let total = 0;

  if(nav) total += nav.offsetHeight;

  if(
    secondary &&
    window.getComputedStyle(secondary).display !== "none"
  ){
    total += secondary.offsetHeight;
  }

  total += 18;

  return total;
}

/* PERFECT SCROLL */
function scrollToTarget(selector){

  const target = document.querySelector(selector);
  if(!target) return;

  const top =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    getHeaderOffset();

  window.scrollTo({
    top: top,
    behavior: "smooth"
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", function(){

  /* INTERNAL LINKS */
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

      const href = this.getAttribute("href");

      if(!href || href === "#") return;

      const target = document.querySelector(href);

      if(target){
        e.preventDefault();
        scrollToTarget(href);
        closeMenu();
      }

    });

  });

  /* ESC CLOSES MENU */
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      closeMenu();
    }
  });

  /* CLICK OUTSIDE CLOSES MENU */
  document.addEventListener("click", function(e){

    const menu = document.getElementById("mobileMenu");
    const burger = document.querySelector(".hamburger");

    if(!menu || !burger) return;

    const clickedInside = menu.contains(e.target);
    const clickedBurger = burger.contains(e.target);

    if(
      menu.classList.contains("active") &&
      !clickedInside &&
      !clickedBurger
    ){
      closeMenu();
    }

  });

  /* RESIZE SAFETY */
  window.addEventListener("resize", function(){
    if(window.innerWidth > 1180){
      closeMenu();
    }
  });

  /* FAQ ACCORDION */
  document.querySelectorAll(".faq-question").forEach(btn => {

    btn.addEventListener("click", function(){

      const card = this.parentElement;
      const icon = this.querySelector("i");
      const isOpen = card.classList.contains("open");

      document.querySelectorAll(".faq-card").forEach(item => {
        item.classList.remove("open");

        const ic = item.querySelector("i");
        if(ic) ic.className = "fa-solid fa-plus";
      });

      if(!isOpen){
        card.classList.add("open");
        if(icon) icon.className = "fa-solid fa-minus";
      }

    });

  });

  /* SERVICES SLIDER */
  const slider = document.getElementById("servicesSlider");

  if(slider){

    const slides = slider.querySelectorAll(".service-slide");
    const dotsWrap = document.getElementById("servicesDots");
    const prevBtn = document.querySelector(".service-nav.prev");
    const nextBtn = document.querySelector(".service-nav.next");

    let current = 0;

    slides.forEach((slide, i) => {

      const dot = document.createElement("span");

      if(i === 0){
        dot.classList.add("active");
      }

      dot.addEventListener("click", function(){
        goToSlide(i);
      });

      dotsWrap.appendChild(dot);

    });

    const dots = dotsWrap.querySelectorAll("span");

    function goToSlide(index){

      current = index;

      slider.scrollTo({
        left: slider.clientWidth * current,
        behavior: "smooth"
      });

      dots.forEach(dot => dot.classList.remove("active"));

      if(dots[current]){
        dots[current].classList.add("active");
      }
    }

    if(nextBtn){
      nextBtn.addEventListener("click", function(){
        current = (current + 1) % slides.length;
        goToSlide(current);
      });
    }

    if(prevBtn){
      prevBtn.addEventListener("click", function(){
        current = (current - 1 + slides.length) % slides.length;
        goToSlide(current);
      });
    }

    /* Touch swipe support */
    let startX = 0;

    slider.addEventListener("touchstart", function(e){
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", function(e){

      let endX = e.changedTouches[0].clientX;
      let diff = startX - endX;

      if(diff > 50){
        current = (current + 1) % slides.length;
        goToSlide(current);
      }

      if(diff < -50){
        current = (current - 1 + slides.length) % slides.length;
        goToSlide(current);
      }

    });

  }

  const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
if (window.scrollY > 300) {
scrollTopBtn.classList.add('show');
} else {
scrollTopBtn.classList.remove('show');
}
});
});

function openEnquiry(){
document.getElementById("enquiryModal").classList.add("active");
document.body.style.overflow = "hidden";
}

function closeEnquiry(){
document.getElementById("enquiryModal").classList.remove("active");
document.body.style.overflow = "";
}

function validatePhoneNumber(value){

const cleaned = value.replace(/[^\d+]/g,"").replace(/\s/g,"");
const digits = cleaned.replace(/\+/g,"");

if(digits.length < 10) return false;
if(digits.length > 15) return false;

if(/^(\d)\1+$/.test(digits)) return false;

return true;
}

document.getElementById("enquiryForm").addEventListener("submit", function(e){

e.preventDefault();

const form = this;
const phone = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

phone.classList.remove("input-invalid");
phoneError.innerText = "";

if(!validatePhoneNumber(phone.value.trim())){
phone.classList.add("input-invalid");
phoneError.innerText = "Enter a valid mobile number.";
return;
}
const btn = document.getElementById("submitBtn");
const success = document.getElementById("formSuccess");

btn.disabled = true;
btn.classList.remove("loading","success");
btn.classList.add("success");

success.innerText = "Thank you. We’ll contact you shortly.";
success.classList.add("show");

/* collect data now */
const data = new FormData(form);

/* instant reset */
form.reset();

/* close modal quickly */
setTimeout(() => {
closeEnquiry();
}, 1400);

/* restore button UI */
setTimeout(() => {
btn.disabled = false;
btn.classList.remove("success");
success.classList.remove("show");
}, 1800);

/* background send with retry */
submitWithRetry(data, 3);

});


function submitWithRetry(formData, retries){

fetch("https://script.google.com/macros/s/AKfycbyfZPVkYcF8GAvQnV4cBrToJTvzmOOgteOjSNm2Aqpj2YrFECcaLu0N7HoIWmVPlIgk/exec", {
method:"POST",
body:formData
})
.then(r => {
if(!r.ok) throw new Error("Failed");
return r.text();
})
.catch(() => {

if(retries > 1){

setTimeout(() => {
submitWithRetry(formData, retries - 1);
}, 2500);

}else{

setTimeout(() => {
alert("We received your enquiry request, but submission confirmation was delayed. Please message us if needed.");
}, 3000);

}

});

}