let appSettings = {
    font: 'omar',
    arabicSize: 2.25,
    wordByWord: false,
    showTransliteration: false,
    translationLang: 'none'
};

let db = null;
let currentPage = 1;
let currentActiveTab = 0;
let quranTrackInitialized = false;
let isDragging = false;
let startX = 0;
let startY = 0;
let globalIsDragging = false;
let preventNextClick = false;

let appBookmarks = [];
let appFolders = [];
let activeVerseData = null;
let currentViewingFolderId = null;
let bookmarkToMove = null;
let confirmCallback = null;

let gotoData = { surah: 1, ayah: 1, page: 1, totalAyahs: 7 };

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('ServiceWorker registered:', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function showConfirm(title, message, callback) {
    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-message').innerText = message;
    confirmCallback = callback;
    document.getElementById('confirm-modal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirm-modal').classList.remove('active');
    confirmCallback = null;
}

function executeConfirmModal() {
    if (confirmCallback) confirmCallback();
    closeConfirmModal();
}

function loadBookmarks() {
    try {
        appBookmarks = JSON.parse(localStorage.getItem('quran_bookmarks') || '[]');
        appFolders = JSON.parse(localStorage.getItem('quran_folders') || '[]');
    } catch(e) {
        appBookmarks = [];
        appFolders = [];
    }
}

function saveBookmarks() {
    localStorage.setItem('quran_bookmarks', JSON.stringify(appBookmarks));
    localStorage.setItem('quran_folders', JSON.stringify(appFolders));
}

function addBookmark() {
    if(!activeVerseData) return;

    appBookmarks.unshift({
        id: 'bm_' + new Date().getTime() + '_' + Math.floor(Math.random()*1000),
        surahId: activeVerseData.surahId,
        verseId: activeVerseData.verseId,
        pageNumber: activeVerseData.pageNumber,
        surahName: activeVerseData.surahName,
        folderId: currentViewingFolderId || null,
        timestamp: new Date().getTime()
    });

    saveBookmarks();

    if (currentViewingFolderId) {
        const folder = appFolders.find(f => f.id === currentViewingFolderId);
        if (folder) openFolderView(folder.id, folder.name);
    } else {
        renderBookmarkTab();
    }

    showToast("Bookmark berhasil ditambahkan");
    closeVersePopup();
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
}

function promptRemoveBookmark(id) {
    showConfirm("Hapus Bookmark", "Apakah Anda yakin ingin menghapus bookmark ini?", () => {
        removeBookmark(id);
    });
}

function removeBookmark(id) {
    appBookmarks = appBookmarks.filter(b => b.id !== id);
    saveBookmarks();
    if (currentViewingFolderId) {
        const folder = appFolders.find(f => f.id === currentViewingFolderId);
        if (folder) openFolderView(folder.id, folder.name);
    } else {
        renderBookmarkTab();
    }
    showToast("Bookmark berhasil dihapus");
}

async function initApp() {
    loadSettings();
    loadBookmarks();
    const loaderText = document.getElementById('loader-text');
    const isDbDownloaded = localStorage.getItem('is_db_downloaded');

    try {
        if (loaderText) loaderText.innerText = "MEMUAT MESIN DATABASE...";

        const SQL = await initSqlJs({ locateFile: file => `${file}` });

        if (loaderText) {
            if (!isDbDownloaded) loaderText.innerText = "MENGUNDUH DATA AL-QUR'AN...";
            else loaderText.innerText = "MEMUAT DATABASE LOKAL...";
        }

        const response = await fetch('quran.sqlite');
        if (!response.ok) throw new Error("File quran.sqlite tidak ditemukan.");

        const buffer = await response.arrayBuffer();
        db = new SQL.Database(new Uint8Array(buffer));

        if (!isDbDownloaded) localStorage.setItem('is_db_downloaded', 'true');

        renderSurahList();
        renderBookmarkTab();
        renderJuzList();
        setupSheetDrag('info-sheet', 'info-drag-area');
        setupSwipeTabs();

        const isReading = localStorage.getItem('quran_is_reading');
        const lastPage = localStorage.getItem('quran_last_page');

        if (isReading === 'true' && lastPage) {
            openQuranPage(parseInt(lastPage, 10));
        }

    } catch (error) {
        console.error("Error App:", error);
        if (loaderText) loaderText.innerText = "GAGAL MEMUAT DATABASE";
        alert("Pastikan file 'quran.sqlite' berada di folder yang sama dan koneksi internet stabil.");
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
            columns.forEach((col, index) => { obj[col] = row[index]; });
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

function setupSwipeTabs() {
    const swipeArea = document.getElementById('main-tab-swipe-area');
    if(!swipeArea) return;
    let touchStartX = 0;
    let touchStartY = 0;

    swipeArea.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, {passive: true});

    swipeArea.addEventListener('touchend', e => {
        let touchEndX = e.changedTouches[0].clientX;
        let touchEndY = e.changedTouches[0].clientY;

        let diffX = touchEndX - touchStartX;
        let diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX < 0) {
                if(currentActiveTab < 2) switchMainTab(currentActiveTab + 1);
            } else {
                if(currentActiveTab > 0) switchMainTab(currentActiveTab - 1);
            }
        }
    }, {passive: true});
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
            <div class="list-item surah-item" onclick="openQuranPage(${startPage})" 
                 data-id="${surah.id}" 
                 data-name="${surah.name_latin.toLowerCase()}"
                 data-nameid="${(surah.name_id || '').toLowerCase()}"
                 data-namear="${surah.name_ar}">
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
        const nameid = item.getAttribute('data-nameid');
        const namear = item.getAttribute('data-namear');
        if (id.includes(keyword) || name.includes(keyword) || nameid.includes(keyword) || namear.includes(keyword)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function moveFolder(id, dir) {
    const fIndex = appFolders.findIndex(f => f.id === id);
    if (fIndex === -1) return;
    let targetIndex = fIndex + dir;
    if (targetIndex >= 0 && targetIndex < appFolders.length) {
        const temp = appFolders[fIndex];
        appFolders[fIndex] = appFolders[targetIndex];
        appFolders[targetIndex] = temp;
        saveBookmarks();
        renderBookmarkTab();
    }
}

function promptDeleteFolder(id) {
    showConfirm("Hapus Folder", "Apakah Anda yakin ingin menghapus folder ini? (Bookmark di dalamnya akan dipindahkan ke luar folder)", () => {
        deleteFolder(id);
    });
}

function deleteFolder(id) {
    appBookmarks.forEach(b => {
        if (b.folderId === id) b.folderId = null;
    });
    appFolders = appFolders.filter(f => f.id !== id);
    saveBookmarks();
    renderBookmarkTab();
    showToast("Folder berhasil dihapus");
}

function moveBookmark(id, dir) {
    const bmIndex = appBookmarks.findIndex(b => b.id === id);
    if (bmIndex === -1) return;
    const bm = appBookmarks[bmIndex];
    const folderId = bm.folderId;

    let targetIndex = -1;
    if (dir === -1) {
        for (let i = bmIndex - 1; i >= 0; i--) {
            if (appBookmarks[i].folderId === folderId) { targetIndex = i; break; }
        }
    } else {
        for (let i = bmIndex + 1; i < appBookmarks.length; i++) {
            if (appBookmarks[i].folderId === folderId) { targetIndex = i; break; }
        }
    }

    if (targetIndex !== -1) {
        const temp = appBookmarks[bmIndex];
        appBookmarks[bmIndex] = appBookmarks[targetIndex];
        appBookmarks[targetIndex] = temp;
        saveBookmarks();
        if (currentViewingFolderId) {
            const folder = appFolders.find(f => f.id === currentViewingFolderId);
            if (folder) openFolderView(folder.id, folder.name);
        } else {
            renderBookmarkTab();
        }
    }
}

function renderBookmarkTab() {
    const folderList = document.getElementById('folder-list');
    const bookmarkList = document.getElementById('bookmark-list');
    const titleSemua = document.getElementById('title-semua-bookmark');
    if(!folderList || !bookmarkList) return;

    let folderHtml = '';
    appFolders.forEach(folder => {
        const count = appBookmarks.filter(b => b.folderId === folder.id).length;
        folderHtml += `
            <div class="list-item folder-item" onclick="openFolderView('${folder.id}', '${folder.name}')">
                <div class="item-number" style="background:var(--primary); color:white;">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div class="item-info">
                    <div class="item-title">${folder.name}</div>
                    <div class="item-subtitle">${count} Ayat tersimpan</div>
                </div>
                <div style="display:flex; gap:12px; align-items:center;">
                    <div class="bookmark-move-controls">
                        <button onclick="event.stopPropagation(); moveFolder('${folder.id}', -1)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
                        </button>
                        <button onclick="event.stopPropagation(); moveFolder('${folder.id}', 1)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </div>
                    <button class="btn-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);" onclick="event.stopPropagation(); promptDeleteFolder('${folder.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        `;
    });
    folderList.innerHTML = folderHtml;

    const rootBookmarks = appBookmarks.filter(b => !b.folderId);
    if(rootBookmarks.length > 0 || appFolders.length > 0) {
        titleSemua.style.display = 'block';
    } else {
        titleSemua.style.display = 'none';
        bookmarkList.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Belum ada ayat yang disimpan.</div>';
        return;
    }

    let bHtml = '';
    rootBookmarks.forEach(bm => {
        bHtml += `
            <div class="list-item" onclick="openQuranPage(${bm.pageNumber}, ${bm.surahId}, ${bm.verseId}, 'bookmark')">
                <div class="item-number" style="font-size: 0.8rem;">Hal<br>${bm.pageNumber}</div>
                <div class="item-info">
                    <div class="item-title">${bm.surahName}</div>
                    <div class="item-subtitle">Ayat ${bm.verseId}</div>
                </div>
                <div style="display:flex; gap:12px; align-items:center;">
                    <div class="bookmark-move-controls">
                        <button onclick="event.stopPropagation(); moveBookmark('${bm.id}', -1)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
                        </button>
                        <button onclick="event.stopPropagation(); moveBookmark('${bm.id}', 1)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </div>
                    <button class="btn-icon" onclick="event.stopPropagation(); openMoveModal('${bm.id}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg>
                    </button>
                    <button class="btn-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);" onclick="event.stopPropagation(); promptRemoveBookmark('${bm.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        `;
    });
    bookmarkList.innerHTML = bHtml;
}

function openCreateFolderModal() {
    document.getElementById('folder-create-modal').classList.add('active');
    document.getElementById('input-folder-name').value = '';
    document.getElementById('input-folder-name').focus();
}
function closeFolderModal() { document.getElementById('folder-create-modal').classList.remove('active'); }
function executeCreateFolder() {
    const name = document.getElementById('input-folder-name').value.trim();
    if(name) {
        appFolders.push({ id: 'f_' + new Date().getTime(), name: name });
        saveBookmarks();
        renderBookmarkTab();
        closeFolderModal();
        showToast("Folder berhasil dibuat");
    }
}

function openMoveModal(bookmarkId) {
    bookmarkToMove = appBookmarks.find(b => b.id === bookmarkId);
    if(!bookmarkToMove) return;
    const list = document.getElementById('move-folder-list');
    let html = `<div class="move-folder-item" onclick="executeMoveBookmark(null)">-- Tanpa Folder (Root) --</div>`;
    appFolders.forEach(f => {
        html += `<div class="move-folder-item" onclick="executeMoveBookmark('${f.id}')">📁 ${f.name}</div>`;
    });
    list.innerHTML = html;
    document.getElementById('folder-move-modal').classList.add('active');
}
function closeMoveModal() {
    document.getElementById('folder-move-modal').classList.remove('active');
    bookmarkToMove = null;
}
function executeMoveBookmark(folderId) {
    if(bookmarkToMove) {
        bookmarkToMove.folderId = folderId;
        saveBookmarks();
        if (currentViewingFolderId) {
            const folder = appFolders.find(f => f.id === currentViewingFolderId);
            if (folder) openFolderView(folder.id, folder.name);
        } else {
            renderBookmarkTab();
        }
        showToast("Bookmark dipindahkan");
    }
    closeMoveModal();
}

function openFolderView(folderId, folderName) {
    currentViewingFolderId = folderId;
    document.getElementById('bookmark-root-view').style.display = 'none';
    document.getElementById('bookmark-folder-view').style.display = 'block';
    document.getElementById('current-folder-name').innerText = folderName;
    document.querySelector('.bookmark-header-actions').style.display = 'none';

    const container = document.getElementById('folder-content-list');
    const folderBookmarks = appBookmarks.filter(b => b.folderId === folderId);

    if(folderBookmarks.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Folder ini kosong.</div>';
        return;
    }

    let html = '';
    folderBookmarks.forEach(bm => {
        let arabicTextPreview = "";
        if(db) {
            const verseData = execQuery(`SELECT arabic_text FROM verses WHERE surah_number=${bm.surahId} AND verse_number=${bm.verseId}`);
            if(verseData.length > 0) arabicTextPreview = verseData[0].arabic_text;
        }

        html += `
            <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:10px;" onclick="openQuranPage(${bm.pageNumber}, ${bm.surahId}, ${bm.verseId}, 'bookmark')">
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <div style="font-weight:700; color:var(--primary); font-size:0.9rem;">${bm.surahName} : ${bm.verseId} (Hal ${bm.pageNumber})</div>
                    <div style="display:flex; gap:12px; align-items:center;">
                        <div class="bookmark-move-controls">
                            <button onclick="event.stopPropagation(); moveBookmark('${bm.id}', -1)">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
                            </button>
                            <button onclick="event.stopPropagation(); moveBookmark('${bm.id}', 1)">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                        </div>
                        <button class="btn-icon" onclick="event.stopPropagation(); openMoveModal('${bm.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M5 9l7 7 7-7"/></svg>
                        </button>
                        <button class="btn-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);" onclick="event.stopPropagation(); promptRemoveBookmark('${bm.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="folder-bookmark-arabic">
                    ${arabicTextPreview} <span style="font-size:0.7em; color:var(--primary);">۝${toArabicNumber(bm.verseId)}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function closeFolderView() {
    currentViewingFolderId = null;
    document.getElementById('bookmark-root-view').style.display = 'block';
    document.getElementById('bookmark-folder-view').style.display = 'none';
    document.querySelector('.bookmark-header-actions').style.display = 'block';
    renderBookmarkTab();
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
        let startPage = 1, surahName = "", verseNumber = 1;
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

function handleVerseClick(surahId, verseId, pageNumber, surahName, arabicText, translationText, element) {
    if (preventNextClick) return;

    const popup = document.getElementById('verse-popup');
    const isPopupActive = popup.classList.contains('active');

    // Cek apakah elemen ini yang sedang disorot (untuk toggle matikan/nyalakan)
    if(element.classList.contains('highlighted') && window._currentClickAction == null) {
        if (!isPopupActive) {
            // Popup sedang mati tapi elemen terseleksi (misal masuk dari bookmark), nyalakan popup
            activeVerseData = { surahId, verseId, pageNumber, surahName, arabicText, translationText };
            const titleEl = document.getElementById('vp-title');
            const subtitleEl = document.getElementById('vp-subtitle');
            if(titleEl) titleEl.innerText = surahName;
            if(subtitleEl) subtitleEl.innerText = `Ayat ${verseId}`;
            popup.classList.add('active');
            return;
        } else {
            // Toggle MATIKAN seleksi dan tutup popup
            element.classList.remove('highlighted');
            closeVersePopup();
            return;
        }
    }

    // Eksekusi Normal (Elemen belum disorot, atau pindah klik ke ayat lain)
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    element.classList.add('highlighted');

    activeVerseData = { surahId, verseId, pageNumber, surahName, arabicText, translationText };

    if (window._currentClickAction === 'bookmark') {
        // Jika asalnya dari klik bookmark -> jangan munculkan popup
        closeVersePopup();
    } else {
        // Asal klik normal atau GoTo -> Munculkan popup
        const titleEl = document.getElementById('vp-title');
        const subtitleEl = document.getElementById('vp-subtitle');
        if(titleEl) titleEl.innerText = surahName;
        if(subtitleEl) subtitleEl.innerText = `Ayat ${verseId}`;
        popup.classList.add('active');
    }
}

function copyVerseText() {
    if(!activeVerseData) return;
    const textToCopy = `${activeVerseData.arabicText}\n\n"${activeVerseData.translationText}"\n(QS. ${activeVerseData.surahName} : ${activeVerseData.verseId})`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Ayat berhasil disalin");
        closeVersePopup();
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    }).catch(err => {
        console.error('Gagal menyalin:', err);
    });
}

function closeVersePopup() {
    const popup = document.getElementById('verse-popup');
    if(popup) popup.classList.remove('active');
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
            const translationTextInfo = v.name_id ? ` <span style="font-weight: normal; font-size: 0.85em;">(${v.name_id})</span>` : '';
            html += `
                <div class="surah-header-separator">
                    <div class="surah-col-left">${v.verses_count}<br>Ayat</div>
                    <div class="surah-col-center">
                        <div class="surah-name-ar">${v.name_ar}</div>
                        <div class="surah-name-id">${v.name_latin}${translationTextInfo}</div>
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
        const cleanArabicForCopy = fullArabicText.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const cleanTranslationForCopy = (v.translation_id || '').replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const verseElId = `verse-wrap-${v.surah_number}-${v.verse_number}`;

        if (isMushafMode) {
            html += `<span id="${verseElId}" class="verse-mushaf-wrap" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', '${cleanArabicForCopy}', '${cleanTranslationForCopy}', this)"><span class="verse-word">${fullArabicText}</span><span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></span> `;
        } else {
            html += `<div id="${verseElId}" class="verse-container" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', '${cleanArabicForCopy}', '${cleanTranslationForCopy}', this)">`;

            if (appSettings.wordByWord) {
                html += `<div class="wbw-container">`;
                let arWords = [], trWords = [], tlWords = [];
                try {
                    arWords = JSON.parse(v.arabic_words || "[]");
                    trWords = JSON.parse(v.transliteration_words || "[]");
                    if (appSettings.translationLang === 'id') tlWords = JSON.parse(v.translation_id_words || "[]");
                    else if (appSettings.translationLang === 'en') tlWords = JSON.parse(v.translation_en_words || "[]");
                } catch (e) {}

                if (arWords.length > 0) {
                    for (let i = 0; i < arWords.length; i++) {
                        html += `<div class="word-group"><div class="word-arabic">${arWords[i] || ''}</div>`;
                        if (appSettings.showTransliteration && trWords[i]) html += `<div class="word-transliteration">${trWords[i]}</div>`;
                        if (appSettings.translationLang !== 'none' && tlWords[i]) html += `<div class="word-translation">${tlWords[i]}</div>`;
                        html += `</div>`;
                    }
                } else {
                    html += `<div class="word-group"><div class="word-arabic">${fullArabicText}</div></div>`;
                }
                html += `<div class="word-group verse-end-group"><span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></div></div>`;
            } else {
                html += `<div class="verse-text-group"><span class="verse-word">${fullArabicText}</span> <span class="verse-end">۝${toArabicNumber(v.verse_number)}</span></div>`;
            }

            if (appSettings.showTransliteration) html += `<div class="verse-transliteration">${v.transliteration || ''}</div>`;
            if (appSettings.translationLang === 'id') html += `<div class="verse-translation">${v.translation_id || ''}</div>`;
            else if (appSettings.translationLang === 'en') html += `<div class="verse-translation">${v.translation_en || ''}</div>`;
            html += `</div>`;
        }
    });

    container.innerHTML = html;
    container.dataset.loaded = "true";
}

function openQuranPage(pageNumber, highlightSurah = null, highlightVerse = null, actionType = null) {
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
    if (activeCard) activeCard.scrollTo({ top: 0 });

    setTimeout(() => {
        document.getElementById('quran-slider-track').style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        renderPageContent(currentPage - 1);
        renderPageContent(currentPage + 1);

        if (highlightSurah && highlightVerse) {
            const targetEl = document.getElementById(`verse-wrap-${highlightSurah}-${highlightVerse}`);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!targetEl.classList.contains('highlighted')) {
                    window._currentClickAction = actionType;
                    targetEl.click();
                    window._currentClickAction = null;
                }
            }
        }
    }, 150);
}

function updateQuranUI() {
    let headerText = `Halaman ${currentPage}`;
    let headerParts = [];
    const pageVerses = execQuery(`SELECT surah_number, verse_number, juz_number FROM verses WHERE page_number = ${currentPage}`);

    if (pageVerses.length > 0) {
        const surahGroups = {};
        const juzSet = new Set();
        pageVerses.forEach(v => {
            if (!surahGroups[v.surah_number]) surahGroups[v.surah_number] = [];
            surahGroups[v.surah_number].push(v.verse_number);
            if (v.juz_number) juzSet.add(v.juz_number);
        });

        for (const surahId in surahGroups) {
            const versesInSurah = surahGroups[surahId];
            const minVerse = Math.min(...versesInSurah);
            const maxVerse = Math.max(...versesInSurah);
            const surahInfo = execQuery(`SELECT name_latin FROM surah WHERE id = ${surahId}`);
            const surahName = surahInfo.length > 0 ? surahInfo[0].name_latin : `Surah ${surahId}`;
            if (minVerse === maxVerse) headerParts.push(`${surahId}. ${surahName}: ${minVerse}`);
            else headerParts.push(`${surahId}. ${surahName}: ${minVerse}-${maxVerse}`);
        }

        const surahString = headerParts.join(' | ');
        const juzString = Array.from(juzSet).join('-');

        headerText = `
            <span style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.7rem;">${surahString}</span>
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
        closeVersePopup();
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
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
    let isScrolling = null, ignoreMouseSwipe = false;

    const onStart = (e) => {
        if (e.type === 'touchstart') ignoreMouseSwipe = true;
        if (e.type === 'mousedown' && ignoreMouseSwipe) return;

        isDragging = true;
        isScrolling = null;
        globalIsDragging = false; // Reset drag marker

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

        // Jika terdeteksi gesekan (bukan sekedar tap meleset sedikit)
        if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
            if (!globalIsDragging) {
                globalIsDragging = true;
                // Tutup popup secara instan hanya ketika benar-benar digeser
                closeVersePopup();
                document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
            }
        }

        if (isScrolling === null) {
            if (Math.abs(diffX) > 3 || Math.abs(diffY) > 3) isScrolling = Math.abs(diffY) > Math.abs(diffX);
        }
        if (isScrolling) return; // kalau gulir atas bawah jangan geser slider horizontal

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

        // Mencegah tap tidak sengaja memunculkan popup kalau baru saja menggeser halaman
        if (globalIsDragging) {
            preventNextClick = true;
            setTimeout(() => preventNextClick = false, 300);
        }

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
    closeVersePopup();
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    document.getElementById('quran-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    closeAllSheets();
    localStorage.removeItem('quran_is_reading');
}

function openSettings() { document.getElementById('info-sheet').classList.add('expanded'); checkOverlay(); }
function closeAllSheets() { document.getElementById('info-sheet').classList.remove('expanded'); checkOverlay(); }
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

    document.querySelectorAll('.quran-page-content').forEach(container => { container.dataset.loaded = "false"; });

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

/* GoTo Popup Logic */
function openGoToPopup() {
    document.getElementById('goto-modal').classList.add('active');

    const currentSurahData = execQuery(`SELECT surah_number FROM verses WHERE page_number = ${currentPage} LIMIT 1`);
    if(currentSurahData.length > 0) {
        gotoData.surah = currentSurahData[0].surah_number;
    }

    populateGoToSurah();
    updateGoToAyahAndPage(gotoData.surah);
}

function closeGoToPopup() { document.getElementById('goto-modal').classList.remove('active'); }

function executeGoTo() {
    closeGoToPopup();
    openQuranPage(gotoData.page, gotoData.surah, gotoData.ayah, 'goto');
}

function populateGoToSurah() {
    const list = document.getElementById('goto-list-surah');
    const surahData = execQuery("SELECT id, name_latin, verses_count FROM surah ORDER BY id ASC");
    let html = '';
    surahData.forEach(s => {
        const activeClass = s.id === gotoData.surah ? 'active' : '';
        html += `<div class="goto-item ${activeClass}" onclick="selectGoToSurah(${s.id}, ${s.verses_count})">${s.id}. ${s.name_latin}</div>`;
    });
    list.innerHTML = html;
    scrollToActiveItem(list);
}

function selectGoToSurah(surahId, versesCount) {
    gotoData.surah = surahId;
    gotoData.totalAyahs = versesCount;
    gotoData.ayah = 1;
    populateGoToSurah();
    updateGoToAyahAndPage(surahId, 1);
}

function updateGoToAyahAndPage(surahId, ayahId = 1) {
    const sData = execQuery(`SELECT verses_count FROM surah WHERE id=${surahId}`);
    if(sData.length > 0) gotoData.totalAyahs = sData[0].verses_count;
    gotoData.ayah = ayahId;

    const listAyah = document.getElementById('goto-list-ayah');
    let ayahHtml = '';
    for(let i=1; i<=gotoData.totalAyahs; i++) {
        const activeClass = i === gotoData.ayah ? 'active' : '';
        ayahHtml += `<div class="goto-item ${activeClass}" onclick="selectGoToAyah(${i})">Ayat ${i}</div>`;
    }
    listAyah.innerHTML = ayahHtml;
    scrollToActiveItem(listAyah);
    updateGoToPageBySurahAyah();
}

function selectGoToAyah(ayahId) {
    gotoData.ayah = ayahId;
    updateGoToAyahAndPage(gotoData.surah, ayahId);
}

function updateGoToPageBySurahAyah() {
    const pData = execQuery(`SELECT page_number FROM verses WHERE surah_number=${gotoData.surah} AND verse_number=${gotoData.ayah}`);
    if(pData.length > 0) gotoData.page = pData[0].page_number;

    const listPage = document.getElementById('goto-list-page');
    let pageHtml = '';
    for(let i=1; i<=604; i++) {
        const activeClass = i === gotoData.page ? 'active' : '';
        pageHtml += `<div class="goto-item ${activeClass}" onclick="selectGoToPage(${i})">Hal ${i}</div>`;
    }
    listPage.innerHTML = pageHtml;
    scrollToActiveItem(listPage);
}

function selectGoToPage(pageId) {
    gotoData.page = pageId;
    const data = execQuery(`SELECT surah_number, verse_number FROM verses WHERE page_number=${pageId} LIMIT 1`);
    if(data.length > 0) {
        gotoData.surah = data[0].surah_number;
        gotoData.ayah = data[0].verse_number;
    }
    populateGoToSurah();
    updateGoToAyahAndPage(gotoData.surah, gotoData.ayah);
}

function scrollToActiveItem(listElement) {
    setTimeout(() => {
        const activeItem = listElement.querySelector('.active');
        if(activeItem) {
            listElement.scrollTo({
                top: activeItem.offsetTop - (listElement.offsetHeight / 2) + (activeItem.offsetHeight / 2),
                behavior: 'smooth'
            });
        }
    }, 10);
}

window.addEventListener('resize', () => {
    if (document.getElementById('quran-view').classList.contains('active')) {
        updateQuranUI();
    }
});

document.addEventListener('DOMContentLoaded', initApp);