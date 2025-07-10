const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9h-bhoZ_nKEHzjV0rFPH4zEiINSFHDFfo7-5q6qVId8qSpO863QjNyHhXPBT-Xsqv/exec';

async function loadMenu() {
  const res = await fetch(SHEET_URL);
  const sheetData = await res.json();
  const grouped = groupBySection(sheetData);
  renderMenu(grouped);
}

function groupBySection(items) {
  const grouped = {};
  items.forEach(item => {
    const section = item['Section'] || 'Uncategorized';
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push({
      name: item['Item name'],
      price: item['Price'],
      img: item['Image URL']
    });
  });

  return Object.entries(grouped).map(([name, items]) => ({ name, items }));
}



  function renderMenu(sections) {
    const main = document.getElementById('menu');
    main.innerHTML = '';                        // clear on reload
  
    sections.forEach(sec => {
      const sectionDiv = document.createElement('section');
      sectionDiv.className = 'menu-section';
  
      const title = document.createElement('h2');
      title.textContent = sec.name;
      sectionDiv.appendChild(title);
  
      const ul = document.createElement('ul');
      ul.className = 'menu-items';
  
      sec.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
  
        const spanName  = document.createElement('span');
        spanName.textContent = item.name;
  
        const spanPrice = document.createElement('span');
        spanPrice.className = 'price';
        spanPrice.textContent = formatPrice(item.price);
  
        li.append(spanName, spanPrice);
        ul.appendChild(li);
      });
  
      sectionDiv.appendChild(ul);
      main.appendChild(sectionDiv);
    });
  }
  
  function formatPrice(p) {
    if (p == null || p === '') return '—';      // display dash
    return typeof p === 'number' ? `Le ${p}` : `Le ${p}`; // range stays a string
  }
  
  loadMenu();
  