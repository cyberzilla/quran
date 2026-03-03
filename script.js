let appSettings = {
    font: 'omar',
    arabicSize: 2.25,
    wordByWord: false,
    showTransliteration: false,
    translationLang: 'none' // 'none', 'id', 'en'
};

let db = null;
let currentPage = 1;
let currentActiveTab = 0;
let quranTrackInitialized = false;
let isDragging = false;
let startX = 0;
let appBookmarks = [];
let activeVerseData = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('ServiceWorker registered:', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

function loadBookmarks() {
    try {
        appBookmarks = JSON.parse(localStorage.getItem('quran_bookmarks') || '[]');
    } catch(e) {
        appBookmarks = [];
    }
}

function saveBookmarks() {
    localStorage.setItem('quran_bookmarks', JSON.stringify(appBookmarks));
}

function toggleBookmark(surahId, verseId, pageNumber, surahNameLatin) {
    const index = appBookmarks.findIndex(b => b.surahId === surahId && b.verseId === verseId);
    if (index > -1) {
        appBookmarks.splice(index, 1);
    } else {
        appBookmarks.push({
            surahId: surahId,
            verseId: verseId,
            pageNumber: pageNumber,
            surahName: surahNameLatin,
            timestamp: new Date().getTime()
        });
    }
    saveBookmarks();
    renderBookmarkList();
}

async function initApp() {
    loadSettings();
    loadBookmarks();
    const loaderText = document.getElementById('loader-text');
    const isDbDownloaded = localStorage.getItem('is_db_downloaded');

    try {
        if (loaderText) loaderText.innerText = "MEMUAT MESIN DATABASE...";

        const SQL = await initSqlJs({
            locateFile: file => `${file}`
        });

        if (loaderText) {
            if (!isDbDownloaded) {
                loaderText.innerText = "MENGUNDUH DATA AL-QUR'AN...";
            } else {
                loaderText.innerText = "MEMUAT DATABASE LOKAL...";
            }
        }

        const response = await fetch('quran.sqlite');
        if (!response.ok) throw new Error("File quran.sqlite tidak ditemukan.");

        const buffer = await response.arrayBuffer();
        db = new SQL.Database(new Uint8Array(buffer));

        if (!isDbDownloaded) {
            localStorage.setItem('is_db_downloaded', 'true');
        }

        renderSurahList();
        renderBookmarkList();
        renderJuzList();
        setupSheetDrag('info-sheet', 'info-drag-area');

        const isReading = localStorage.getItem('quran_is_reading');
        const lastPage = localStorage.getItem('quran_last_page');

        if (isReading === 'true' && lastPage) {
            openQuranPage(parseInt(lastPage, 10));
        }

    } catch (error) {
        console.error("Error App:", error);
        if (loaderText) loaderText.innerText = "GAGAL MEMUAT DATABASE";
        alert("Pastikan file 'quran.sqlite' berada di folder yang sama dan koneksi internet stabil untuk unduhan pertama.");
    } finally {
        setTimeout(() => {
            const loader = document.getElementById('global-loader');
            if (loader) loader.classList.add('hidden');
        }, 500);
    }
}

function execQuery(sqlQuery) {
    if (!db) return [];
    try {
        const result = db.exec(sqlQuery);
        if (result.length === 0) return [];

        const columns = result[0].columns;
        const rows = result[0].values;

        return rows.map(row => {
            let obj = {};
            columns.forEach((col, index) => {
                obj[col] = row[index];
            });
            return obj;
        });
    } catch (e) {
        console.error("SQL Error:", e);
        return [];
    }
}

function switchMainTab(index) {
    currentActiveTab = index;
    const indicator = document.getElementById('main-tab-indicator');
    if (indicator) indicator.style.transform = `translateX(${index * 100}%)`;

    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach((pane, idx) => {
        if (idx === index) pane.classList.add('active');
        else pane.classList.remove('active');
    });

    const btns = document.querySelectorAll('.quran-tab');
    btns.forEach((btn, idx) => {
        if (idx === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function renderSurahList() {
    const container = document.getElementById('surah-list');
    if (!container) return;

    const surahData = execQuery("SELECT * FROM surah ORDER BY id ASC");

    let html = '';
    surahData.forEach(surah => {
        const pageQuery = execQuery(`SELECT page_number FROM verses WHERE surah_number = ${surah.id} LIMIT 1`);
        const startPage = pageQuery.length > 0 ? pageQuery[0].page_number : 1;

        html += `
            <div class="list-item surah-item" onclick="openQuranPage(${startPage})" data-id="${surah.id}" data-name="${surah.name_latin.toLowerCase()}">
                <div class="item-number">${surah.id}</div>
                <div class="item-info">
                    <div class="item-title">${surah.name_latin}</div>
                    <div class="item-subtitle">${surah.name_id}</div>
                </div>
                <div class="item-arabic">${surah.name_ar}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function filterSurah() {
    const keyword = document.getElementById('search-surah').value.toLowerCase();
    const items = document.querySelectorAll('.surah-item');
    items.forEach(item => {
        const id = item.getAttribute('data-id');
        const name = item.getAttribute('data-name');
        if (id.includes(keyword) || name.includes(keyword)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function renderBookmarkList() {
    const container = document.getElementById('bookmark-list');
    if (!container) return;

    if (appBookmarks.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Belum ada ayat yang disimpan.</div>';
        return;
    }

    appBookmarks.sort((a, b) => b.timestamp - a.timestamp);

    let html = '';
    appBookmarks.forEach(bm => {
        html += `
            <div class="list-item" onclick="openQuranPage(${bm.pageNumber})">
                <div class="item-number" style="font-size: 0.8rem;">Hal<br>${bm.pageNumber}</div>
                <div class="item-info">
                    <div class="item-title">${bm.surahName}</div>
                    <div class="item-subtitle">Ayat ${bm.verseId}</div>
                </div>
                <button class="bookmark-btn bookmarked" onclick="event.stopPropagation(); toggleBookmark(${bm.surahId}, ${bm.verseId}, ${bm.pageNumber}, '${bm.surahName.replace(/'/g, "\\'")}')" style="margin-left: auto;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderJuzList() {
    const container = document.getElementById('juz-list');
    if (!container) return;

    let html = '';
    for (let i = 1; i <= 30; i++) {
        const juzQuery = execQuery(`
            SELECT v.page_number, v.surah_number, v.verse_number, s.name_latin
            FROM verses v
                     LEFT JOIN surah s ON v.surah_number = s.id
            WHERE v.juz_number = ${i}
            ORDER BY v.id ASC LIMIT 1
        `);

        let startPage = 1;
        let surahName = "";
        let verseNumber = 1;

        if (juzQuery.length > 0) {
            startPage = juzQuery[0].page_number;
            surahName = juzQuery[0].name_latin;
            verseNumber = juzQuery[0].verse_number;
        }

        html += `
            <div class="list-item" onclick="openQuranPage(${startPage})">
                <div class="item-number" style="font-size: 0.8rem;">Juz<br>${i}</div>
                <div class="item-info">
                    <div class="item-title">Juz ${i}</div>
                    <div class="item-subtitle">${surahName} • Ayat ${verseNumber}</div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function toArabicNumber(num) {
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(c => arabicNumbers[c]).join('');
}

function initQuranTrack() {
    if (quranTrackInitialized) return;
    const track = document.getElementById('quran-slider-track');
    if (!track) return;

    track.innerHTML = '';
    for(let i = 1; i <= 604; i++) {
        let card = document.createElement('div');
        card.className = 'slide-card';
        card.id = `quran-page-${i}`;
        card.innerHTML = `<div class="quran-page-content arabic" dir="rtl"></div>`;
        track.appendChild(card);
    }
    quranTrackInitialized = true;
    setupQuranTouchEvents();
}

// Fungsi Event Klik pada Ayat
function handleVerseClick(surahId, verseId, pageNumber, surahName, element) {
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    element.classList.add('highlighted');

    activeVerseData = { surahId, verseId, pageNumber, surahName };

    const titleEl = document.getElementById('vp-title');
    const subtitleEl = document.getElementById('vp-subtitle');
    if(titleEl) titleEl.innerText = surahName;
    if(subtitleEl) subtitleEl.innerText = `Ayat ${verseId}`;

    updatePopupBookmarkIcon(surahId, verseId);

    const popup = document.getElementById('verse-popup');
    if(popup) popup.classList.add('active');
}

function updatePopupBookmarkIcon(surahId, verseId) {
    const isBookmarked = appBookmarks.some(b => b.surahId === surahId && b.verseId === verseId);
    const bmBtn = document.getElementById('vp-btn-bookmark');
    if(!bmBtn) return;

    if(isBookmarked) {
        bmBtn.classList.add('bookmarked');
        bmBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;
    } else {
        bmBtn.classList.remove('bookmarked');
        bmBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;
    }
}

function togglePopupBookmark() {
    if(!activeVerseData) return;
    toggleBookmark(activeVerseData.surahId, activeVerseData.verseId, activeVerseData.pageNumber, activeVerseData.surahName);
    updatePopupBookmarkIcon(activeVerseData.surahId, activeVerseData.verseId);
}

function closeVersePopup() {
    const popup = document.getElementById('verse-popup');
    if(popup) popup.classList.remove('active');
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    activeVerseData = null;
}

function renderPageContent(pageNumber, forceRender = false) {
    if (pageNumber < 1 || pageNumber > 604 || !db) return;
    const container = document.querySelector(`#quran-page-${pageNumber} .quran-page-content`);
    if (!container) return;
    if (container.dataset.loaded === "true" && !forceRender) return;

    const verses = execQuery(`
        SELECT v.*, s.name_ar, s.name_latin, s.name_id, s.location, s.verses_count
        FROM verses v
                 LEFT JOIN surah s ON v.surah_number = s.id
        WHERE v.page_number = ${pageNumber}
        ORDER BY v.surah_number, v.verse_number
    `);

    if (verses.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:50px; color: var(--text-muted);">Data tidak ditemukan.</div>';
        return;
    }

    const isMushafMode = !appSettings.wordByWord && !appSettings.showTransliteration && appSettings.translationLang === 'none';
    if (isMushafMode) {
        container.classList.remove('list-mode');
        container.classList.add('mushaf-mode');
    } else {
        container.classList.remove('mushaf-mode');
        container.classList.add('list-mode');
    }

    let html = '';

    verses.forEach(v => {
        if (v.verse_number === 1) {
            const translationText = v.name_id ? ` <span style="font-weight: normal; font-size: 0.85em;">(${v.name_id})</span>` : '';
            html += `
                <div class="surah-header-separator">
                    <div class="surah-col-left">${v.verses_count}<br>Ayat</div>
                    <div class="surah-col-center">
                        <div class="surah-name-ar">${v.name_ar}</div>
                        <div class="surah-name-id">${v.name_latin}${translationText}</div>
                    </div>
                    <div class="surah-col-right">${v.location}</div>
                </div>
            `;
            if (v.surah_number !== 1 && v.surah_number !== 9) {
                html += `<div class="bismillah-header">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>`;
            }
        }

        let fullArabicText = v.arabic_text || '';

        if (v.surah_number !== 1 && v.verse_number === 1) {
            const bismillahs = ["بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ", "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ "];
            bismillahs.forEach(b => {
                if (fullArabicText.startsWith(b)) fullArabicText = fullArabicText.replace(b, "");
            });
        }

        const safeSurahName = v.name_latin.replace(/'/g, "\\'");

        if (isMushafMode) {
            html += `<span class="verse-mushaf-wrap" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', this)"><span class="verse-word">${fullArabicText}</span><span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></span> `;
        } else {
            html += `<div class="verse-container" id="verse-${v.id}" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', this)">`;

            if (appSettings.wordByWord) {
                html += `<div class="wbw-container">`;

                let arWords = [];
                let trWords = [];
                let tlWords = [];

                try {
                    arWords = JSON.parse(v.arabic_words || "[]");
                    trWords = JSON.parse(v.transliteration_words || "[]");

                    if (appSettings.translationLang === 'id') {
                        tlWords = JSON.parse(v.translation_id_words || "[]");
                    } else if (appSettings.translationLang === 'en') {
                        tlWords = JSON.parse(v.translation_en_words || "[]");
                    }
                } catch (e) {
                    console.error("Gagal parsing JSON word-by-word:", e);
                }

                if (arWords.length > 0) {
                    for (let i = 0; i < arWords.length; i++) {
                        html += `<div class="word-group">`;
                        html += `   <div class="word-arabic">${arWords[i] || ''}</div>`;

                        if (appSettings.showTransliteration && trWords[i]) {
                            html += `   <div class="word-transliteration">${trWords[i]}</div>`;
                        }

                        if (appSettings.translationLang !== 'none' && tlWords[i]) {
                            html += `   <div class="word-translation">${tlWords[i]}</div>`;
                        }
                        html += `</div>`;
                    }
                } else {
                    html += `<div class="word-group"><div class="word-arabic">${fullArabicText}</div></div>`;
                }

                html += `   <div class="word-group verse-end-group"><span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></div>`;
                html += `</div>`;
            } else {
                html += `<div class="verse-text-group"><span class="verse-word">${fullArabicText}</span> <span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></div>`;
            }

            if (appSettings.showTransliteration) {
                html += `<div class="verse-transliteration">${v.transliteration || ''}</div>`;
            }
            if (appSettings.translationLang === 'id') {
                html += `<div class="verse-translation">${v.translation_id || ''}</div>`;
            } else if (appSettings.translationLang === 'en') {
                html += `<div class="verse-translation">${v.translation_en || ''}</div>`;
            }

            html += `</div>`;
        }
    });

    container.innerHTML = html;
    container.dataset.loaded = "true";
}

function openQuranPage(pageNumber) {
    currentPage = pageNumber;
    localStorage.setItem('quran_last_page', pageNumber);
    localStorage.setItem('quran_is_reading', 'true');

    document.getElementById('quran-view').classList.add('active');
    document.getElementById('home-view').classList.remove('active');

    if (!quranTrackInitialized) initQuranTrack();

    renderPageContent(currentPage);
    document.getElementById('quran-slider-track').style.transition = 'none';
    updateQuranUI();

    const activeCard = document.getElementById(`quran-page-${currentPage}`);
    if (activeCard) activeCard.scrollTop = 0;

    setTimeout(() => {
        document.getElementById('quran-slider-track').style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        renderPageContent(currentPage - 1);
        renderPageContent(currentPage + 1);
    }, 50);
}

function updateQuranUI() {
    let headerText = `Halaman ${currentPage}`;
    let headerParts = [];

    const pageVerses = execQuery(`SELECT surah_number, verse_number, juz_number FROM verses WHERE page_number = ${currentPage}`);

    if (pageVerses.length > 0) {
        const surahGroups = {};
        const juzSet = new Set();

        pageVerses.forEach(v => {
            if (!surahGroups[v.surah_number]) {
                surahGroups[v.surah_number] = [];
            }
            surahGroups[v.surah_number].push(v.verse_number);
            if (v.juz_number) juzSet.add(v.juz_number);
        });

        for (const surahId in surahGroups) {
            const versesInSurah = surahGroups[surahId];
            const minVerse = Math.min(...versesInSurah);
            const maxVerse = Math.max(...versesInSurah);

            const surahInfo = execQuery(`SELECT name_latin FROM surah WHERE id = ${surahId}`);
            const surahName = surahInfo.length > 0 ? surahInfo[0].name_latin : `Surah ${surahId}`;

            if (minVerse === maxVerse) {
                headerParts.push(`${surahId}. ${surahName}: ${minVerse}`);
            } else {
                headerParts.push(`${surahId}. ${surahName}: ${minVerse}-${maxVerse}`);
            }
        }

        const surahString = headerParts.join(' | ');
        const juzString = Array.from(juzSet).join('-');

        headerText = `
            <span style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1.1rem;">${surahString}</span>
            <span style="display: block; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-top: 2px;">
                ${juzString ? 'Juz ' + juzString : ''}
            </span>
        `;
    }

    const headerTitleEl = document.getElementById('quran-header-title');
    if (headerTitleEl) headerTitleEl.innerHTML = headerText;

    const pageInfoPill = document.getElementById('page-info-pill');
    if (pageInfoPill) pageInfoPill.innerText = `Hal ${currentPage}`;

    const btnPrev = document.getElementById('btn-prev-page');
    if (btnPrev) btnPrev.disabled = (currentPage <= 1);

    const btnNext = document.getElementById('btn-next-page');
    if (btnNext) btnNext.disabled = (currentPage >= 604);

    const track = document.getElementById('quran-slider-track');
    if (track) track.style.transform = `translate3d(${(currentPage - 1) * 100}%, 0, 0)`;

    const cards = document.querySelectorAll('#quran-slider-track .slide-card');
    cards.forEach((card, index) => {
        if (index === currentPage - 1) card.classList.add('active-slide');
        else card.classList.remove('active-slide');
    });
}

function changePage(delta) {
    let newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= 604) {
        closeVersePopup(); // Tutup popup saat ganti halaman
        currentPage = newPage;
        localStorage.setItem('quran_last_page', currentPage);

        renderPageContent(currentPage);
        const track = document.getElementById('quran-slider-track');
        if (track) track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        updateQuranUI();

        const activeCard = document.getElementById(`quran-page-${currentPage}`);
        if (activeCard) activeCard.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            renderPageContent(currentPage - 1);
            renderPageContent(currentPage + 1);
        }, 400);
    }
}

function setupQuranTouchEvents() {
    const viewport = document.getElementById('quran-slider-viewport');
    if (!viewport) return;

    let startY = 0, isScrolling = null, ignoreMouseSwipe = false;

    const onStart = (e) => {
        if (e.type === 'touchstart') ignoreMouseSwipe = true;
        if (e.type === 'mousedown' && ignoreMouseSwipe) return;
        isDragging = true; isScrolling = null;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        const track = document.getElementById('quran-slider-track');
        if (track) track.style.transition = 'none';
    };

    const onMove = (e) => {
        if (e.type === 'mousemove' && ignoreMouseSwipe) return;
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        const diffX = currentX - startX, diffY = currentY - startY;

        if (isScrolling === null) {
            if (Math.abs(diffX) > 3 || Math.abs(diffY) > 3) isScrolling = Math.abs(diffY) > Math.abs(diffX);
        }
        if (isScrolling) return;
        if (e.cancelable) e.preventDefault();

        const percentMove = (diffX / viewport.offsetWidth) * 100;
        const currentTranslate = (currentPage - 1) * 100 + percentMove;
        const track = document.getElementById('quran-slider-track');
        if (track) track.style.transform = `translate3d(${currentTranslate}%, 0, 0)`;
    };

    const onEnd = (e) => {
        if (e.type === 'mouseup' && ignoreMouseSwipe) return;
        if (!isDragging) return;
        isDragging = false;

        if (e.type === 'touchend') setTimeout(() => { ignoreMouseSwipe = false; }, 300);
        if (isScrolling) { isScrolling = null; return; }

        const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (diff > 70 && currentPage < 604) changePage(1);
        else if (diff < -70 && currentPage > 1) changePage(-1);
        else {
            const track = document.getElementById('quran-slider-track');
            if (track) {
                track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
                track.style.transform = `translate3d(${(currentPage - 1) * 100}%, 0, 0)`;
            }
        }
    };

    viewport.addEventListener('mousedown', onStart);
    viewport.addEventListener('mousemove', onMove, { passive: false });
    viewport.addEventListener('mouseup', onEnd);
    viewport.addEventListener('mouseleave', onEnd);
    viewport.addEventListener('touchstart', onStart, { passive: true });
    viewport.addEventListener('touchmove', onMove, { passive: false });
    viewport.addEventListener('touchend', onEnd);
}

function closeQuran() {
    closeVersePopup(); // Tutup popup saat keluar dari bacaan
    document.getElementById('quran-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    closeAllSheets();
    localStorage.removeItem('quran_is_reading');
}

function openSettings() {
    document.getElementById('info-sheet').classList.add('expanded');
    checkOverlay();
}

function closeAllSheets() {
    document.getElementById('info-sheet').classList.remove('expanded');
    checkOverlay();
}

function checkOverlay() {
    const isExp = document.getElementById('info-sheet').classList.contains('expanded');
    const overlay = document.getElementById('sheet-overlay');
    if (overlay) {
        if (isExp) overlay.classList.add('active');
        else overlay.classList.remove('active');
    }
}

function updateSettings() {
    const fontSelect = document.getElementById('font-select');
    const togglePerkata = document.getElementById('toggle-perkata');
    const toggleTransliterasi = document.getElementById('toggle-transliterasi');
    const selectTranslation = document.getElementById('select-translation');

    if (fontSelect) appSettings.font = fontSelect.value;
    if (togglePerkata) appSettings.wordByWord = togglePerkata.checked;
    if (toggleTransliterasi) appSettings.showTransliteration = toggleTransliterasi.checked;
    if (selectTranslation) appSettings.translationLang = selectTranslation.value;

    localStorage.setItem('quran_settings', JSON.stringify(appSettings));
    applySettings();

    document.querySelectorAll('.quran-page-content').forEach(container => {
        container.dataset.loaded = "false";
    });

    const quranView = document.getElementById('quran-view');
    if (quranView && quranView.classList.contains('active')) {
        renderPageContent(currentPage, true);
        renderPageContent(currentPage - 1, true);
        renderPageContent(currentPage + 1, true);
    }
}

function loadSettings() {
    const saved = localStorage.getItem('quran_settings');
    if (saved) appSettings = Object.assign(appSettings, JSON.parse(saved));

    const fontSelect = document.getElementById('font-select');
    if (fontSelect) fontSelect.value = appSettings.font;

    const togglePerkata = document.getElementById('toggle-perkata');
    if (togglePerkata) togglePerkata.checked = appSettings.wordByWord;

    const toggleTransliterasi = document.getElementById('toggle-transliterasi');
    if (toggleTransliterasi) toggleTransliterasi.checked = appSettings.showTransliteration;

    const selectTranslation = document.getElementById('select-translation');
    if (selectTranslation) selectTranslation.value = appSettings.translationLang;

    applySettings();
}

function changeFontSize(step) {
    appSettings.arabicSize += step;
    if (appSettings.arabicSize < 1.5) appSettings.arabicSize = 1.5;
    if (appSettings.arabicSize > 5.0) appSettings.arabicSize = 5.0;
    updateSettings();
}

function applySettings() {
    document.body.classList.remove('font-omar');
    document.body.classList.add('font-' + appSettings.font);
    document.documentElement.style.setProperty('--arabic-font-size', appSettings.arabicSize + 'rem');
}

function setupSheetDrag(sheetId, dragAreaId) {
    const sheet = document.getElementById(sheetId);
    const dragArea = document.getElementById(dragAreaId);
    if (!sheet || !dragArea) return;

    let startY = 0, currentY = 0, isDraggingSheet = false;

    const onStart = (e) => {
        isDraggingSheet = true;
        startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        sheet.style.transition = 'none';
    };

    const onMove = (e) => {
        if (!isDraggingSheet) return;
        if (e.cancelable) e.preventDefault();
        currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        const diff = currentY - startY;
        const isExpanded = sheet.classList.contains('expanded');
        let transformY = isExpanded ? diff : (sheet.offsetHeight - 50) + diff;
        if (transformY < 0) transformY = 0;
        sheet.style.transform = `translateY(${transformY}px)`;
    };

    const onEnd = (e) => {
        if (!isDraggingSheet) return;
        isDraggingSheet = false;
        sheet.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        const diff = currentY - startY;
        const isExpanded = sheet.classList.contains('expanded');

        if (Math.abs(diff) > 50) {
            if (isExpanded && diff > 50) sheet.classList.remove('expanded');
            else if (!isExpanded && diff < -50) sheet.classList.add('expanded');
        } else if (Math.abs(diff) < 10) {
            sheet.classList.toggle('expanded');
        }
        sheet.style.transform = '';
        checkOverlay();
    };

    dragArea.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    dragArea.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
}

window.addEventListener('resize', () => {
    if (document.getElementById('quran-view').classList.contains('active')) {
        updateQuranUI();
    }
});

document.addEventListener('DOMContentLoaded', initApp);
