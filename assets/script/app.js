'use strict';

const dialogOne = document.querySelector('#dialog-one');
const dialogTwo = document.querySelector('#dialog-two');

const accept = document.querySelector('#button-accept');
const settings = document.querySelector('#button-settings');
const preferences = document.querySelector('#button-save');

const cookieOne = document.querySelector('.browser');
const cookieTwo = document.querySelector('.system');
const cookieThree = document.querySelector('.width');
const cookieFour = document.querySelector('.height');
const overlay = document.querySelector('.overlay')

const LIFETIME = 15;

window.addEventListener('load', () => {
  if (navigator.cookieEnabled) {
    if (!document.cookie) {
      console.log(`Cookies not found`);
      setTimeout(() => {
        dialogOne.classList.add('visible');
        overlay.classList.add('visible');
      }, 1000);
    } else {
      const cookies = ['Browser', 'Operating system', 'Screen width', 'Screen height'];
      cookies.forEach(cookie => getCookie(cookie));
    }
  }
});

// function createCookie() {
//   setCookie('Browser', cookieOne.checked ? checkBrowser() : 'rejected', 15);
//   setCookie('Operating system', cookieTwo.checked ? checkOS() : 'rejected', 15);
//   setCookie('Screen width', cookieThree.checked ? screen.width : 'rejected', 15);
//   setCookie('Screen height', cookieFour.checked ? screen.height : 'rejected', 15);
// }

function createCookie() {
  setCookie('Browser', cookieOne.checked ? checkBrowser() : 'rejected', 15);
  setCookie('Operating system', cookieTwo.checked ? checkOS() : 'rejected', 15);
  setCookie('Screen width', cookieThree.checked ? screen.width : 'rejected', 15);
  setCookie('Screen height', cookieFour.checked ? screen.height : 'rejected', 15);

  // Update UI to reflect selected options or 'rejected' values
  cookieOne.textContent = cookieOne.checked ? checkBrowser() : 'rejected';
  cookieTwo.textContent = cookieTwo.checked ? checkOS() : 'rejected';
  cookieThree.textContent = cookieThree.checked ? checkWindowWidth() : 'rejected';
  cookieFour.textContent = cookieFour.checked ? checkWindowHeight() : 'rejected';
}

function setCookie(name, value, maxAge) {
  const options = {
    path: '/',
    SameSite: 'Lax',
  };
  maxAge = LIFETIME;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=${options.path}; SameSite=${options.SameSite}`;
  // const decodedCookies = decodeURIComponent(document.cookie);
}


function getCookie(cookieName) {
  const name = cookieName + '=';
  const decodedCookies = decodeURIComponent(document.cookie);
  const matches = decodedCookies.match(new RegExp(name + '([^;]+)'));
  if (matches) {
      console.log(matches[1]);
      return matches[1];
  } else {
      console.log('Cookie not found');
      return '';
  }
}

function checkBrowser() {
  return window.navigator.userAgent.indexOf("Edg") !== -1 ? "Microsoft Edge" :
         window.navigator.userAgent.indexOf("OPR") !== -1 ? "Opera" :
         window.navigator.userAgent.indexOf("Chrome") !== -1 ? "Chrome" :
         window.navigator.userAgent.indexOf("Firefox") !== -1 ? "Firefox" :
         window.navigator.userAgent.indexOf("Safari") !== -1 ? "Safari" :
         (window.navigator.userAgent.indexOf("MSIE") !== -1 || window.navigator.userAgent.indexOf("rv:") !== -1) ? "Internet Explorer" :
         "Null";
}

function checkOS() {
  return window.navigator.userAgent.indexOf("Windows") !== -1 ? "Windows" :
         window.navigator.userAgent.indexOf("Mac OS") !== -1 ? "Mac OS" :
         window.navigator.userAgent.indexOf("Linux") !== -1 ? "Linux" :
         "Null";
}

function checkWindowWidth() {
  return window.innerWidth;
}

function checkWindowHeight() {
  return window.innerHeight;
}

accept.addEventListener('click', function() {
  dialogOne.classList.remove('visible');
  overlay.classList.remove('visible');
  setCookie('Browser', `${checkBrowser()}`, 15);
  setCookie('Operating system', `${checkOS()}`, 15);
  setCookie('Screen width', `${checkWindowWidth()}`, 15);
  setCookie('Screen height', `${checkWindowHeight()}`, 15);
})

settings.addEventListener('click', function() {
  dialogOne.classList.remove('visible');
  dialogTwo.classList.add('visible');
  overlay.classList.add('visible');
})

preferences.addEventListener('click', function() {
  dialogOne.classList.remove('visible');
  dialogTwo.classList.remove('visible');
  overlay.classList.remove('visible');
  createCookie();
})