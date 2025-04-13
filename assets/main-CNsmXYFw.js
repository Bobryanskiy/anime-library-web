(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("search-input"),i=document.getElementById("search-button"),o=document.getElementById("anime-list"),d=document.getElementById("anime-details");i.addEventListener("click",()=>{const t={search:c.value};e(t)}),c.addEventListener("keypress",t=>{if(t.key==="Enter"){const n={search:c.value};e(n)}});async function e(t){try{const l=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
        query ($id: Int, $search: String) {
          Page(page: 1, perPage: 10) {
            media(id: $id, type: ANIME, search: $search) {
              id
              title {
                romaji
              }
            }
          }
        }
      `,variables:t})})).json()).data.Page.media;r(l)}catch(n){console.error("Ошибка при получении данных:",n)}}function r(t){if(t.length===0){o.innerHTML="<p>Аниме не найдено</p>";return}o.innerHTML="",t.forEach(n=>{const a=document.createElement("li");a.textContent=n.title.romaji,a.addEventListener("click",()=>s(n.id)),o.appendChild(a)})}async function s(t){try{const m=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
      `,variables:{id:t}})})).json()).data.Media;p(m)}catch(n){console.error("Ошибка при получении данных:",n)}}function p(t){d.innerHTML=`
      <img src="${t.coverImage.large}" alt="${t.title.romaji}">
      <div>
        <h2>${t.title.romaji}</h2>
        <p><strong>Описание:</strong> ${t.description.replace(/<br>/g,`
`)}</p>
        <p><strong>Жанры:</strong> ${t.genres.join(", ")}</p>
        <p><strong>Средний рейтинг:</strong> ${t.averageScore||"Нет данных"}</p>
      </div>
    `}});
