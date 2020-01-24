import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader }  from './views/base'
import * as searchView from './views/searchView'


/** Global state 
 * - search object
 * - current recipie object
 * - shopping list object
 * - liked recipes
*/
const state = {};

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e=> {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    //console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
}); 


/**
 * RECIPE CONTROLLER
 */
const r = new Recipe(47746);
r.getRecipe();