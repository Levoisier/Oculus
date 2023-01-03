async function getTrendingPreview(){
    const res1 = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const res2 = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY);
    const data1 = await res1.json();
    const data2 = await res2.json();

    const movies = data1.results;
    const series = data2.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    const trendingPreviewSeriesContainer = document.querySelector('#trendingPreview .trendingPreview-seriesList');

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
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });

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
        trendingPreviewSeriesContainer.appendChild(serieContainer);
    });
}

async function getCategoriesPreview(){
    const res1 = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data1 = await res1.json();

    const genres = data1.genres;
    const PreviewGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    console.log(genres)
    genres.forEach(genre => {

        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTittle = document.createElement('button')
        categoryTittle.classList.add('category-button');
        categoryTittle.setAttribute('id', 'id' + genre.id);
        
        const categoryTittleText = document.createTextNode(genre.name);
        
        categoryTittle.appendChild(categoryTittleText);
        categoryContainer.appendChild(categoryTittle);
        PreviewGenresContainer.appendChild(categoryContainer);

       
    });

}


getTrendingPreview();
getCategoriesPreview();