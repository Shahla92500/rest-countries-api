
const BASE_URL = 'https://restcountries.com'
const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById('card-template');
const filterRegion = document.getElementById("region");
const searchItem = document.getElementById("searchItem");
const searchForm = document.getElementById('search-form');

// See all countries from the API on the homepage
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/v3.1/all?fields=name,flags,population,region,capital`,    
    );
    if (!res.ok) { throw new Error("Error fetching data");    }
    const data = await res.json();
    console.log(data);
    displayCountries(data);
  } catch (e) {
    console.error(e);
  }
});
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = searchItem.value.trim();
  if (!q) return;
  searchCountry(q);
});
// Filter countries by region
async function filterCountriesByRegion(region){
  try {
    if (!region) {
      const res = await fetch(`${BASE_URL}/v3.1/all?fields=name,flags,population,region,capital`);
      const data = await res.json();
      return displayCountries(data);    
    }
    const response = await fetch(`${BASE_URL}/v3.1/region/${region}?fields=name,flags,population,region,capital`);
    if (!response.ok) {
      throw new Error("Error getting countries")
    }
    const data = await response.json();
    console.log(data);
    displayCountries(data);
  } catch (e) {
    console.error(e);
  }
}
// displaying all countries of a region or world
function displayCountries(data){
  
  countriesDiv.innerHTML = ""; // clear container to be clean and not to have old data dispalyed for filter selection , etc...
  data.forEach(country => {
    const  cardTemplateClone = cardTemplate.cloneNode(true);

    cardTemplateClone.style.display = 'block' // redisplay the cards have been hidden in html page

     // fill content:
    cardTemplateClone.querySelector("img").src = country.flags.png
    cardTemplateClone.querySelector("h2").textContent = country.name.common;

    const lis = cardTemplateClone.querySelectorAll("li");
    if (lis.length >= 3) {
        lis[0].textContent = `Population: ${Number(country.population).toLocaleString()}`;
        lis[1].textContent = `Region : ${country.region?? '-'}`;
        lis[2].textContent = `Capital: ${Array.isArray(country.capital) ? (country.capital[0] ?? '—') : (country.capital ?? '—')}`;
    } else {
        console.warn("Expected 3 <li> elements but found:", lis.length);
    }
    attachCountryCardHandlers(cardTemplateClone, country);  
    countriesDiv.appendChild(cardTemplateClone)  
  })
}
function attachCountryCardHandlers(card, country) {
  // click → go to details
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    sessionStorage.setItem('selectedCountry', JSON.stringify(country));
    location.href = './src/details/detail.html';
  });
  // keyboard (Enter/Space) → same as click
  card.tabIndex = 0;
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
}
// Search for a country using an input field
async function searchCountry(country){
  try {
    if (!country) {
      const res = await fetch(`${BASE_URL}/v3.1/all?fields=flags,name,population,region,capital`);
      const data = await res.json();
      return displayCountries(data);    
    }
    const response = await fetch(`${BASE_URL}/v3.1/name/${country}?fields=flags,name,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`);

    if (!response.ok) throw new Error("Error getting countries");

    const results = await response.json();
     const selectedCountry = Array.isArray(results) ? results[0] : results; 
    console.log("Francece")
    console.log(selectedCountry);
    sessionStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
    location.href = './src/details/detail.html';

    // displayCountry(data);
  } catch (e) {
    console.error(e);
  } 

}

filterRegion.addEventListener("change", (event) => {
  const selected = event.target.value;
  console.log("Selected region:", selected);
   filterCountriesByRegion(selected);
  // filterCountriesByRegion(filterItem.value)
});


