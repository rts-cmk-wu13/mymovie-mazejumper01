let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header>
       
        <h1>MyMovies</h1>

        <label class="switch">
            <input type="checkbox">
            
        </label>
    </header>
    <div class="wrapper">
    <main></main>
    </div>
    <footer>created 2025</footer>
`

document.querySelector("body").append(divElm)