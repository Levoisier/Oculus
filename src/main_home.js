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
        
        const date = new Date(movie.release_date);
        const options = {month: 'long', day: 'numeric', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', options);
        releaseDate.innerHTML = `Release date: ${formattedDate}`;
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
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    //Trending movie list

    createMovies(movies, trendingMoviesPreviewList)
}

async function getTopRatedPreview(){    
    const {data} = await api('movie/top_rated');
    const topRated = data.results;
    //Trending movie list
    
    createMovies(topRated, topRatedPreviewList)
    
   
}

async function getUpcomingPreview(){    
    const {data} = await api('movie/upcoming');
    const upcoming = data.results;
    //Trending movie list
    
    createMovies(upcoming, upcomingPreviewList)
    
   
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
    getProvidersById(id);
}

async function getRelatedMoviesById(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
    relatedMoviesContainer.scrollTo(0,0);
}

async function getProvidersById(id){
    const {data} = await api(`movie/${id}/watch/providers`);
    let platforms= data.results.CO;

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute(
        'src', 
        'https://image.tmdb.org/t/p/w200/' + platforms.flatrate[0].logo_path,
        );

        provider1.appendChild(movieImg);

        const movieImg2 = document.createElement('img')
            movieImg2.classList.add('movie-img');
            movieImg2.setAttribute(
            'src', 
            'https://image.tmdb.org/t/p/w200/' + platforms.flatrate[1].logo_path,
            );

        provider2.appendChild(movieImg2);
    
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