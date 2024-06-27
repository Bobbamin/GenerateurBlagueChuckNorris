const api = useApi();

const loadRandomJoke = async () => {
    try {
        const joke = await findRandomJoke();
        return joke;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
};

const findRandomJoke = async () => {
    try {
        const { data } = await api.get('jokes/random');
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
};

const findJokeById = async (id) => {
    try {
        const { data } = await api.get(`jokes/${id}`);
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
};

const findCategories = async () => {
    try {
        const { data } = await api.get('jokes/categories');
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
};

const findJokeByCategory = async (category) => {
    try {
        const { data } = await api.get(`jokes/random?category=${category}`);
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
};
