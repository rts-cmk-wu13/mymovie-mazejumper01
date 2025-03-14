let detailSectionElm = document.createElement("section");
detailSectionElm.className = "detail--section fullw"

divElm.id = "detail--root"
// Header 
divElm.innerHTML = `
    <header class="detail--header fullw">
        <button class="back"><i class="fa-solid fa-arrow-left"></i></button>
        <label class="switch">
            <input id="switch" type="checkbox">
            <span class="slider round"></span>
        </label>
    </header>

    <main>
        
    </main>

`; document.querySelector("body").append(divElm)







// Function to get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get Pokémon ID from URL
const movieId = getQueryParam("id");


// URL / API
const ageRatingUrl = 'https://api.themoviedb.org/3/certification/movie/list';

const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWRiZDI3YzM4MTIzYzlmZjFlMWQ0ZDlhY2Q0OGM0MCIsIm5iZiI6MTc0MDk4Njc4Ny4xNiwic3ViIjoiNjdjNTU5YTNmZGVkM2I1MTZmOTFlOWViIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VvXwQEUqpyaQPdtobcZJ8ZNBHKNaaswSOSgsDcl4WMw'
  }
};

function fetchAgeRating() {
    return fetch(ageRatingUrl, options)
        .then(res => res.json())
        .then(data => {})
}


// This fetches the details and displays the info

function fetchDetails() {
    fetch(detailUrl, options)
      .then(res => res.json())
      .then(detail => {
      

        let rating = detail.vote_average;
      rating = parseFloat(rating).toFixed(1);

        fetchAgeRating().then(ageRating => {
            
            //page content
            detailSectionElm.innerHTML = `
                
                                                
                        <img class="detail--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${detail.backdrop_path}" alt="">
                 <div class="movie--detail">
                        <h2 class="detail-name">${detail.title}</h2>
                        <p class="movie--rating"> <i class="fa-solid fa-star" style="color: #FFD43B;"></i>${rating}/10 IMDb</p>

                        
                     <div class="genres">
                     ${detail.genres.map(genre => `<button class="genre">${genre.name}</button>`).join("")}
                     </div>
                        

                     <div class="info"><p class="length">length</p> ${detail.runtime}
                         <p class="language">language</p> ${detail.spoken_languages[0].english_name}
                         <p class="agerating">rating</p> ${ageRating}
                     </div>

                     <p class="description">${detail.overview}</p>

                     <div class="cast"></div>
                 </div>

            `; document.querySelector("main").append(detailSectionElm)
        });
    })
    
    }
    fetchDetails();

