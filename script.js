
// you can use this apikey 55d82172

const spin = document.querySelector(".spin")
spin.style.display = "none"
const searchButton = document.getElementById("search-button");
const inpPtag = document.querySelector(".inp");
const searchInput = document.getElementById("searchInput");



// adding eventlistener to the search button
searchButton.addEventListener("click",() =>{
    const searchResult = document.getElementById("searchInput").value;
    const apiKey = document.getElementById("apikey").value;

    const mainGallery = document.querySelector(".movie-gallery");
    searchButton.style.display = "none";
    mainGallery.style.display = "none";
    spin.style.display = "block";
    console.log(spin);

    setTimeout(() =>{
        mainGallery.style.display = "grid";;
        searchButton.style.display = "block";
        spin.style.display = "none"
      
    },2000)
    
    console.log(searchResult,apiKey)
    getMovies(searchResult,apiKey);
})

// fetching the data using omdb API 
async function getMovies(searchResult,apiKey){
    const endpoint = `https://www.omdbapi.com/?s=${searchResult}&apikey=${apiKey}`;
    try{
        const response = await fetch(endpoint);
        const result = await response.json();
        if(result.Response === false){
            alert(result.Error)
        }
        movieGallery(result);
    }
    catch(e){
       alert(e);
    }
}


// appending the cards to the gallery
function movieGallery(result){
    console.log(result);
    let count = 1
    
    let search = result.Search;
    const mainGallery = document.querySelector(".movie-gallery");
    for(let i =0;i<search.length;i++){
       const gallery = document.createElement("div");
       gallery.classList.add("movie-card");
       gallery.innerHTML = `
       <div class="card">
            <img src="${search[i].Poster}" alt="">
            <p class="title">Name: ${search[i].Title}</p>
            <p class="title">Type: ${search[i].Type}</p>
            <p class="title">Year: ${search[i].Year}</p>
            <a href="https://www.imdb.com/title/${search[i].imdbID}/">More Details</a>
        </div>
        <div class="card number">
            <h1>${count}</h1>
            
        </div>
       `
       count++;
        mainGallery.append(gallery);
    }
}
