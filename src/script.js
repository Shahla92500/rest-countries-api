const BASE_URL = 'https://restcountries.com'
const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById('card-template')

document.addEventListener("DOMContentLoaded", async () => {
  try {
  const res = await fetch(
    `${BASE_URL}/v3.1/all?fields=name,flags,population,region,capital`,    
  );
  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();
  console.log(data);

  data.forEach(country => {
    const  cardTemplateClone = cardTemplate.cloneNode(true);
    // console.log(cardTemplate);
    cardTemplateClone.style.display = 'block'
    // cardClone.classList.add('country-card');
    cardTemplateClone.querySelector("img").src = country.flags.png
    cardTemplateClone.querySelector("h2").textContent = country.name.common;

    const lis = cardTemplateClone.querySelectorAll("li");
    if (lis.length >= 3) {
      lis[0].textContent = `Population: ${Number(country.population).toLocaleString()}`;
      lis[1].textContent = `Region : ${country.region?? '-'}`;
      lis[2].textContent = `Capital: ${Array.isArray(country.capital) ? (country.capital[0] ?? '—') : (country.capital ?? '—')}`;
      // cardTemplate.firstElementChild.src = country.flags.png;
      // cardTemplate.firstElementChild.nextElementSibling.textContent = country.name.common
    } else {
        console.warn("Expected 3 <li> elements but found:", lis.length);
    }
    countriesDiv.appendChild(cardTemplateClone)
    
  })
    } catch (e) {
    console.error(e);
  }
});



