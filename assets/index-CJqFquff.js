(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='32'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20256'%3e%3cpath%20fill='%23F7DF1E'%20d='M0%200h256v256H0V0Z'%3e%3c/path%3e%3cpath%20d='m67.312%20213.932l19.59-11.856c3.78%206.701%207.218%2012.371%2015.465%2012.371c7.905%200%2012.89-3.092%2012.89-15.12v-81.798h24.057v82.138c0%2024.917-14.606%2036.259-35.916%2036.259c-19.245%200-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157%208.421%2011.859%2014.607%2023.715%2014.607c9.969%200%2016.325-4.984%2016.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044%2013.747-31.792%2035.228-31.792c15.294%200%2026.292%205.328%2034.196%2019.247l-18.732%2012.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046%200-11.514%204.468-11.514%2010.31c0%207.217%204.468%2010.14%2014.778%2014.608l6.014%202.577c20.45%208.765%2031.963%2017.7%2031.963%2037.804c0%2021.654-17.012%2033.51-39.867%2033.51c-22.339%200-36.774-10.654-43.819-24.574'%3e%3c/path%3e%3c/svg%3e",p="/vite.svg";function h(a){let n=0;const s=i=>{n=i,a.innerHTML=`count is ${n}`};a.addEventListener("click",()=>s(n+1)),s(0)}document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${p}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${u}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;h(document.querySelector("#counter"));document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("searchInput"),n=document.getElementById("searchButton"),s=document.getElementById("bookList"),i=document.getElementById("bookDetails");n.addEventListener("click",()=>{const o=a.value;e(o)});async function e(o){try{const c=await(await fetch(`https://openlibrary.org/search.json?q=${o}`)).json();t(c.docs)}catch(r){console.error("Error fetching books:",r)}}function t(o){s.innerHTML="",o.forEach(r=>{const c=document.createElement("li");c.textContent=r.title,c.addEventListener("click",()=>l(r.key)),s.appendChild(c)})}async function l(o){try{const c=await(await fetch(`https://openlibrary.org${o}.json`)).json();d(c)}catch(r){console.error("Error fetching book details:",r)}}function d(o){i.innerHTML=`
          <h2>${o.title}</h2>
          <p><strong>Authors:</strong> ${o.authors?o.authors.map(r=>r.name).join(", "):"N/A"}</p>
          <p><strong>First Publish Year:</strong> ${o.first_publish_year||"N/A"}</p>
          <p><strong>Number of Pages:</strong> ${o.number_of_pages_median||"N/A"}</p>
      `}});
