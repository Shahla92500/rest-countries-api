


// Click through to the border countries on the detail page
// View the optimal layout for the interface depending on their device's screen size
// See hover and focus states for all interactive elements on the page

const countryTemplate = document.getElementById('country-template');
const countryRoot = document.getElementById("country-root");
const imgFlag = document.getElementById("image");
const bordersId = document.getElementById("borders-id");

// displaying a selected country 
export function displayCountry(country){
    countryRoot.innerHTML = '';          // clear previous
    if (!countryTemplate) return console.warn('Template or mount not found');
   
    const  countryTemplateClone = countryTemplate.cloneNode(true);
    countryTemplateClone.removeAttribute('id');   // remove duplicate from countryTemplate in case
   // get the borders container FROM THE CLONE
    const bordersWrap = countryTemplateClone.querySelector('#bordBtnId'); 
    // console.log(cardTemplateClone);
    console.log(`country:  ${country.flags.png}`);

    // countryTemplateClone.style.display = 'block';
    countryTemplateClone.style.display = 'contents';  
    countryTemplateClone.removeAttribute('id');  

    countryTemplateClone.querySelector("img").src = country.flags.png
    countryTemplateClone.querySelector("h2").textContent = country.name.common;

  
   /* if (h2) h2.textContent = country.name?.common ?? '—';*/
    const nativeName = country.name?.nativeName
                ? Object.values(country.name.nativeName)[0]?.common ?? country.name.common
                : country.name?.common ?? '—';

    const tld = country.tld?.[0] ?? '—';
    const currencies = country.currencies
                 ? Object.values(country.currencies).map(c => c.name).join(', ') : '—';
    const languages = country.languages? Object.values(country.languages).join(', ') : '—';
    const capital = Array.isArray(country.capital) ? (country.capital[0] ?? '—') : (country.capital ?? '—');
    
    const borders = country.borders ?? '—';
    if (Array.isArray(borders) && borders.length) {
      createBordersBtn(borders, bordersWrap);
    }

    // Fill list items from the clone
    const lis = countryTemplateClone.querySelectorAll('li');

    if (lis.length >= 8) {
        lis[0].textContent = `Native Name: ${nativeName}`;
        lis[1].textContent = `Population: ${Number(country.population ?? 0).toLocaleString()}`;
        lis[2].textContent = `region: ${country.region ?? '—'}`;
        lis[3].textContent = `Sub Region: ${country.subregion ?? '-'}`;
        lis[4].textContent = `Capital: ${capital}`;
        lis[5].textContent = `Top Level Domain: ${tld}`;
        lis[6].textContent = `Currencies: ${currencies}`;
        lis[7].textContent = `Language: ${languages}`;
    } else {
        console.warn("Expected 8 <li> elements but found:", lis.length);
        
    }

  countryRoot.appendChild(countryTemplateClone); 

}
function createBordersBtn(borders,wrapEl) {
    if (!wrapEl) return;

// get all countries saved in the main page (I need it for finding complete name of country based on its 3 letters)
  const all = JSON.parse(sessionStorage.getItem('allCountries') || '[]');

  wrapEl.innerHTML = ''; // clear old buttons
  wrapEl.style.display = 'contents';  // display hidden layer of new buttons

  borders.forEach((code) => {
    console.log(code);
    const btn = document.createElement('button');
    btn.className = 'countries-btn';
    btn.textContent = code; // or resolve name below
    
    // show the neighbor's name on the button, not cca3
    const neighbor = all.find(c => c.cca3 === code);
    if (neighbor?.name?.common) btn.textContent = neighbor.name.common;

    btn.addEventListener('click', () => {
      const nextBord = all.find(c => c.cca3 === code);
      if (nextBord) {
        displayCountry(nextBord);
        sessionStorage.setItem('selectedCountry', JSON.stringify(next));
      } else {
        console.warn('Country not found for code:', code);
      }
    });

    wrapEl.appendChild(btn);
  });
    
}