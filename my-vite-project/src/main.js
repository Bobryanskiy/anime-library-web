import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const bookList = document.getElementById('bookList');
  const bookDetails = document.getElementById('bookDetails');

  searchButton.addEventListener('click', () => {
      const query = searchInput.value;
      fetchBooks(query);
  });

  async function fetchBooks(query) {
      try {
          const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
          const data = await response.json();
          displayBooks(data.docs);
      } catch (error) {
          console.error('Error fetching books:', error);
      }
  }

  function displayBooks(books) {
      bookList.innerHTML = '';
      books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click', () => fetchBookDetails(book.key));
          bookList.appendChild(li);
      });
  }

  async function fetchBookDetails(bookKey) {
      try {
          const response = await fetch(`https://openlibrary.org${bookKey}.json`);
          const data = await response.json();
          displayBookDetails(data);
      } catch (error) {
          console.error('Error fetching book details:', error);
      }
  }

  function displayBookDetails(book) {
      bookDetails.innerHTML = `
          <h2>${book.title}</h2>
          <p><strong>Authors:</strong> ${book.authors ? book.authors.map(author => author.name).join(', ') : 'N/A'}</p>
          <p><strong>First Publish Year:</strong> ${book.first_publish_year || 'N/A'}</p>
          <p><strong>Number of Pages:</strong> ${book.number_of_pages_median || 'N/A'}</p>
      `;
  }
});