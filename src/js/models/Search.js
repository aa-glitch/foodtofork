import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            console.log(`query parameter is ${this.query}`);
            const response = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
           /*  const data = await response.json();
            console.log(data); */
            this.result = response.data.recipes;
        } catch (error) {
            alert(error);
        }
        
    }
}