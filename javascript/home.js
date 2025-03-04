/**
 * 
 * @param {string} nowShowingUrl
 * @returns {string}
 */
function getIdFromNowShowing() {
   
}

// Code for adding the section with the id nowShowing--list and popular--list

let sectionElm = document.createElement("section")
sectionElm.className = "nowShowing--list" 

let popularSectionElm = document.createElement("section");
popularSectionElm.className = "popular--list"

// Adds the api for both Now playing/Now showing and popular


// api for the now playing
const nowShowUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

// api for the popular
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWRiZDI3YzM4MTIzYzlmZjFlMWQ0ZDlhY2Q0OGM0MCIsIm5iZiI6MTc0MDk4Njc4Ny4xNiwic3ViIjoiNjdjNTU5YTNmZGVkM2I1MTZmOTFlOWViIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VvXwQEUqpyaQPdtobcZJ8ZNBHKNaaswSOSgsDcl4WMw'
  }

};


  // Fetching and making code for the Now Showing part. 

fetch(nowShowUrl, options)
  .then(res => res.json())
  .then(data => { 
    const nowShowcards = data.results.map(movies => {
      let rating = movies.vote_average;
      rating = parseFloat(rating).toFixed(1);

        return `
        <article class="nowShowing--card">
          <img class="nowShowing--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="">
          <h3>${movies.title}</h3>
          <p class="rating">${rating}</p>
            
        </article>
        
        
        `;
    }).join("");

    sectionElm.innerHTML += nowShowcards;


document.querySelector("main").append(sectionElm);





 // Fetching and making code for the Popular part. 
    
  })
  .catch(err => console.error(err));

  fetch(popularUrl, options)
  .then(res => res.json())
  .then(data => {
    
    const popularCards = data.results.map(movies => {
      let rating = movies.vote_average;
      rating = parseFloat(rating).toFixed(1);

      return `
        <article class="popular--card">
          <img class="popular--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="">
          <h3>${movies.title}</h3>
          <p class="rating">${rating}</p>
          <p class="genre--ids">${movies}</p>
        </article>
      `;
    }).join("");

    popularSectionElm.innerHTML += popularCards;

    document.querySelector("main").append(popularSectionElm); 
  })
  .catch(err => console.error(err));