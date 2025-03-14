let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
       
        <h1>MyMovies</h1>

        <label class="switch">
            <input id="switch" type="checkbox">
            <span class="slider round"></span>
        </label>
    </header>
    <div class="wrapper">
    <main class="home--main"></main>
    </div>
    <footer>created 2025</footer>
`

document.querySelector("body").append(divElm)