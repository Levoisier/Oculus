const ce = (element) => document.createElement(element);

window.addEventListener('DOMContentLoaded', navigator(),false);
window.addEventListener('hashchange', navigator(),false);

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
    getTrendingPreview();
    getCategoriesPreview();   
}

function categoriesPage(){
    console.log('Categories');
}

function movieDetailsPage(){
    console.log('movie details');
}

function searchPage(){
    console.log('Search page');
}

function trendsPage(){
    console.log('Trends');
}