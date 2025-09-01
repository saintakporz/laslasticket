var swiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    spaceBetween: 20,
    sliderPerGroup: 4,
    loop: false,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
        slidesPerView: 1,
        },
        520: {
        slidesPerView: 2,
        },
        768: {
        slidesPerView: 3,
        },
        1000: {
        slidesPerView: 4,
        },
    },
});

const body = document.querySelector('body'),
    form = document.getElementById('form'),
    transfer = document.querySelector('.transfer'),
    transferB = document.querySelector('.transfer1'),
    formContainer = document.getElementById('popUp'),
    cardLink = document.querySelector('.card-link'),
    secInput = document.getElementById('secInput'),
    rowInput = document.getElementById('rowInput'),
    seatInput = document.getElementById('seatInput'),
    headerInput = document.getElementById('headerInput'),
    numInput = document.getElementById('numInput'),
    imgUrlInput = document.getElementById('imgUrlInput'),
    imgTitleInput = document.getElementById('imgTitleInput'),
    timeInput = document.getElementById('timeInput'),
    locationInput = document.getElementById('locationInput'),
    headerOutput = document.querySelector('.header-output'),
    secOutput = document.querySelector('.sec-output'),
    rowOutput = document.querySelector('.row-output'),
    seatOutput = document.querySelector('.seat-output'),
    imageOutput = document.querySelector('.image-output'),
    timeOutput = document.querySelector('.time-output'),
    locationOutput = document.querySelector('.location-output'),
    imageTitleOutput = document.querySelector('.image-title-output'),
    subSecOutput = document.querySelector('.sub-sec-output'),
    subRowOutput = document.querySelector('.sub-row-output'),
    manualSecOutput = document.querySelector('.manual-sec-output'),
    manualRowOutput = document.querySelector('.manual-row-output'),
    swiperWrapper = document.querySelector('.swiper-wrapper'),
    originalSlide = swiperWrapper.querySelector('.swiper-slide'),
    manualBtn = document.querySelector('.manual-button'),
    wrapper = document.querySelector('.new-wrapper'),
    manualTransfer = document.querySelector('.transfer-manually'),
    manualBackBtn = document.querySelector('.manual-back-btn'),
    parent = document.querySelector('.parent'),
    manualPage = document.querySelector('.manualPage');

manualBtn.addEventListener('click', function(event){

                wrapper.classList.add('open');
                console.log('manual transfer opened');
});
manualBackBtn.addEventListener('click', function(event) {
               event.preventDefault();

               let clickedElement = event.target;
               if (!manualBackBtn.classList.contains('.new-wrapper')) {
                 wrapper.classList.remove('open');
                 console.log('manual tranfer closed');
               }
});
let linkActive = false;
cardLink.addEventListener('click', (e) => {
  e.preventDefault();
  linkActive = !linkActive;
  if (linkActive) {
    body.classList.add('card-link');
    console.log('card-link active');
    document.addEventListener('click', handleEventClicks);
  } else {
    console.log('link is inactive');
    document.removeEventListener('click', handleEventClicks);
  }
});
function handleEventClicks(event) {
  console.log('EventListener is active');
  if (!formContainer.contains(event.target) && event.target != cardLink) {
    linkActive = false;
    body.classList.remove('card-link');
    document.removeEventListener('click', handleEventClicks);
    console.log('EventListener is removed');
  }
}
transfer.addEventListener('click', function(event) {
  event.preventDefault();
  linkActive = !linkActive;
  if (linkActive) {
    body.classList.add('clicked');
    console.log('transfer link active');
    document.addEventListener('click', handleTransferClicks);
  } else {
    document.removeEventListener('click', handleTransferClicks);
  }
});
function handleTransferClicks(event) {
  console.log('EventListener');
  if (!transferB.contains(event.target) && event.target != transfer) {
    linkActive = false;
    body.classList.remove('clicked');
    document.removeEventListener('click', handleTransferClicks);
    console.log('EventListener removed');
  }
}


function saveFormDataToLocalStorage() {
    const formData = {
        header: headerInput.value,
        sec: secInput.value,
        row: rowInput.value,
        seat: seatInput.value,
        num: numInput.value,
        imgUrl: imgUrlInput.value,
        time: timeInput.value,
        location: locationInput.value,
        imgTitle: imgTitleInput.value
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}
    
function displayFormDataFromLocalStorage() {
    headerOutput.textContent = '';
    secOutput.textContent = '';
    rowOutput.textContent = '';
    seatOutput.textContent = '';
    imageTitleOutput.textContent = '';
    timeOutput.textContent = '';
    locationOutput.textContent = '';
    imageOutput.src = ''; 
    subSecOutput.textContent = '';
    subRowOutput.textContent = '';
    manualSecOutput.textContent = '';
    manualRowOutput.textContent = '';
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
            secOutput.textContent += savedFormData.sec;
            rowOutput.textContent += savedFormData.row;
            seatOutput.textContent += savedFormData.seat;
            headerOutput.textContent += savedFormData.header;
            imageTitleOutput.textContent += savedFormData.imgTitle;
            timeOutput.textContent += savedFormData.time;
            locationOutput.textContent += savedFormData.location;
            imageOutput.src = savedFormData.imgUrl;
            subSecOutput.textContent += savedFormData.sec;
            subRowOutput.textContent += savedFormData.row;
            manualSecOutput.textContent += savedFormData.sec;
            manualRowOutput.textContent += savedFormData.row;
    }
}

function createSlides(count) {
    swiper.removeAllSlides();
    for ( var i = 0; i < count; i++) {
      var clonedSlide = originalSlide.cloneNode(true);
      swiperWrapper.appendChild(clonedSlide);
      var cardContainer = document.querySelector('.card-wrappers');
      const savedFormData = JSON.parse(localStorage.getItem('formData'));
      let storedSeat = savedFormData.seat;
      let seatValue = storedSeat !== null ? storedSeat : '';
      let incrementedSeatValue;
      if (seatValue === '-') {
          incrementedSeatValue = '-';
        } else {
            incrementedSeatValue = parseInt(seatValue) + i;
          }
      var targetedSpan = clonedSlide.querySelector('.seat-output');
          targetedSpan.textContent = incrementedSeatValue;
      var card = document.createElement('div');
          card.className = 'cards';
      var paragraph = document.createElement('p');
      var seatSpan = document.createElement('span');
          seatSpan.className = 'seat';
          seatSpan.textContent = incrementedSeatValue;
      var icon = document.createElement('i');
          icon.className = 'bx bx-check';
          paragraph.appendChild(seatSpan);
          card.appendChild(paragraph);
          card.appendChild(icon);
          cardContainer.appendChild(card);
      
      card.addEventListener('click', function() {
              this.classList.toggle('selecteds');
              var selectedCards = document.querySelectorAll('.cards.selecteds');
              var selectedCount = selectedCards.length;
              var selectedCountSpan = document.querySelector('.selected');
              selectedCountSpan.textContent = selectedCount;
              var manualCountSpan = document.querySelector('.manual-ticket-count');
              manualCountSpan.textContent = selectedCount;
              var manualCountSpans = document.querySelector('.manual-ticket-counts');
              manualCountSpans.textContent = selectedCount;
              
              var isSelected = this.classList.contains('selecteds');
              var icon = this.querySelector('i');
              icon.style.display = isSelected ? 'block' : 'none';
              
              var link = document.querySelector('.transfer-link');
              if (selectedCount >= 1) {
                  link.classList.add('activated');
                  link.setAttribute('href', '#');
              } else {
                  link.classList.remove('activated');
                  link.removeAttribute('href');
              }
          });
      const cards = document.querySelectorAll('.cards');
      const displayElement = document.querySelector('.display-element');
      const selecetedSeats = [];
          cards.forEach(function(card) {
            card.addEventListener('click', function() {
                const seat = card.querySelector('.seat').textContent;
                
                if (selecetedSeats.includes(seat)) {
                    const index = selecetedSeats.indexOf(seat);
                    selecetedSeats.index;
                } else {
                    selecetedSeats.push(seat);
                }
                displayElement.textContent = selecetedSeats.join(', ');
            });
      });
      let isActive = false;
      const cardLink = clonedSlide.querySelector('.card-link');
        cardLink.addEventListener('click', function(event) {
          event.preventDefault();
          isActive = !isActive;
          if (isActive) {
            body.classList.add('card-link');
            console.log('is active');
            document.addEventListener('click', handleCardLinks);
          } else {
            document.removeEventListener('click', handleCardLinks);
          }
        });
        
        function handleCardLinks() {
          console.log('event active');
          if (!formContainer.contains(event.target) && event.target != cardLink) {
            isActive = false;
            body.classList.remove('card-link');
            document.removeEventListener('click', handleCardLinks);
            console.log('EventListener removed');
          }
        }
    }
    swiper.update();
    var slideCount = document.querySelector('.ticket-count');
        slideCount.textContent = count;
}
var link = document.querySelector('.transfer-link');
    link.addEventListener('click', function(event) {
            event.stopPropagation();
        if (!link.classList.contains('activated')) {
            event.preventDefault();
        } else {
            event.preventDefault();
            navBarBtns();
            
        }
        
});
function navBarBtns() {
  const parentContainer = document.querySelector('.parent');
    parentContainer.classList.add('show');
    const navbar = document.querySelector('.manual-page');
    const wrapper = document.querySelector('.new-wrapper');
    const transferBtns = document.querySelector('.transfer-btns');
    console.log('Transfer page opened');
    
    transferBtns.addEventListener('click', function(event) {
      if (!transferBtns.classList.contains('.new-wrapper')) {
        parentContainer.classList.remove('show');
        console.log('Transfer page closed');
      }
    });
}

    
form.addEventListener('submit', function(event) {
  event.preventDefault();
  saveFormDataToLocalStorage();
  displayFormDataFromLocalStorage();
  var slideCount = parseInt(numInput.value);
  createSlides(slideCount);
  form.reset();
  window.location.reload();
});
    
window.addEventListener('DOMContentLoaded', function() {
  displayFormDataFromLocalStorage();
  const savedFormData = JSON.parse(localStorage.getItem('formData'));
  var slideCount = parseInt(savedFormData.num);
  if (slideCount) {
    createSlides(slideCount);
  }
});
    