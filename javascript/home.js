/**
 * 
 * @param {string} nowShowingUrl
 * @returns {string}
 */
function getIdFromNowShowing() {}

// Code for adding the section with the id nowShowing--list and popular--list

let sectionElm = document.createElement("section")
sectionElm.className = "nowShowing--list" 

nowShowDiv = document.createElement("div")
nowShowDiv.className = "nowshow--div"

popularDiv = document.createElement("div")
popularDiv.className = "popular--div"

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



// link to genre api and fetching the genre api

const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
fetch(genreUrl, options)
 .then(res => res.json())



 // Fetching and making code for the Now Showing part. 

  nowShowDiv.innerHTML = `<h2>Now showing</h2> <button class="seemore">See more</button>`

fetch(nowShowUrl, options)
  .then(res => res.json())
  .then(data => { 
    const nowShowcards = data.results.map(movies => {
      let rating = movies.vote_average;
      rating = parseFloat(rating).toFixed(1);
        
        return `
        <h2></h2>
        <article class="nowShowing--card" data-id="${movies.id}">
          <img class="nowShowing--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="">
          <h3>${movies.title}</h3>
          <p class="movie--rating"> <i class="fa-solid fa-star" style="color: #FFD43B;"></i>${rating}/10 IMDb</p>

          
            
        </article>
        
        
        `;
    }).join("");

    sectionElm.innerHTML += nowShowcards;




    document.querySelector("main").addEventListener("click", function(event) {
      const movieCard = event.target.closest("article");
      
      if (movieCard) {
        const movieId = movieCard.getAttribute("data-id");
        window.location.href = `/detail.html?id=${movieId}`;
      }
    });


    
    // appending the stuff that is inside the nowshow--wrapper
    document.querySelector("main").append(nowShowDiv);
  document.querySelector("main").append(sectionElm);
    
});






 // Fetching and making code for the Popular part. 

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if(entry.isIntersecting) {
      //noget her
      currentPage++

      fetchPopular(currentPage)
    }
  })
})

let currentPage = 1;

  
// Fetching popular movies

popularDiv.innerHTML = `<h2>Popular</h2> <button class="seemore">See more</button>`

function fetchPopular(page) {
fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
  .then(res => res.json())
  .then(data => {
    
    const popularCards = data.results.map(movies => {
      let rating = movies.vote_average;
      rating = parseFloat(rating).toFixed(1);

      return `
        <article class="popular--card" data-id="${movies.id}">
          <img class="popular--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${movies.poster_path}" alt="">
          <h3>${movies.title}</h3>
          <p class="movie--rating"> <i class="fa-solid fa-star" style="color: #FFD43B;"></i>${rating}/10 IMDb</p>
          <p class="genre--ids">${genreUrl.genres}</p>
        </article>
      `;
    }).join("");
    

    popularSectionElm.innerHTML += popularCards;

    document.querySelector("main").addEventListener("click", function(event) {
      const movieCard = event.target.closest("article");
      
      if (movieCard) {
        const movieId = movieCard.getAttribute("data-id");
        window.location.href = `/detail.html?id=${movieId}`;
      }
    });
    
    const observedPopular = popularSectionElm.querySelector("article:nth-last-child(5)");
      observer.observe(observedPopular);
    

     // appending the stuff that is inside the nowshow--wrapper
     document.querySelector("main").append(popularDiv);
     document.querySelector("main").append(popularSectionElm);
    
    
})

}

fetchPopular(currentPage)