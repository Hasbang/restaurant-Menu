const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9h-bhoZ_nKEHzjV0rFPH4zEiINSFHDFfo7-5q6qVId8qSpO863QjNyHhXPBT-Xsqv/exec';

async function loadMenu() {
  try {
    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sheetData = await response.json();
    const grouped = groupBySection(sheetData);
    renderMenu(grouped);
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
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
  const main = document.getElementById('menu-container');
  main.innerHTML = ''; // clear on reload

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

      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        li.appendChild(img);
      }

      const infoDiv = document.createElement('div');
      infoDiv.className = 'info';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = item.name;

      const priceSpan = document.createElement('span');
      priceSpan.className = 'price';
      priceSpan.textContent = formatPrice(item.price);

      infoDiv.append(nameSpan, priceSpan);
      li.appendChild(infoDiv);
      ul.appendChild(li);
    });

    sectionDiv.appendChild(ul);
    main.appendChild(sectionDiv);
  });
}

function formatPrice(p) {
  if (p == null || p === '') return '—';
  return typeof p === 'number' ? `Le ${p}` : `Le ${p}`;
}

loadMenu();
