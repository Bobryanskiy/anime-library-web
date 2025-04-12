(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&s(t)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("anime-list"),o=document.getElementById("anime-details");async function c(){try{const d=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
        query {
          Page(page: 1, perPage: 10) {
            media(type: ANIME) {
              id
              title {
                romaji
              }
            }
          }
        }
      `})})).json()).data.Page.media;s(d)}catch(t){console.error("Ошибка при получении данных:",t)}}function s(t){a.innerHTML="",t.forEach(n=>{const i=document.createElement("li");i.textContent=n.title.romaji,i.addEventListener("click",()=>e(n.id)),a.appendChild(i)})}async function e(t){try{const l=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            title {
              romaji
            }
            description
            coverImage {
              large
            }
            genres
            averageScore
          }
        }
      `,variables:{id:t}})})).json()).data.Media;r(l)}catch(n){console.error("Ошибка при получении данных:",n)}}function r(t){o.innerHTML=`
      <img src="${t.coverImage.large}" alt="${t.title.romaji}">
      <div>
        <h2>${t.title.romaji}</h2>
        <p><strong>Описание:</strong> ${t.description.replace(/<br>/g,`
`)}</p>
        <p><strong>Жанры:</strong> ${t.genres.join(", ")}</p>
        <p><strong>Средний рейтинг:</strong> ${t.averageScore||"Нет данных"}</p>
      </div>
    `}c()});
