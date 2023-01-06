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
    const res2 = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY);
    const data1 = await res1.json();
    const data2 = await res2.json();

    const movies = data1.results;
    const series = data2.results;
    
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