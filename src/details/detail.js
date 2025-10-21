

// Click through to the border countries on the detail page
// View the optimal layout for the interface depending on their device's screen size
// See hover and focus states for all interactive elements on the page

import { displayCountry } from './displayCountry.js';

// Click on a country to see more detailed information on a separate page
document.addEventListener('DOMContentLoaded', () => {
  const raw = sessionStorage.getItem('selectedCountry');
  if (!raw) return;                
  const country = JSON.parse(raw);
  displayCountry(country);
});

document.querySelector('.back-btn')?.addEventListener('click', () => {
  history.back();  // goes to the previous page we came from
});