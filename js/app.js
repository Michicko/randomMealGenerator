const mealBtn = document.querySelector('#getmeal');



mealBtn.addEventListener('click', getMeal);

function getMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then((data) => {
            const item = data.meals[0];
            disaplyMeal(item);
        })
        .catch((err) => {
           console.log(err);
        });
}

function disaplyMeal(meal) {
    const content = document.querySelector('.content');
    let ingredients = [];
    for (let i = 1; i < 35; i++){
        if (meal[`strIngredient${i}`]) {
            ingredients.push(meal[`strIngredient${i}`]);
        } else {
            break;
        }
    }
    
    let html = `
    <div class="box">
        <div class="box-a">
            <div class="img"><img src="${meal.strMealThumb}"></img></div>
            <p class="lead"><b>Category:</b> ${meal.strCategory}</p>
            <p class="lead"><b>Area:</b> ${meal.strArea}</p>
            <p class="lead"><b>Tags:</b> ${meal.strTags}</p>
            <h4 class="ingr">Ingredients:</h4>
            <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
        </div>
        <div class="box-b">
            <h2 class="lead">${meal.strMeal}</h2>
            <p class="inst">${meal.strInstructions}</p>
        </div>
    </div>
    <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
    </div>
    `;
    content.innerHTML = html;
}