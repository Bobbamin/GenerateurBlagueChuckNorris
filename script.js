let jokeHistory = JSON.parse(localStorage.getItem('jokeHistory')) || [];
let currentIndex = 0;

if (jokeHistory.length > 0) {
    currentIndex = jokeHistory.length - 1;
} else {
    currentIndex = 0;
}

const jokeContainer = document.getElementById('joke-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const categorySelect = document.getElementById('category-select');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');

//maj conteneur de blague avec une nouvelle blague
const updateJokeContainer = (joke) => {
    jokeContainer.innerHTML = joke.value;
};

//new blague aléatoire et maj conteneur
const loadRandomJokeAndUpdateContainer = async () => {
    const joke = await loadRandomJoke();
    if (joke) {
        jokeHistory.push(joke.id);
        localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
        currentIndex = jokeHistory.length - 1;
        updateJokeContainer(joke);
        updateButtons();
    }
};

//chargez par ID et maj conteneur
const loadJokeByIdAndUpdateContainer = async (id) => {
    const joke = await findJokeById(id);
    if (joke) {
        updateJokeContainer(joke);
    }
};

// charger blague par categorie + maj conteneur
const loadJokeByCategoryAndUpdateContainer = async () => {
    const category = categorySelect.value;
    if (category) {
        const joke = await findJokeByCategory(category);
        if (joke) {
            jokeHistory.push(joke.id);
            localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
            currentIndex = jokeHistory.length - 1;
            updateJokeContainer(joke);
            updateButtons();
        }
    }
};

//charger categories dans le select
const loadCategories = async () => {
    try {
        const categories = await findCategories();
        console.log(categories);
        if (categories && categories.length > 0) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        } else {
            console.error("Aucune catégorie trouvée");
        }
    } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
    }
};

//gerer btn prev
const handlePrev = () => {
    if (currentIndex > 0) {
        currentIndex--;
        const jokeId = jokeHistory[currentIndex];
        loadJokeByIdAndUpdateContainer(jokeId);
        updateButtons();
    }
};

//gerer btn next
const handleNext = async () => {
    if (currentIndex < jokeHistory.length - 1) {
        currentIndex++;
        const jokeId = jokeHistory[currentIndex];
        await loadJokeByIdAndUpdateContainer(jokeId);
    } else {
        await loadRandomJokeAndUpdateContainer();
    }
    updateButtons();
};

//gerer clear du LS
const handleClear = async () => {
    localStorage.removeItem('jokeHistory');
    jokeHistory = [];
    currentIndex = 0;
    updateButtons();
    jokeContainer.innerHTML = '';
    await loadRandomJokeAndUpdateContainer(); // recharge blague random apres clear du LS
};

// maj btn prev next
const updateButtons = () => {
    if (currentIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add('bg-gray-500', 'cursor-not-allowed');
        prevBtn.classList.remove('bg-orange-500', 'cursor-pointer');
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.add('bg-orange-500', 'cursor-pointer');
        prevBtn.classList.remove('bg-gray-500', 'cursor-not-allowed');
    }

    nextBtn.disabled = false;
};

//au lancement
window.onload = async () => {
    await loadRandomJokeAndUpdateContainer();
    await loadCategories(); // Charger les catégories au démarrage de la page
    updateButtons();
};

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);
clearBtn.addEventListener('click', handleClear);
searchBtn.addEventListener('click', loadJokeByCategoryAndUpdateContainer);
