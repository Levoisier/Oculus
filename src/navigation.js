const ce = (element) => document.createElement(element);

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value.trim();
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

arrowBtn.addEventListener('click', () => {
    searchForm.reset();
    window.history.back();
});

window.addEventListener('hashchange', () => {
    navigator()
}, false);
window.addEventListener('DOMContentLoaded', navigator(),false);



function navigator() {
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if (location.hash.startsWith('#search=')){
        searchPage();
    }else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if (location.hash.startsWith('#category=')){
        categoriesPage();
    }else {
        homePage();
    }
    
}

function homePage(){
    console.log('Home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    logo.classList.remove('inactive');
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    pageBtns.classList.add('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    page = 1;
    getTrendingPreview();
    getCategoriesPreview();   
}

function categoriesPage(){
    
    window.scroll(0,0);

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    logo.classList.add('inactive')
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    pageBtns.classList.remove('inactive');
    
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    getMoviesByCategory(categoryId);

}

function movieDetailsPage(){

    window.scroll(0,0);
    
    headerSection.classList.add('header-container--long');
    /* headerSection.style.background = ''; */
    logo.classList.add('inactive')
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    pageBtns.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId)
}

function searchPage(){
    

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    logo.classList.add('inactive')
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    /* headerCategoryTitle.innerHTML = ''; */
    searchForm.classList.remove('inactive');
    pageBtns.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    logo.classList.add('inactive')
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML = "Today's trends";
    searchForm.classList.add('inactive');
    pageBtns.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();

}

