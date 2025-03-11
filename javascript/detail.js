
divElm.id = "root"
// Header 
divElm.innerHTML = `
    <header>
        <label class="switch">
            <input id="switch" type="checkbox">
            <span class="slider round"></span>
        </label>
    </header>
    <div class="wrapper">
    <main></main>
    </div>
`; document.querySelector("body").append(divElm)



let detailSectionElm = document.createElement("section");
detailSectionElm.className = "detail--section"



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
        const main = document.querySelector("main");

        let rating = detail.vote_average;
      rating = parseFloat(rating).toFixed(1);

        fetchAgeRating().then(ageRating => {
            
            //page content
            main.innerHTML = `
                
                    <section class="movie-detail">
                        <img class="detail--poster" loading="lazy" src="https://image.tmdb.org/t/p/original${detail.backdrop_path}" alt="">
                        <img src="" alt="">
                        <h2 class="detail-name">${detail.title}</h2>
                        <p class="agerating">${rating}</p>

                        <div class="genres">
                        <div class="genres">
                                <p class="genre">${detail.genres.map(genre => genre.name).join(", ")}</p> <!-- List of genres -->
                            </div>
                        </div>

                        <div class="info"><p>length</p> ${detail.runtime} <p>language</p> ${detail.spoken_languages[0].english_name} <p>rating</p> ${ageRating}</div>
                        <p class="description">${detail.overview}</p>
                    </section>

            `;
        });
    })
    
    }
    fetchDetails();

