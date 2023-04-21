const starsTotal = 5; 

//run get 
document.addEventLIstener('DOMContentLoaded', getRatings)
// get ratings
function getRatings() {
    for (let rating in ratings) {
        console.log(rating);
    }
    console.log('ran');
}