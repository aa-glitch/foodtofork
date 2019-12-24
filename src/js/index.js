import Search from './models/Search'
import { elements, renderLoader, clearLoader }  from './views/base'
import * as searchView from './views/searchView'


/** Global state 
 * - search object
 * - current recipie object
 * - shopping list object
 * - liked recipes
*/
const state = {};

const controlSearch = async () => {
    //1) get a query from the view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e=> {
    e.preventDefault();
    controlSearch();
});