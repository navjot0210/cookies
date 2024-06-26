'use strict';

const dialogOne = document.querySelector('#dialog-one');
const dialogTwo = document.querySelector('#dialog-two');

const accept = document.querySelector('#button-accept');
const settings = document.querySelector('#button-settings');
const preferences = document.querySelector('#button-save');

const cookieOne = document.querySelector('.cookie-one');
const cookieTwo = document.querySelector('.cookie-two');
const cookieThree = document.querySelector('.cookie-three');
const cookieFour = document.querySelector('.cookie-four');
const overlay = document.querySelector('.overlay')

const LIFETIME = 15;


function checkCookie() {
  if (navigator.cookieEnabled) {
    if (!document.cookie) {
      console.log(`Cookies not found`);
      setTimeout(() => {
        dialogOne.classList.add('visible');
        overlay.classList.add('visible');
      }, 1000);
    } else {
      const cookies = ['Browser', 'OS', 'width', 'height'];
      cookies.forEach(cookie => getCookie(cookie));
    }
  }
}

function createCookie() {
  setCookie('Browser', cookieOne.checked ? checkBrowser() : 'rejected', 15);
  setCookie('OS', cookieTwo.checked ? checkOS() : 'rejected', 15);
  setCookie('width', cookieThree.checked ? checkWindowWidth() : 'rejected', 15);
  setCookie('height', cookieFour.checked ? checkWindowHeight() : 'rejected', 15);
}

function setCookie(name, value, maxAge) {
  const options = {
    path: '/',
    SameSite: 'Lax',
  };
  maxAge = LIFETIME;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=${options.path}; SameSite=${options.SameSite}`;
}

function getCookie(cookie) {
  const name = cookie + '=';
  const decodedCookies = decodeURIComponent(document.cookie);
  const matches = decodedCookies.match(new RegExp(name + '([^;]+)'));
  if (matches) {
      console.log(cookie + ': ' + matches[1]);
      return { name: cookie, value: matches[1] };
  } else {
      console.log(`Cookie ${cookie} not found`);
      return null;
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
  return `${window.innerWidth}px`;
}

function checkWindowHeight() {
  return `${window.innerHeight}px`;
}

window.addEventListener('load', () => {
  checkCookie();
});

accept.addEventListener('click', function() {
  dialogOne.classList.remove('visible');
  overlay.classList.remove('visible');
  setCookie('Browser', `${checkBrowser()}`, 15);
  setCookie('OS', `${checkOS()}`, 15);
  setCookie('width', `${checkWindowWidth()}`, 15);
  setCookie('height', `${checkWindowHeight()}`, 15);
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