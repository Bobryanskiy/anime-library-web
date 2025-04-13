document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const animeListElement = document.querySelector('#anime-list');
  const animeDetailsElement = document.querySelector('#anime-details');

  searchButton.addEventListener('click', () => {
    const variables = {
      search: searchInput.value
    };
    fetchAnime(variables);
  });
  
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const variables = {
        search: searchInput.value
      };
      fetchAnime(variables);
    }
  });

  // Функция для получения списка аниме
  async function fetchAnime(variables) {
    try {
      const query = `
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
      `;
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        }),
      });
      const data = await response.json();
      const anime = data.data.Page.media;
      displayAnime(anime);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  // Функция для отображения списка аниме
  function displayAnime(anime) {
    if (anime.length === 0) {
      animeListElement.innerHTML = '<p>Аниме не найдено</p>';
      return;
    }
    animeListElement.innerHTML = '';
    anime.forEach(anime => {
      const listItem = document.createElement('li');
      listItem.textContent = anime.title.romaji;
      listItem.addEventListener('click', () => fetchAnimeDetails(anime.id));
      animeListElement.appendChild(listItem);
    });
  }

  // Функция для получения деталей аниме
  async function fetchAnimeDetails(animeId) {
    try {
      const query = `
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
      `;
      const variables = {
        id: animeId,
      };
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      });
      const data = await response.json();
      const anime = data.data.Media;
      displayAnimeDetails(anime);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  // Функция для отображения деталей аниме
  function displayAnimeDetails(anime) {
    animeDetailsElement.innerHTML = `
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
      <div>
        <h2>${anime.title.romaji}</h2>
        <p><strong>Описание:</strong> ${anime.description.replace(/<br>/g, '\n')}</p>
        <p><strong>Жанры:</strong> ${anime.genres.join(', ')}</p>
        <p><strong>Средний рейтинг:</strong> ${anime.averageScore || 'Нет данных'}</p>
      </div>
    `;
    animeDetailsElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
});