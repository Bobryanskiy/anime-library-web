(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".search-input"),o=document.querySelector(".search-button"),i=document.querySelector("#anime-list"),s=document.querySelector("#anime-details");o.addEventListener("click",()=>{const t={search:l.value};e(t)}),l.addEventListener("keypress",t=>{if(t.key==="Enter"){const n={search:l.value};e(n)}});async function e(t){try{const d=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
      `,variables:t})})).json()).data.Page.media;r(d)}catch(n){console.error("Ошибка при получении данных:",n)}}function r(t){if(t.length===0){i.innerHTML="<p>Аниме не найдено</p>";return}i.innerHTML="",t.forEach(n=>{const c=document.createElement("li");c.textContent=n.title.romaji,c.addEventListener("click",()=>a(n.id)),i.appendChild(c)})}async function a(t){try{const f=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
      `,variables:{id:t}})})).json()).data.Media;p(f)}catch(n){console.error("Ошибка при получении данных:",n)}}function p(t){s.innerHTML=`
      <img src="${t.coverImage.large}" alt="${t.title.romaji}">
      <div>
        <h2>${t.title.romaji}</h2>
        <p><strong>Описание:</strong> ${t.description.replace(/<br>/g,`
`)}</p>
        <p><strong>Жанры:</strong> ${t.genres.join(", ")}</p>
        <p><strong>Средний рейтинг:</strong> ${t.averageScore||"Нет данных"}</p>
      </div>
    `,s.scrollIntoView({behavior:"smooth",block:"end"})}});
