"use strict";new Swiper(".hero-swiper",{navigation:{nextEl:".hero-swiper-button-next",prevEl:".hero-swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0}}),new Swiper(".reviews-swiper",{navigation:{nextEl:".reviews-swiper-button-next",prevEl:".reviews-swiper-button-prev"},spaceBetween:24,breakpoints:{320:{slidesPerView:"auto"},1351:{slidesPerView:2}}}),new Swiper(".lawyers-swiper",{spaceBetween:24,breakpoints:{320:{slidesPerView:"auto"},1351:{slidesPerView:4}}}),new Swiper(".materials-swiper",{spaceBetween:24,breakpoints:{320:{slidesPerView:"auto"},1351:{slidesPerView:3}}});var mySwiper,slider=document.querySelector(".services-swiper");function mobileSlider(){document.documentElement.clientWidth<=726&&"false"==slider.dataset.mobile&&(mySwiper=new Swiper(slider,{slidesPerView:"auto",spaceBetween:24}),slider.dataset.mobile="true"),document.documentElement.clientWidth>726&&(slider.dataset.mobile="false",slider.classList.contains("swiper-initialized")&&mySwiper.destroy())}function hideLogo(){var e=document.querySelector(".bottom-header"),t=document.querySelector(".header-logo"),o=document.querySelector(".hero-container");document.documentElement.clientHeight-e.clientHeight-52<o.clientHeight?(e.style.backgroundColor="transparent",t.style.opacity=0):(e.style.backgroundColor="rgba(1, 1, 1, 0.76)",t.style.opacity=1)}mobileSlider(),hideLogo(),window.addEventListener("resize",(function(){hideLogo(),mobileSlider()}));var burger=document.querySelector(".burger"),menu=document.querySelector(".header-nav"),menuLink=document.querySelectorAll(".nav-link");burger.addEventListener("click",(function(){burger.classList.toggle("burger--active"),menu.classList.toggle("header-nav--active"),document.body.classList.toggle("stop-scroll")})),menuLink.forEach((function(e){e.addEventListener("click",(function(){burger.classList.remove("burger--active"),menu.classList.remove("header-nav--active"),document.body.classList.remove("stop-scroll")}))})),document.addEventListener("click",(function(e){var t=e.target,o=t==menu||menu.contains(t),n=t==burger||burger.contains(t);o||n||!menu.classList.contains("header-nav--active")||(burger.classList.remove("burger--active"),menu.classList.remove("header-nav--active"),document.body.classList.remove("stop-scroll"))}));var inputPhone=document.querySelector('input[type="tel"]'),mask=new IMask(inputPhone,{mask:"+{7} (000) 000-00-00"}),orderCall=document.querySelector(".order-call"),modal=document.querySelector(".modal"),modalBody=document.querySelector(".modal-body"),modalClose=document.querySelector(".modal-close"),modalBtn=document.querySelector(".modal-form-btn"),body=document.body,inputName=document.querySelector('input[name="name"]');orderCall.addEventListener("click",(function(e){e.preventDefault(),mask.updateValue(),modal.classList.add("modal-open"),body.classList.add("stop-scroll")})),modal.addEventListener("click",(function(e){var t=e.target,o=t==modalBody||modalBody.contains(t),n=t==modalClose||modalClose.contains(t),r=t==modalBtn;(n&&modal.classList.contains("modal-open")||!o&&modal.classList.contains("modal-open")||r&&modal.classList.contains("modal-open"))&&(modal.classList.remove("modal-open"),body.classList.remove("stop-scroll"),inputPhone.value="",inputName.value="")}));