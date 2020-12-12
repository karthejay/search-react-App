import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import Masonry from 'react-masonry-css'

const people = [
  "Black",
  "White",
  "Red",
  "blue",
  "Yellow",
  "Green",
  "pink",
  "Grey"
];
var Shuffle = window.Shuffle;
class Demo {
  constructor(element) {
    this.element = element;
    this.shuffle = new Shuffle(element, {
      itemSelector: '.picture-item',
      sizer: element.querySelector('.my-sizer-element'),
    });

    // Log events.
    this.addShuffleEventListeners();
    this._activeFilters = [];
    this.addFilterButtons();
    this.addSorting();
    this.addSearchFilter();
  }

   
  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
      console.log('layout. data:', data);
    });
    this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
      console.log('removed. data:', data);
    });
  }

  addFilterButtons() {
    const options = document.querySelector('.filter-options');
    if (!options) {
      return;
    }
    
    const filterButtons = Array.from(options.children);
    const onClick = this._handleFilterClick.bind(this);
    filterButtons.forEach((button) => {
      button.addEventListener('click', onClick, false);
    });
  }

  _handleFilterClick(evt) {
    const btn = evt.currentTarget;
    const isActive = btn.classList.contains('active');
    const btnGroup = btn.getAttribute('data-group');
    
    this._removeActiveClassFromChildren(btn.parentNode);
    
    let filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }
    
    this.shuffle.filter(filterGroup);
  }

  _removeActiveClassFromChildren(parent) {
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].classList.remove('active');
    }
  }

  addSorting() {
    const buttonGroup = document.querySelector('.sort-options');
    if (!buttonGroup) {
      return;
    }
    buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
  }

  _handleSortChange(evt) {
    // Add and remove `active` class from buttons.
    const buttons = Array.from(evt.currentTarget.children);
    buttons.forEach((button) => {
      if (button.querySelector('input').value === evt.target.value) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Create the sort options to give to Shuffle.
    const { value } = evt.target;
    let options = {};
    
    function sortByDate(element) {
      return element.getAttribute('data-created');
    }
    
    function sortByTitle(element) {
      return element.getAttribute('data-title').toLowerCase();
    }
    
    if (value === 'date-created') {
      options = {
        reverse: true,
        by: sortByDate,
      };
    } else if (value === 'title') {
      options = {
        by: sortByTitle,
      };
    }
    this.shuffle.sort(options);
  }

  // Advanced filtering
  addSearchFilter() {
    const searchInput = document.querySelector('.js-shuffle-search');
    if (!searchInput) {
      return;
    }
    searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
  }

  /**
   * Filter the shuffle instance by items with a title that matches the search input.
   * @param {Event} evt Event object.
   */
  _handleSearchKeyup(evt) {
    const searchText = evt.target.value.toLowerCase();
    this.shuffle.filter((element, shuffle) => {
      // If there is a current filter applied, ignore elements that don't match it.
      if (shuffle.group !== Shuffle.ALL_ITEMS) {
        // Get the item's groups.
        const groups = JSON.parse(element.getAttribute('data-groups'));
        const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
        // Only search elements in the current group
        if (!isElementInCurrentGroup) {
          return false;
        }
      }
      const titleElement = element.querySelector('.picture-item__title');
      const titleText = titleElement.textContent.toLowerCase().trim();
      return titleText.indexOf(searchText) !== -1;
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  window.demo = new Demo(document.getElementById('grid'));
});
function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <div className="App">
     <div class="container">
  <div class="row">
    <div class="col-12@sm">
      <h1>Masonry grid Background color</h1>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-4@sm col-3@md">
      <div class="filters-group">
        <label for="filters-search-input" class="filter-label">Search</label>
        <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input" />
      </div>
    </div>
  </div>
 
</div>

<div class="container">
  <div id="grid" class="row my-shuffle-container">
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["nature"]' data-date-created="2017-04-30" data-title="Lake Walchen">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner whiteclass">
            <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
          <figcaption class="picture-item__title">White</figcaption>
          <p class="picture-item__tags hidden@xs">#FFFFFF</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-8@sm col-6@md picture-item picture-item--overlay" data-groups='["city"]' data-date-created="2016-07-01" data-title="Golden Gate Bridge">
      <div class="picture-item__inner">

      <div class="aspect aspect--16x9">
          <div class="aspect__inner blackclass">
            <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Black</figcaption>
          <p class="picture-item__tags hidden@xs">#000000</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["animal"]' data-date-created="2016-08-12" data-title="Crocodile">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner redclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Red</figcaption>
          <p class="picture-item__tags hidden@xs">#FC0000</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item picture-item--h2" data-groups='["space"]' data-date-created="2016-03-07" data-title="SpaceX">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner blueclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Blue</figcaption>
          <p class="picture-item__tags hidden@xs">#054EF6</p>
        </div> 
        </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["city"]' data-date-created="2016-06-09" data-title="Crossroads">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner yellowclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Yellow</figcaption>
          <p class="picture-item__tags hidden@xs">#EFF605</p>
        </div>
      </div>
    </figure>
    <figure class="col-6@xs col-8@sm col-6@md picture-item picture-item--overlay" data-groups='["space","nature"]' data-date-created="2016-06-29" data-title="Milky Way">
      <div class="picture-item__inner">

      <div class="aspect aspect--16x9">
          <div class="aspect__inner greenclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Green</figcaption>
          <p class="picture-item__tags hidden@xs">#008000</p>
        </div>
      </div>
    </figure>
    <figure class="col-6@xs col-8@sm col-6@md picture-item picture-item--h2" data-groups='["space"]' data-date-created="2015-11-06" data-title="Earth">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner pinkclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Pink</figcaption>
          <p class="picture-item__tags hidden@xs">#FFC0CB</p>
        </div>
         
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item picture-item--h2" data-groups='["animal"]' data-date-created="2015-07-23" data-title="Turtle">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner brownclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Brown</figcaption>
          <p class="picture-item__tags hidden@xs">#a52a2a</p>
        </div>
        
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["nature"]' data-date-created="2014-10-12" data-title="Stanley Park">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner oliveclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Olive</figcaption>
          <p class="picture-item__tags hidden@xs">#808000</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["animal"]' data-date-created="2017-01-12" data-title="Astronaut Cat">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner Limeclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Lime</figcaption>
          <p class="picture-item__tags hidden@xs">#00FF00</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-8@sm col-6@md picture-item picture-item--overlay" data-groups='["city"]' data-date-created="2017-01-19" data-title="San Francisco">
      <div class="picture-item__inner">

      <div class="aspect aspect--16x9">
          <div class="aspect__inner Aquaclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Aqua</figcaption>
          <p class="picture-item__tags hidden@xs">#00FFFF</p>
        </div>
      </div>
    </figure>
    <figure class="col-3@xs col-4@sm col-3@md picture-item" data-groups='["nature","city"]' data-date-created="2015-10-20" data-title="Central Park">
      <div class="picture-item__inner">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner purpleclass">
          <h1 class="img"></h1>
          </div>
        </div>
        <div class="picture-item__details">
        <figcaption class="picture-item__title">Purple</figcaption>
          <p class="picture-item__tags hidden@xs">#800080</p>
        </div>
      </div>
    </figure>
    <div class="col-1@sm col-1@xs my-sizer-element"></div>
  </div>
</div>



    </div>
  );
}

export default App;
