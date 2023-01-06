let page = 1;

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY

    },

})

//DRY

function createMovies(movies, container){
    container.innerHTML = '';

    movies.forEach(movie => {

        
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
        'src', 
        'https://image.tmdb.org/t/p/w300/' + movie.poster_path,
        );

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(genres, container) {

    container.innerHTML = '';
    genres.forEach(genre => {

        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTittle = document.createElement('button')
        categoryTittle.classList.add('category-button');
        categoryTittle.setAttribute('id', 'id' + genre.id);
        
        categoryTittle.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`,
            headerCategoryTitle.innerHTML = genre.name
        });
        const categoryTittleText = document.createTextNode(genre.name);
        
        categoryTittle.appendChild(categoryTittleText);
        categoryContainer.appendChild(categoryTittle);
        container.appendChild(categoryContainer);

       
    });

}

//API callings

async function getTrendingPreview(){
    const res1 = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const res2 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=' + API_KEY);
    const data1 = await res1.json();
    const data2 = await res2.json();

    const movies = data1.results;
    const series= data2.results;
    
    //Trending movie list

    createMovies(movies, trendingMoviesPreviewList)
    
    //Trending series List
    trendingSeriesPreviewList.innerHTML = '';

    series.forEach(serie => {

        const serieContainer = document.createElement('div')
        serieContainer.classList.add('serie-container');
    
        const serieImg = document.createElement('img')
        serieImg.classList.add('serie-img');
        serieImg.setAttribute('alt', serie.title)
        serieImg.setAttribute(
        'src', 
        'https://image.tmdb.org/t/p/w300/' + serie.poster_path,
        );
    
        serieContainer.appendChild(serieImg);
        trendingSeriesPreviewList.appendChild(serieContainer);
    });
}

async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const genres = data.genres;
    
    createCategories(genres, categoriesPreviewList);
}

async function getMoviesByCategory(id){
    const {data} = await api('discover/movie',{
        params: {
            with_genres: id,
            page,
        },

    });
    const movies= data.results;
     
    //Movies of category

    createMovies(movies, genericSection);


}


async function getMoviesBySearch(query){
    const {data} = await api('search/movie',{
        params: {
            query,
            page,
        },

    });
    const movies= data.results;
     
    //Movies of category

    headerCategoryTitle.innerHTML = 'Results for: ' + query;
    createMovies(movies, genericSection);


}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    
    createMovies(movies, genericSection)
    
}

async function getMovieById(id){
    const {data: movie} = await api('movie/' + id);
    

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;

    headerSection.style.background = `
        linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl}
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieScore = movie.vote_average;
    movieDetailScore.textContent = movieScore.toFixed(1);

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0,0);
}

nextPageBtn.addEventListener('click', () =>{
    page ++;
    categoriesPage();
});

lastPageBtn.addEventListener('click', () =>{
    if(page > 1){
        page --;
    }else{
        page = 1;
    }
    categoriesPage();
});