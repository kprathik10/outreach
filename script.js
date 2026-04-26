
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

/* DYNAMIC HEADER HEIGHT */
function getHeaderOffset(){
  const nav = document.querySelector("nav");
  const secondary = document.querySelector(".secondary-nav");

  let total = 0;

  if(nav){
    total += nav.offsetHeight;
  }

  if(
    secondary &&
    window.getComputedStyle(secondary).display !== "none"
  ){
    total += secondary.offsetHeight;
  }

  total += 18; /* breathing room */

  return total;
}

/* PERFECT NAVIGATION */
function scrollToTarget(selector){
  const target = document.querySelector(selector);
  if(!target) return;

  const offset = getHeaderOffset();

  const targetTop =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", function(){

  /* internal navigation */
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

  /* ESC closes menu */
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      closeMenu();
    }
  });

  /* click outside closes menu */
  document.addEventListener("click", function(e){

    const menu = document.getElementById("mobileMenu");
    const burger = document.querySelector(".hamburger");

    if(!menu || !burger) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedBurger = burger.contains(e.target);

    if(
      menu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedBurger
    ){
      closeMenu();
    }

  });

  /* resize safety */
  window.addEventListener("resize", function(){
    if(window.innerWidth > 1180){
      closeMenu();
    }
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-question").forEach(btn => {

    btn.addEventListener("click", function(){

      const card = this.parentElement;
      const icon = this.querySelector("i");
      const isOpen = card.classList.contains("open");

      document.querySelectorAll(".faq-card").forEach(item => {
        item.classList.remove("open");

        const ic = item.querySelector("i");
        if(ic){
          ic.className = "fa-solid fa-plus";
        }
      });

      if(!isOpen){
        card.classList.add("open");
        if(icon){
          icon.className = "fa-solid fa-minus";
        }
      }

    });

  });

});
