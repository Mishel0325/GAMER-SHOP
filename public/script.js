// 1. Datos de Prueba

console.log('public/script.js loaded');

const videojuegos = [
  { id: 1, nombre: "Fortnite", descripcion: "Battle Royale · Acción · Multiplataforma", rating: 4.5, imagen: "https://via.placeholder.com/600x400?text=Fortnite" },
  { id: 2, nombre: "Among Us", descripcion: "Social · Multijugador · PC/Mobile", rating: 4.4, imagen: "https://via.placeholder.com/600x400?text=Among+Us" },
  { id: 3, nombre: "Roblox", descripcion: "Sandbox · Creativo · Multiplataforma", rating: 4.6, imagen: "https://via.placeholder.com/600x400?text=Roblox" },
  { id: 4, nombre: "Valorant", descripcion: "FPS Táctico · Acción · PC", rating: 4.7, imagen: "https://via.placeholder.com/600x400?text=Valorant" },
  { id: 5, nombre: "Minecraft", descripcion: "Sandbox · Creativo · Multiplataforma", rating: 4.8, imagen: "https://via.placeholder.com/600x400?text=Minecraft" },
  { id: 6, nombre: "Apex Legends", descripcion: "Battle Royale · FPS · Multiplataforma", rating: 4.5, imagen: "https://via.placeholder.com/600x400?text=Apex+Legends" },
  { id: 7, nombre: "Elden Ring", descripcion: "RPG · Acción · PC/PS5/Xbox", rating: 4.9, imagen: "https://via.placeholder.com/600x400?text=Elden+Ring" },
  { id: 8, nombre: "Genshin Impact", descripcion: "RPG · Acción · Multiplataforma", rating: 4.6, imagen: "https://via.placeholder.com/600x400?text=Genshin+Impact" },
  { id: 9, nombre: "The Witcher 3", descripcion: "RPG · Aventura · PC/Consolas", rating: 4.9, imagen: "https://via.placeholder.com/600x400?text=The+Witcher+3" },
  { id: 10, nombre: "Stardew Valley", descripcion: "Simulación · Casual · Multiplataforma", rating: 4.7, imagen: "https://via.placeholder.com/600x400?text=Stardew+Valley" },
  { id: 11, nombre: "Hollow Knight", descripcion: "Aventura · Indie · PC/Consolas", rating: 4.6, imagen: "https://via.placeholder.com/600x400?text=Hollow+Knight" },
  { id: 12, nombre: "Subway Surfers", descripcion: "Acción · Casual · Mobile", rating: 4.5, imagen: "https://via.placeholder.com/600x400?text=Subway+Surfers" },
  { id: 13, nombre: "League of Legends", descripcion: "MOBA · Multijugador · PC", rating: 4.6, imagen: "https://via.placeholder.com/600x400?text=LOL" },
  { id: 14, nombre: "Rocket League", descripcion: "Deporte · Multijugador · Multiplataforma", rating: 4.5, imagen: "https://via.placeholder.com/600x400?text=Rocket+League" },
  { id: 15, nombre: "Hades", descripcion: "Acción · Roguelike · Indie", rating: 4.7, imagen: "https://via.placeholder.com/600x400?text=Hades" },
  { id: 16, nombre: "Counter-Strike 2", descripcion: "FPS · Competitivo · PC", rating: 4.6, imagen: "https://via.placeholder.com/600x400?text=CS2" },
  { id: 17, nombre: "PUBG", descripcion: "Battle Royale · Acción · Multiplataforma", rating: 4.4, imagen: "https://via.placeholder.com/600x400?text=PUBG" },
  { id: 18, nombre: "Overwatch 2", descripcion: "FPS · Team · Multiplataforma", rating: 4.5, imagen: "https://via.placeholder.com/600x400?text=Overwatch" },
  { id: 19, nombre: "Persona 5", descripcion: "JRPG · Narrativa · PS4/PC", rating: 4.8, imagen: "https://via.placeholder.com/600x400?text=Persona+5" },
  { id: 20, nombre: "God of War", descripcion: "Acción · Aventura · PS4/PS5", rating: 4.8, imagen: "https://via.placeholder.com/600x400?text=God+of+War" },
];

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos de la UI (debes tenerlos en el HTML)
  const grid = document.querySelector('#grid-videojuegos');
  const searchInput = document.querySelector('#search-input');
  const searchBtn = document.querySelector('#search-btn');
  const storeSelect = document.querySelector('#store-select');
  const sortSelect = document.querySelector('#sort-select');
  const loadMoreBtn = document.querySelector('#load-more');
  const loadingIndicator = document.querySelector('#loading-indicator');
  const errorIndicator = document.querySelector('#error-indicator');
  const resultsCount = document.querySelector('#results-count');
  const modal = document.querySelector('#modal');
  const modalTitle = document.querySelector('#modal-title');
  const modalImage = document.querySelector('#modal-image');
  const modalDesc = document.querySelector('#modal-desc');
  const modalNormal = document.querySelector('#modal-normal');
  const modalSale = document.querySelector('#modal-sale');
  const modalLink = document.querySelector('#modal-link');
  const modalClose = document.querySelector('#modal-close');

  if (!grid) {
    console.error('No se encontró el elemento con id "grid-videojuegos".');
    return;
  }

  const API_BASE = 'https://www.cheapshark.com/api/1.0';

  function showLoading(show) {
    if (!loadingIndicator) return;
    loadingIndicator.classList.toggle('hidden', !show);
  }

  function showError(msg) {
    if (!errorIndicator) return;
    if (msg) {
      errorIndicator.textContent = msg;
      errorIndicator.classList.remove('hidden');
    } else {
      errorIndicator.classList.add('hidden');
    }
  }

  function normalizeJuego(juego) {
    // Normalize both local and API deal shapes to common fields used in the template
    const title = juego.nombre || juego.title || juego.external || 'Sin título';
    const image = juego.imagen || juego.thumb || '';
    const description = juego.descripcion || juego.saleText || '';
    const salePrice = juego.salePrice || juego.sale || '';
    const normalPrice = juego.retailPrice || juego.normalPrice || juego.retail || '';
    const savings = juego.savings || juego.descuento || 0;
    const id = juego.id || juego.dealID || juego.gameID || '';
    const url = juego.dealID ? `https://www.cheapshark.com/redirect?dealID=${juego.dealID}` : (juego.url || '#');
    return { id, title, image, description, salePrice, normalPrice, savings, url };
  }

  function renderizarVideojuegos(lista) {
    // Limpia el grid antes de renderizar (evita duplicados)
    grid.innerHTML = '';

    if (!lista || !lista.length) {
      resultsCount.textContent = 'No hay resultados';
      return;
    }

    resultsCount.textContent = `${lista.length} resultados`;

    lista.forEach((j) => {
      const juego = normalizeJuego(j);

      const card = document.createElement('article');
      card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer';

      card.innerHTML = `
        <div class="relative overflow-hidden h-40">
          <img src="${juego.image}" alt="${juego.title}" class="h-40 w-full object-cover hover:scale-110 transition-transform duration-300" loading="lazy" />
          <div class="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">${Math.round(juego.savings)}% OFF</div>
        </div>
        <div class="p-4 flex flex-col gap-2 flex-1">
          <h3 class="font-bold text-slate-900 leading-tight text-sm">${juego.title}</h3>
          <p class="text-xs text-slate-500">${juego.description}</p>
          <div class="mt-auto space-y-2">
            <p class="text-sm text-slate-700"><span class="font-black text-emerald-600">${juego.salePrice ? '$' + juego.salePrice : '—'}</span></p>
            ${juego.normalPrice ? `<p class="text-xs text-slate-400 line-through">$${juego.normalPrice}</p>` : ''}
          </div>
          <button class="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-xs font-bold hover:shadow-lg transition transform hover:scale-105" data-url="${juego.url}" data-title="${encodeURIComponent(juego.title)}" data-image="${juego.image}" data-normal="${juego.normalPrice}" data-sale="${juego.salePrice}">🎮 Ver detalle</button>
        </div>
      `;

      const imgEl = card.querySelector('img');
      if (imgEl) {
        imgEl.addEventListener('error', () => {
          imgEl.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
          imgEl.alt = 'Imagen no disponible';
        });
      }

      const btn = card.querySelector('button');
      if (btn) {
        btn.addEventListener('click', () => {
          // abrir modal con datos
          const title = decodeURIComponent(btn.dataset.title || '');
          const image = btn.dataset.image;
          const normal = btn.dataset.normal;
          const sale = btn.dataset.sale;
          const url = btn.dataset.url;

          modalTitle.textContent = title;
          modalImage.src = image || 'https://via.placeholder.com/600x400?text=No+image';
          modalDesc.textContent = '';
          modalNormal.textContent = normal ? '$' + normal : '—';
          modalSale.textContent = sale ? '$' + sale : '—';
          modalLink.href = url || '#';

          modal.classList.remove('hidden');
          modal.classList.add('flex');
        });
      }

      grid.appendChild(card);
    });
  }

  // API helpers
  async function fetchStores() {
    try {
      const res = await fetch(`${API_BASE}/stores`);
      if (!res.ok) throw new Error('Stores fetch failed');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function fetchDeals({ storeID = '', pageSize = 20, pageNumber = 0, title = '' } = {}) {
    try {
      const params = new URLSearchParams();
      if (storeID) params.set('storeID', storeID);
      if (pageSize) params.set('pageSize', pageSize);
      if (pageNumber) params.set('pageNumber', pageNumber);
      if (title) params.set('title', title);
      const url = `${API_BASE}/deals?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`deals fetch ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function fetchGamesByTitle(title) {
    try {
      const params = new URLSearchParams();
      params.set('title', title);
      params.set('limit', 20);
      const res = await fetch(`${API_BASE}/games?${params.toString()}`);
      if (!res.ok) throw new Error('games fetch failed');
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  // State
  let pageNumber = 0;
  const pageSize = 20;

  // Cargar tiendas y poblar el selector
  async function cargarTiendas() {
    try {
      const stores = await fetchStores();
      if (stores && stores.length) {
        // Limpiar opciones previas excepto "Todas las tiendas"
        const opcionesExistentes = storeSelect.querySelectorAll('option');
        opcionesExistentes.forEach((opt, idx) => {
          if (idx > 0) opt.remove(); // Mantener la primera opción
        });

        // Añadir tiendas
        stores.forEach(store => {
          const opt = document.createElement('option');
          opt.value = store.storeID;
          opt.textContent = store.storeName;
          storeSelect.appendChild(opt);
        });
        console.log(`Tiendas cargadas: ${stores.length}`);
      }
    } catch (e) {
      console.error('Error al cargar tiendas:', e);
    }
  }

  // Cargar inicial: intenta API y si falla usa los locales
  async function cargarVideojuegosInicial() {
    try {
      showError('');
      showLoading(true);

      // Cargar tiendas en paralelo
      await cargarTiendas();

      // Cargar deals iniciales (Steam = storeID 1)
      const url = `${API_BASE}/deals?storeID=1&pageSize=${pageSize}&pageNumber=0`;
      console.log('Cargando ofertas iniciales desde Steam...');
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('API deals no disponible');
      const datos = await resp.json();

      console.log(`Se cargaron ${datos.length} juegos desde Steam`);
      window._juegosCache = datos;
      renderizarVideojuegos(datos);
    } catch (e) {
      console.error('Error al cargar los videojuegos desde la API.', e);
      // fallback: usa el array local `videojuegos` si existe
      if (typeof videojuegos !== 'undefined' && Array.isArray(videojuegos)) {
        console.log('Usando juegos locales como fallback');
        renderizarVideojuegos(videojuegos);
      } else {
        showError('No se pudieron cargar los juegos.');
      }
    } finally {
      showLoading(false);
    }
  }

  // Búsqueda usando /games?title=texto&limit=20 y luego obtener deals por title
  async function buscarPorTitulo(text) {
    try {
      showError('');
      showLoading(true);
      pageNumber = 0;
      const games = await fetchGamesByTitle(text);
      // games puede ser lista con gameID y external, pero CheapShark permite buscar deals por title,
      // así que llamamos a /deals?title=
      const deals = await fetchDeals({ title: text, storeID: storeSelect.value, pageSize, pageNumber });
      renderizarVideojuegos(deals);
    } catch (e) {
      showError('Error en la búsqueda');
    } finally {
      showLoading(false);
    }
  }

  // Filtrar por tienda
  async function filtrarPorTienda() {
    try {
      showError('');
      showLoading(true);
      pageNumber = 0;
      const storeID = storeSelect.value || '';
      console.log(`Filtrando por tienda: ${storeID || 'Todas las tiendas'}`);
      const deals = await fetchDeals({ storeID, pageSize, pageNumber });
      console.log(`Se encontraron ${deals.length} juegos`);
      renderizarVideojuegos(deals);
    } catch (e) {
      console.error('Error al filtrar por tienda:', e);
      showError('Error al filtrar por tienda');
    } finally {
      showLoading(false);
    }
  }

  // Cargar más resultados (mantiene el filtro de tienda si existe)
  async function cargarMas() {
    try {
      showError('');
      showLoading(true);
      pageNumber += 1;
      const storeID = storeSelect.value || '';
      console.log(`Cargando más de la tienda: ${storeID || 'Todas'}, página: ${pageNumber}`);
      const more = await fetchDeals({ storeID, pageNumber, pageSize });
      console.log(`Se encontraron ${more.length} juegos adicionales`);
      // append: obtener elementos existentes y añadir los nuevos
      more.forEach((deal) => {
        const juego = normalizeJuego(deal);
        const card = document.createElement('article');
        card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer';
        card.innerHTML = `
          <div class="relative overflow-hidden h-40">
            <img src="${juego.image}" alt="${juego.title}" class="h-40 w-full object-cover hover:scale-110 transition-transform duration-300" loading="lazy" />
            <div class="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">${Math.round(juego.savings)}% OFF</div>
          </div>
          <div class="p-4 flex flex-col gap-2 flex-1">
            <h3 class="font-bold text-slate-900 leading-tight text-sm">${juego.title}</h3>
            <p class="text-xs text-slate-500">${juego.description}</p>
            <div class="mt-auto space-y-2">
              <p class="text-sm text-slate-700"><span class="font-black text-emerald-600">${juego.salePrice ? '$'+juego.salePrice : '—'}</span></p>
              ${juego.normalPrice ? `<p class="text-xs text-slate-400 line-through">$${juego.normalPrice}</p>` : ''}
            </div>
            <button class="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-xs font-bold hover:shadow-lg transition transform hover:scale-105" data-url="${juego.url}" data-title="${encodeURIComponent(juego.title)}" data-image="${juego.image}" data-normal="${juego.normalPrice}" data-sale="${juego.salePrice}">🎮 Ver detalle</button>
          </div>
        `;
        const imgEl = card.querySelector('img');
        if (imgEl) imgEl.addEventListener('error', ()=>{ imgEl.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'; });
        const btn = card.querySelector('button');
        if (btn) btn.addEventListener('click', ()=>{ const title=decodeURIComponent(btn.dataset.title||''); modalTitle.textContent=title; modalImage.src=btn.dataset.image||''; modalNormal.textContent=btn.dataset.normal?('$'+btn.dataset.normal):'—'; modalSale.textContent=btn.dataset.sale?('$'+btn.dataset.sale):'—'; modalLink.href=btn.dataset.url||'#'; modal.classList.remove('hidden'); modal.classList.add('flex'); });
        grid.appendChild(card);
      });
    } catch (e) {
      showError('No se pudieron cargar más resultados.');
    } finally {
      showLoading(false);
    }
  }

  // Eventos UI
  if (searchBtn) searchBtn.addEventListener('click', ()=>{ const q = searchInput.value.trim(); if(q) buscarPorTitulo(q); });
  if (searchInput) searchInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ const q=searchInput.value.trim(); if(q) buscarPorTitulo(q); }});
  if (storeSelect) storeSelect.addEventListener('change', filtrarPorTienda);
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', cargarMas);
  if (modalClose) modalClose.addEventListener('click', ()=>{ modal.classList.add('hidden'); modal.classList.remove('flex'); });
  if (modal) modal.addEventListener('click',(e)=>{ if(e.target===modal){ modal.classList.add('hidden'); modal.classList.remove('flex'); }});

  // Inicializar: render local mínimo y luego intentar cargar desde API
  // Mantengo tu render original como fallback
  try {
    // Mostrar los locales primero si existen
    if (typeof videojuegos !== 'undefined' && Array.isArray(videojuegos) && videojuegos.length) {
      renderizarVideojuegos(videojuegos);
    }
  } catch(e) {
    console.error(e);
  }

  // Cargar desde API y sobreescribir si hay datos
  cargarVideojuegosInicial();
});

