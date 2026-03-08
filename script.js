let appSettings = {
    font: 'dkip',
    arabicSize: 1.85,
    wordByWord: false,
    showTransliteration: false,
    showTranslation: true,
    appLanguage: 'id',
    timestamp: 0
};

// =========================================
// KAMUS LOKALISASI (i18n Dictionary)
// =========================================
const i18n = {
    id: {
        tab_surah: "Surah",
        tab_juz: "Juz",
        tab_library: "Library",
        search_placeholder: "Cari Surah, Terjemahan...",
        loading_assets: "MEMUAT ASET FONT...",
        loading_db_engine: "MEMUAT MESIN DATABASE...",
        downloading_db: "MENGUNDUH DATA AL-QUR'AN...",
        loading_local_db: "MEMUAT DATABASE LOKAL...",
        db_failed: "GAGAL MEMUAT DATABASE",
        sync_google: "Sync Google",
        create_folder: "Buat Folder",
        last_read: "Terakhir Dibaca",
        folder: "Folder",
        all_bookmarks: "Semua Bookmark",
        empty_folder: "Folder ini kosong.",
        empty_library: "Library Anda masih kosong.",
        saved_ayah: "Ayat tersimpan",
        page: "Hal",
        ayah: "Ayat",
        juz: "Juz",
        no_translation: "Terjemahan tidak tersedia untuk ayat ini.",
        bookmark_added: "Bookmark berhasil ditambahkan",
        bookmark_removed: "Bookmark berhasil dihapus",
        folder_created: "Folder berhasil disimpan",
        folder_deleted: "Folder beserta isinya berhasil dihapus",
        bookmark_moved: "Bookmark dipindahkan",
        last_read_marked: "Ditandai sebagai Terakhir Dibaca",
        copied: "Ayat berhasil disalin",
        copy_failed: "Gagal menyalin",
        delete_bookmark_title: "Hapus Bookmark",
        delete_bookmark_msg: "Apakah Anda yakin ingin menghapus bookmark ini?",
        delete_folder_title: "Hapus Folder",
        delete_folder_msg: "Apakah Anda yakin ingin menghapus folder ini beserta seluruh bookmark di dalamnya?",
        cancel: "Batal",
        delete: "Hapus",
        save: "Simpan",
        goto: "Go To",
        close: "Tutup",
        move_bookmark_title: "Pindahkan Bookmark",
        create_folder_title: "Buat Folder Baru",
        edit_folder_title: "Edit Folder",
        folder_name_placeholder: "Nama Folder...",
        folder_color: "Warna",
        folder_icon: "Ikon",
        root_folder: "-- Tanpa Folder (Root) --",
        goto_title: "Pindah Halaman",
        edit_words_title: "Tampilkan/Sembunyikan Kata",
        edit_words_desc: "Ketuk kata untuk menyembunyikan atau menampilkannya.",
        surah_info_title: "Informasi Surah",
        not_available: "Informasi detail untuk surah ini belum tersedia.",
        data_not_found: "Data tidak ditemukan.",
        settings_title: "Pengaturan Membaca",
        mode_perkata: "Mode Perkata",
        transliteration: "Transliterasi (Latin)",
        show_translation: "Tampilkan Terjemahan",
        app_language: "Bahasa / Language",
        arabic_font_size: "Ukuran Font Arab",
        sync_not_ready: "Sistem Sinkronisasi belum siap. Coba sebentar lagi.",
        syncing: "Menyinkronkan Data...",
        auth_google: "Meminta akses ke Google...",
        sync_success: "Sinkronisasi Berhasil!",
        sync_failed: "Gagal melakukan sinkronisasi: ",
        connected: "Terhubung: ",
        last_sync: "Terakhir Sync: ",
        waiting_info: "Menunggu Info...",
        never_sync: "Belum pernah",
        just_now: "Baru saja",
        min_ago: "menit yang lalu",
        hour_ago: "jam yang lalu",
        day_ago: "hari yang lalu",
        month_ago: "bulan yang lalu",
        year_ago: "tahun yang lalu",
        history_title: "Riwayat Terakhir Dibaca",
        login_sync: "Login untuk Sync",
        logout_prompt_title: "Keluar Akun",
        logout_prompt_msg: "Apakah Anda yakin ingin memutuskan sinkronisasi Google Drive?",
        logout: "Keluar",
        import_success: "Data berhasil diimpor!",
        import_failed: "Format file impor tidak valid.",
        empty_folder_name: "Nama folder tidak boleh kosong!"
    },
    en: {
        tab_surah: "Surah",
        tab_juz: "Juz",
        tab_library: "Library",
        search_placeholder: "Search Surah, Translation...",
        loading_assets: "LOADING FONT ASSETS...",
        loading_db_engine: "LOADING DATABASE ENGINE...",
        downloading_db: "DOWNLOADING QURAN DATA...",
        loading_local_db: "LOADING LOCAL DATABASE...",
        db_failed: "FAILED TO LOAD DATABASE",
        sync_google: "Sync Google",
        create_folder: "New Folder",
        last_read: "Last Read",
        folder: "Folder",
        all_bookmarks: "All Bookmarks",
        empty_folder: "This folder is empty.",
        empty_library: "Your library is empty.",
        saved_ayah: "Saved ayahs",
        page: "Page",
        ayah: "Ayah",
        juz: "Juz",
        no_translation: "Translation is not available for this ayah.",
        bookmark_added: "Bookmark added successfully",
        bookmark_removed: "Bookmark removed successfully",
        folder_created: "Folder saved successfully",
        folder_deleted: "Folder and its contents deleted successfully",
        bookmark_moved: "Bookmark moved",
        last_read_marked: "Marked as Last Read",
        copied: "Ayah copied successfully",
        copy_failed: "Failed to copy",
        delete_bookmark_title: "Delete Bookmark",
        delete_bookmark_msg: "Are you sure you want to delete this bookmark?",
        delete_folder_title: "Delete Folder",
        delete_folder_msg: "Are you sure you want to delete this folder and all its bookmarks?",
        cancel: "Cancel",
        delete: "Delete",
        save: "Save",
        goto: "Go To",
        close: "Close",
        move_bookmark_title: "Move Bookmark",
        create_folder_title: "Create New Folder",
        edit_folder_title: "Edit Folder",
        folder_name_placeholder: "Folder Name...",
        folder_color: "Color",
        folder_icon: "Icon",
        root_folder: "-- No Folder (Root) --",
        goto_title: "Go To Page",
        edit_words_title: "Show/Hide Words",
        edit_words_desc: "Tap a word to hide or show it.",
        surah_info_title: "Surah Information",
        not_available: "Detailed information for this surah is not available yet.",
        data_not_found: "Data not found.",
        settings_title: "Reading Settings",
        mode_perkata: "Word by Word Mode",
        transliteration: "Transliteration",
        show_translation: "Show Translation",
        app_language: "Language / Bahasa",
        arabic_font_size: "Arabic Font Size",
        sync_not_ready: "Sync system is not ready. Please try again shortly.",
        syncing: "Syncing Data...",
        auth_google: "Requesting Google access...",
        sync_success: "Sync Successful!",
        sync_failed: "Sync failed: ",
        connected: "Connected: ",
        last_sync: "Last Sync: ",
        waiting_info: "Waiting for Info...",
        never_sync: "Never",
        just_now: "Just now",
        min_ago: "mins ago",
        hour_ago: "hours ago",
        day_ago: "days ago",
        month_ago: "months ago",
        year_ago: "years ago",
        history_title: "Last Read History",
        login_sync: "Login to Sync",
        logout_prompt_title: "Sign Out",
        logout_prompt_msg: "Are you sure you want to disconnect Google Drive synchronization?",
        logout: "Sign Out",
        import_success: "Data imported successfully!",
        import_failed: "Invalid import file format.",
        empty_folder_name: "Folder name cannot be empty!"
    }
};

function t(key) { return i18n[appSettings.appLanguage][key] || key; }

function applyUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
    updateToolboxUI();
}

function getTimeAgo(timestamp) {
    if (!timestamp) return '';
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return t('just_now');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${t('min_ago')}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${t('hour_ago')}`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ${t('day_ago')}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ${t('month_ago')}`;
    const years = Math.floor(days / 365);
    return `${years} ${t('year_ago')}`;
}

function formatTranslation(text) {
    if (!text) return "";
    let result = "";
    let depth = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '[') {
            depth++; let dClass = depth > 4 ? 4 : depth;
            result += `<span class="footnote fn-d${dClass}">[`;
        } else if (text[i] === ']') {
            result += `]</span>`; if (depth > 0) depth--;
        } else {
            result += text[i];
        }
    }
    while (depth > 0) { result += `</span>`; depth--; }
    return result;
}

function normalizeText(str) {
    if(!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['"‘`’\-]/g, "").toLowerCase();
}
// =========================================

let db = null; let currentPage = 1; let currentActiveTab = 0; let quranTrackInitialized = false;
let isDragging = false; let startX = 0; let startY = 0; let globalIsDragging = false; let preventNextClick = false;
let appBookmarks = []; let appFolders = []; let appLastRead = { items: [], timestamp: 0 };
let activeVerseData = null; let currentViewingFolderId = null; let bookmarkToMove = null; let confirmCallback = null;
let keepTranslationExpanded = false; let toastTimeout = null;
let gotoData = { surah: 1, ayah: 1, page: 1, totalAyahs: 7 };

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(error => console.log('ServiceWorker failed:', error));
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.innerHTML = `<div class="toast-inner">${message}</div>`;
    toast.classList.add('show');
    if(toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

function showConfirm(title, message, callback, dangerBtnText) {
    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-message').innerText = message;
    const primaryBtn = document.querySelector('#confirm-modal .btn-primary');
    if(primaryBtn) primaryBtn.innerText = dangerBtnText || t('delete');
    confirmCallback = callback;
    document.getElementById('confirm-modal').classList.add('active');
}

function closeConfirmModal() { document.getElementById('confirm-modal').classList.remove('active'); confirmCallback = null; }
function executeConfirmModal() { if (confirmCallback) confirmCallback(); closeConfirmModal(); }

function loadBookmarks() {
    try {
        appBookmarks = JSON.parse(localStorage.getItem('quran_bookmarks') || '[]');
        appFolders = JSON.parse(localStorage.getItem('quran_folders') || '[]');
        let savedLR = JSON.parse(localStorage.getItem('quran_last_read') || 'null');
        if (savedLR) {
            if (savedLR.items && Array.isArray(savedLR.items)) appLastRead = savedLR;
            else if (Array.isArray(savedLR)) appLastRead = { items: savedLR, timestamp: new Date().getTime() };
            else appLastRead = { items: [savedLR], timestamp: savedLR.timestamp || new Date().getTime() };
        } else appLastRead = { items: [], timestamp: 0 };
    } catch(e) { appBookmarks = []; appFolders = []; appLastRead = { items: [], timestamp: 0 }; }
}

function saveBookmarks() {
    localStorage.setItem('quran_bookmarks', JSON.stringify(appBookmarks));
    localStorage.setItem('quran_folders', JSON.stringify(appFolders));
    localStorage.setItem('quran_last_read', JSON.stringify(appLastRead));
}

function sortItemsArray(arr) {
    return arr.sort((a, b) => {
        const orderA = a.orderIndex !== undefined ? a.orderIndex : 999999;
        const orderB = b.orderIndex !== undefined ? b.orderIndex : 999999;
        if (orderA !== orderB) return orderA - orderB;
        return (b.timestamp || 0) - (a.timestamp || 0);
    });
}

function addBookmark() {
    if(!activeVerseData) return;
    appBookmarks.unshift({
        id: 'bm_' + new Date().getTime() + '_' + Math.floor(Math.random()*1000),
        surahId: activeVerseData.surahId, verseId: activeVerseData.verseId, pageNumber: activeVerseData.pageNumber,
        surahName: activeVerseData.surahName, folderId: currentViewingFolderId || null,
        orderIndex: -(new Date().getTime()), timestamp: new Date().getTime(), deleted: false, hiddenWords: []
    });
    saveBookmarks();
    if (currentViewingFolderId) {
        const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
        if (folder) openFolderView(folder.id, folder.name);
    } else renderBookmarkTab();

    showToast(t('bookmark_added')); closeVersePopup();
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
}

function promptRemoveBookmark(id) { showConfirm(t('delete_bookmark_title'), t('delete_bookmark_msg'), () => { removeBookmark(id); }); }

function removeBookmark(id) {
    const index = appBookmarks.findIndex(b => b.id === id);
    if (index > -1) { appBookmarks[index].deleted = true; appBookmarks[index].timestamp = new Date().getTime(); }
    saveBookmarks();
    if (currentViewingFolderId) {
        const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
        if (folder) openFolderView(folder.id, folder.name); else closeFolderView();
    } else renderBookmarkTab();
    showToast(t('bookmark_removed'));
}

function promptDeleteFolder(id) { showConfirm(t('delete_folder_title'), t('delete_folder_msg'), () => { deleteFolder(id); }); }

function deleteFolder(id) {
    const now = new Date().getTime();
    const index = appFolders.findIndex(f => f.id === id);
    if (index > -1) { appFolders[index].deleted = true; appFolders[index].timestamp = now; }
    appBookmarks.forEach(b => { if (b.folderId === id) { b.deleted = true; b.timestamp = now; } });
    saveBookmarks(); renderBookmarkTab(); showToast(t('folder_deleted'));
    if (localStorage.getItem('quran_gdrive_linked') === 'true' && checkAndRestoreToken()) performSync(true);
}

function setLastRead() {
    if(!activeVerseData) return;
    const newItem = { id: 'lr_' + new Date().getTime(), surahId: activeVerseData.surahId, verseId: activeVerseData.verseId, pageNumber: activeVerseData.pageNumber, surahName: activeVerseData.surahName, timestamp: new Date().getTime() };
    appLastRead.items = appLastRead.items.filter(item => !(item.surahId === newItem.surahId && item.verseId === newItem.verseId));
    appLastRead.items.unshift(newItem);
    if(appLastRead.items.length > 10) appLastRead.items.pop();
    appLastRead.timestamp = new Date().getTime();
    saveBookmarks(); renderBookmarkTab(); showToast(t('last_read_marked')); closeVersePopup();
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    if (localStorage.getItem('quran_gdrive_linked') === 'true' && checkAndRestoreToken()) performSync(true);
}

async function initApp() {
    loadSettings(); loadBookmarks(); initGoogleSync(); updateToolboxUI();
    const loaderText = document.getElementById('loader-text');
    const isDbDownloaded = localStorage.getItem('is_db_downloaded');

    try {
        if (loaderText) loaderText.innerText = t('loading_assets');
        try { await Promise.all([document.fonts.load("12px dkip"), document.fonts.load("12px juz"), document.fonts.load("12px short"), document.fonts.load("12px long")]); } catch (fontErr) {}
        if (loaderText) loaderText.innerText = t('loading_db_engine');
        const SQL = await initSqlJs({ locateFile: file => `${file}` });

        if (loaderText) {
            if (!isDbDownloaded) loaderText.innerText = t('downloading_db');
            else loaderText.innerText = t('loading_local_db');
        }
        const response = await fetch('quran.sqlite.gz');
        if (!response.ok) throw new Error("File quran.sqlite.gz tidak ditemukan.");
        const ds = new DecompressionStream('gzip');
        const decompressedStream = response.body.pipeThrough(ds);
        const buffer = await new Response(decompressedStream).arrayBuffer();
        db = new SQL.Database(new Uint8Array(buffer));
        if (!isDbDownloaded) localStorage.setItem('is_db_downloaded', 'true');

        renderSurahList(); renderBookmarkTab(); renderJuzList();
        setupSheetDrag('info-sheet', 'info-drag-area'); setupSwipeTabs();
        const isReading = localStorage.getItem('quran_is_reading');
        const lastPage = localStorage.getItem('quran_last_page');
        if (isReading === 'true' && lastPage) openQuranPage(parseInt(lastPage, 10));
    } catch (error) {
        console.error("Error App:", error); if (loaderText) loaderText.innerText = t('db_failed');
    } finally {
        setTimeout(() => { const loader = document.getElementById('global-loader'); if (loader) loader.classList.add('hidden'); }, 500);
    }
}

function execQuery(sqlQuery) {
    if (!db) return [];
    try {
        const result = db.exec(sqlQuery);
        if (result.length === 0) return [];
        const columns = result[0].columns; const rows = result[0].values;
        return rows.map(row => {
            let obj = {}; columns.forEach((col, index) => { obj[col] = row[index]; }); return obj;
        });
    } catch (e) { return []; }
}

function switchMainTab(index) {
    currentActiveTab = index;
    const indicator = document.getElementById('main-tab-indicator');
    if (indicator) indicator.style.transform = `translateX(${index * 100}%)`;
    document.querySelectorAll('.tab-pane').forEach((pane, idx) => { if (idx === index) pane.classList.add('active'); else pane.classList.remove('active'); });
    document.querySelectorAll('.quran-tab').forEach((btn, idx) => { if (idx === index) btn.classList.add('active'); else btn.classList.remove('active'); });
}

function setupSwipeTabs() {
    const swipeArea = document.getElementById('main-tab-swipe-area');
    if(!swipeArea) return;
    let touchStartX = 0; let touchStartY = 0;
    swipeArea.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; touchStartY = e.changedTouches[0].clientY; }, {passive: true});
    swipeArea.addEventListener('touchmove', e => {
        let diffX = e.changedTouches[0].clientX - touchStartX; let diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 5) if (e.cancelable) e.preventDefault();
    }, {passive: false});
    swipeArea.addEventListener('touchend', e => {
        let diffX = e.changedTouches[0].clientX - touchStartX; let diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX < 0 && currentActiveTab < 2) switchMainTab(currentActiveTab + 1);
            else if (diffX > 0 && currentActiveTab > 0) switchMainTab(currentActiveTab - 1);
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
        const surahSubtitle = appSettings.appLanguage === 'en' ? surah.name_latin : surah.name_id;
        html += `
            <div class="list-item surah-item" onclick="openQuranPage(${startPage})" 
                 data-id="${surah.id}" data-name="${surah.name_latin}" data-nameid="${surah.name_id || ''}" data-namear="${surah.name_ar}">
                <div class="item-number">${surah.id}</div>
                <div class="item-info">
                    <div class="item-title">${surah.name_latin}</div>
                    <div class="item-subtitle">${surahSubtitle}</div>
                </div>
                <div class="item-arabic">surah${String(surah.id).padStart(3, '0')}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function filterSurah() {
    const rawKeyword = document.getElementById('search-surah').value;
    const keyword = normalizeText(rawKeyword);
    const items = document.querySelectorAll('.surah-item');
    items.forEach(item => {
        const id = item.getAttribute('data-id');
        const name = normalizeText(item.getAttribute('data-name'));
        const nameid = normalizeText(item.getAttribute('data-nameid'));
        if (id.includes(rawKeyword) || name.includes(keyword) || nameid.includes(keyword)) item.style.display = 'flex';
        else item.style.display = 'none';
    });
}

/* =========================================
   CUSTOM DRAG AND DROP - OPTIMIZED (HARDWARE ACCELERATED & BATCHED DOM)
========================================= */
const iconProps = 'width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const svgGrip = `<svg ${iconProps}><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line></svg>`;
const svgFolder = `<svg ${iconProps}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
const svgEdit = `<svg ${iconProps}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
const svgTrash = `<svg ${iconProps}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
const svgHistory = `<svg ${iconProps}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;

let dndState = { el: null, clone: null, placeholder: null, startY: 0, startTop: 0, type: '', id: '', scrollContainer: null, autoScrollDir: 0, rafId: null, listContainer: null, targetFolderId: null, targetFolderEl: null };
let dragContext = null;

function cleanupDnd() {
    if (dndState.rafId) { cancelAnimationFrame(dndState.rafId); dndState.rafId = null; }
    document.querySelectorAll('.dragging-clone, .drag-placeholder').forEach(el => el.remove());
    document.querySelectorAll('.drag-over-folder').forEach(el => el.classList.remove('drag-over-folder'));
    if (dndState.el) dndState.el.style.display = '';
    dndState = { el: null, clone: null, placeholder: null, startY: 0, startTop: 0, type: '', id: '', scrollContainer: null, autoScrollDir: 0, rafId: null, listContainer: null, targetFolderId: null, targetFolderEl: null };
}

window.startDragItem = function(e, id, type) {
    if (e.type === 'mousedown' && e.button !== 0) return;
    e.stopPropagation();

    // OPTIMASI: Pastikan tidak ada event listeners yang menumpuk / duplicate
    cleanupDragEvents();
    if (dragContext && dragContext.active) return;
    cleanupDnd();

    const btn = e.currentTarget;
    const item = btn.closest('.list-item');
    const startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
    const startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

    dragContext = { e, id, type, item, startY, startX, timer: null, active: false };

    dragContext.timer = setTimeout(() => {
        if(!dragContext) return;
        dragContext.active = true;
        if (navigator.vibrate) navigator.vibrate(40);
        executeDragStart(dragContext);
    }, 250);

    document.addEventListener('mousemove', handleDragMoveInit, {passive: false});
    document.addEventListener('touchmove', handleDragMoveInit, {passive: false});
    document.addEventListener('mouseup', cancelDragInit);
    document.addEventListener('touchend', cancelDragInit);
    document.addEventListener('touchcancel', cancelDragInit);
    window.addEventListener('blur', cancelDragInit);
    document.addEventListener('visibilitychange', handleVisibilityChange);
};

function handleVisibilityChange() {
    if (document.hidden) cancelDragInit();
}

function handleDragMoveInit(e) {
    if (!dragContext) return;
    const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

    if (!dragContext.active) {
        if (Math.abs(currentY - dragContext.startY) > 8 || Math.abs(currentX - dragContext.startX) > 8) cancelDragInit();
    } else {
        e.preventDefault();
        onDragMove(currentY);
    }
}

function cancelDragInit() {
    if (dragContext && !dragContext.active) {
        clearTimeout(dragContext.timer); cleanupDragEvents(); dragContext = null;
    } else if (dragContext && dragContext.active) {
        onDragEnd(); // Force end drag gracefully
    } else {
        cleanupDnd(); // Fallback prevent ghost items
    }
}

function cleanupDragEvents() {
    document.removeEventListener('mousemove', handleDragMoveInit);
    document.removeEventListener('touchmove', handleDragMoveInit);
    document.removeEventListener('mouseup', cancelDragInit);
    document.removeEventListener('touchend', cancelDragInit);
    document.removeEventListener('touchcancel', cancelDragInit);
    window.removeEventListener('blur', cancelDragInit);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
}

function executeDragStart(ctx) {
    dndState.listContainer = ctx.item.parentElement;
    dndState.scrollContainer = document.querySelector('.tab-pane.active');
    dndState.type = ctx.type; dndState.id = ctx.id; dndState.el = ctx.item;

    const rect = ctx.item.getBoundingClientRect();
    dndState.startY = ctx.startY;
    dndState.startTop = rect.top;

    dndState.clone = ctx.item.cloneNode(true);
    dndState.clone.classList.add('dragging-clone');
    dndState.clone.style.width = rect.width + 'px';
    dndState.clone.style.height = rect.height + 'px';
    // OPTIMASI: Setup awal untuk GPU acceleration
    dndState.clone.style.top = rect.top + 'px';
    dndState.clone.style.left = rect.left + 'px';
    dndState.clone.style.margin = '0';
    dndState.clone.style.transform = 'translate3d(0px, 0px, 0px)';

    document.body.appendChild(dndState.clone);

    dndState.placeholder = document.createElement('div');
    dndState.placeholder.className = 'drag-placeholder';
    dndState.placeholder.style.height = rect.height + 'px';

    dndState.listContainer.insertBefore(dndState.placeholder, ctx.item);
    ctx.item.style.display = 'none';

    dndState.rafId = requestAnimationFrame(dragAutoScroll);
}

function onDragMove(currentY) {
    const deltaY = currentY - dndState.startY;
    // OPTIMASI: Menggunakan transform alih-alih merubah .top (Hardware Accelerated)
    dndState.clone.style.transform = `translate3d(0px, ${deltaY}px, 0px)`;

    const scrollRect = dndState.scrollContainer.getBoundingClientRect();
    if (currentY < scrollRect.top + 70) dndState.autoScrollDir = -1;
    else if (currentY > scrollRect.bottom - 70) dndState.autoScrollDir = 1;
    else dndState.autoScrollDir = 0;
}

function dragAutoScroll() {
    if (!dndState.clone || !dndState.listContainer) { cleanupDnd(); return; }

    if (dndState.autoScrollDir !== 0 && dndState.scrollContainer) {
        dndState.scrollContainer.scrollTop += dndState.autoScrollDir * 8;
    }

    const cloneRect = dndState.clone.getBoundingClientRect();
    const hitY = cloneRect.top + cloneRect.height / 2;
    let isHoveringFolder = false;

    // OPTIMASI: Mencegah Layout Thrashing (Pisahkan READ dan WRITE ke DOM)
    let folderRects = [];
    let itemRects = [];

    // FASE READ: Kumpulkan semua koordinat
    if (dndState.type === 'bookmark' && currentViewingFolderId === null) {
        const folders = Array.from(dndState.listContainer.querySelectorAll('.folder-item:not(.dragging-clone)'));
        for(let f of folders) {
            folderRects.push({ el: f, top: f.getBoundingClientRect().top, bottom: f.getBoundingClientRect().bottom });
        }
    }

    const items = Array.from(dndState.listContainer.querySelectorAll('.list-item:not(.dragging-clone)'));
    for(let i of items) {
        const rect = i.getBoundingClientRect();
        itemRects.push({ el: i, midpoint: rect.top + rect.height / 2 });
    }

    // FASE WRITE: Manipulasi DOM setelah pembacaan selesai
    for (let f of folderRects) {
        if (hitY >= f.top && hitY <= f.bottom) {
            isHoveringFolder = true;
            if (dndState.targetFolderEl !== f.el) {
                if (dndState.targetFolderEl) dndState.targetFolderEl.classList.remove('drag-over-folder');
                dndState.targetFolderEl = f.el; dndState.targetFolderId = f.el.dataset.id;
                f.el.classList.add('drag-over-folder'); dndState.placeholder.style.display = 'none';
            }
            break;
        }
    }

    if (!isHoveringFolder) {
        if (dndState.targetFolderEl) {
            dndState.targetFolderEl.classList.remove('drag-over-folder');
            dndState.targetFolderEl = null; dndState.targetFolderId = null;
            dndState.placeholder.style.display = 'block';
        }

        let targetItem = null;
        for (let i of itemRects) {
            if (hitY < i.midpoint) { targetItem = i.el; break; }
        }

        // Cegah DOM update yang redundan
        if (targetItem) {
            if (targetItem.previousElementSibling !== dndState.placeholder) {
                dndState.listContainer.insertBefore(dndState.placeholder, targetItem);
            }
        } else {
            if (dndState.listContainer.lastElementChild !== dndState.placeholder) {
                dndState.listContainer.appendChild(dndState.placeholder);
            }
        }
    }

    if(dndState.rafId) dndState.rafId = requestAnimationFrame(dragAutoScroll);
}

function onDragEnd() {
    cleanupDragEvents();
    dragContext = null;
    if (!dndState.clone || !dndState.listContainer) { cleanupDnd(); return; }

    if (dndState.targetFolderId && dndState.type === 'bookmark') {
        const bm = appBookmarks.find(b => b.id === dndState.id);
        if (bm) {
            bm.folderId = dndState.targetFolderId; bm.timestamp = new Date().getTime();
            saveBookmarks();
            const folderName = appFolders.find(f => f.id === dndState.targetFolderId)?.name || '';
            showToast(`${t('bookmark_moved')} 📁 ${folderName}`);
        }
        cleanupDnd(); renderBookmarkTab();
    } else {
        dndState.listContainer.insertBefore(dndState.el, dndState.placeholder);
        const elements = Array.from(dndState.listContainer.querySelectorAll('.list-item'));
        elements.forEach((el, index) => {
            const id = el.dataset.id;
            if (id) {
                let item = appFolders.find(f => f.id === id) || appBookmarks.find(b => b.id === id);
                if(item && item.orderIndex !== index) { item.orderIndex = index; item.timestamp = new Date().getTime(); }
            }
        });
        cleanupDnd(); saveBookmarks();

        if (currentViewingFolderId) {
            const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
            if (folder) openFolderView(folder.id, folder.name);
        } else renderBookmarkTab();
    }
    if (localStorage.getItem('quran_gdrive_linked') === 'true' && checkAndRestoreToken()) performSync(true);
}
// =========================================

const folderColors = ['#0D9488', '#E11D48', '#D97706', '#16A34A', '#2563EB', '#9333EA'];
const folderIcons = {
    'folder': `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>`,
    'heart': `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`,
    'star': `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`,
    'bookmark': `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>`,
    'book': `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`
};

function getFolderSvg(iconKey) {
    let path = folderIcons[iconKey] || folderIcons['folder'];
    return `<svg ${iconProps}>${path}</svg>`;
}

function renderBookmarkTab() {
    const lastReadContainer = document.getElementById('last-read-container');
    const titleLastRead = document.getElementById('title-last-read');

    if (appLastRead && appLastRead.items && appLastRead.items.length > 0) {
        if (titleLastRead) titleLastRead.style.display = 'block';
        let latest = appLastRead.items[0];
        lastReadContainer.innerHTML = `
            <div class="list-item" style="border-left: 4px solid var(--primary);" onclick="openQuranPage(${latest.pageNumber}, ${latest.surahId}, ${latest.verseId}, 'lastread')">
                <div class="item-number" style="background:var(--primary-light); color:var(--primary);">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <div class="item-info">
                    <div class="item-title">${latest.surahName}</div>
                    <div class="item-subtitle">${t('ayah')} ${latest.verseId} • ${t('page')} ${latest.pageNumber} <br> <span style="font-size:0.55rem; color:var(--primary); font-weight:600;">${getTimeAgo(latest.timestamp)}</span></div>
                </div>
                <div class="action-group">
                    <button class="action-btn" onclick="event.stopPropagation(); openLastReadHistory()">${svgHistory}</button>
                </div>
            </div>
        `;
    } else if (lastReadContainer) {
        if (titleLastRead) titleLastRead.style.display = 'none';
        lastReadContainer.innerHTML = '';
    }

    const folderList = document.getElementById('folder-list');
    const bookmarkList = document.getElementById('bookmark-list');
    const titleSemua = document.getElementById('title-semua-bookmark');

    if(!folderList || !bookmarkList) return;

    let folderHtml = '';
    const visibleFolders = sortItemsArray(appFolders.filter(f => !f.deleted));

    visibleFolders.forEach(folder => {
        const count = appBookmarks.filter(b => b.folderId === folder.id && !b.deleted).length;
        const color = folder.color || '#0D9488';
        const iconSvg = getFolderSvg(folder.icon);

        folderHtml += `
            <div class="list-item folder-item" data-id="${folder.id}" onclick="openFolderView('${folder.id}', '${folder.name}')">
                <div class="item-number" style="background:${color}; color:white;">${iconSvg}</div>
                <div class="item-info">
                    <div class="item-title">${folder.name}</div>
                    <div class="item-subtitle">${count} ${t('saved_ayah')}</div>
                </div>
                <div class="action-group">
                    <button class="action-btn drag-handle" onmousedown="startDragItem(event, '${folder.id}', 'folder')" ontouchstart="startDragItem(event, '${folder.id}', 'folder')">${svgGrip}</button>
                    <button class="action-btn" onclick="event.stopPropagation(); openFolderModal('${folder.id}')" style="color:var(--primary);">${svgEdit}</button>
                    <button class="action-btn danger" onclick="event.stopPropagation(); promptDeleteFolder('${folder.id}')">${svgTrash}</button>
                </div>
            </div>
        `;
    });
    folderList.innerHTML = folderHtml;

    const rootBookmarks = sortItemsArray(appBookmarks.filter(b => !b.folderId && !b.deleted));

    if(rootBookmarks.length > 0) {
        if (titleSemua) titleSemua.style.display = 'block';
    } else {
        if (titleSemua) titleSemua.style.display = 'none';
        if (visibleFolders.length === 0 && (!appLastRead || appLastRead.items.length === 0)) {
            bookmarkList.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted); font-size: 0.75rem;">${t('empty_library')}</div>`;
            return;
        } else {
            bookmarkList.innerHTML = '';
        }
    }

    let bHtml = '';
    rootBookmarks.forEach(bm => {
        bHtml += `
            <div class="list-item" data-id="${bm.id}" onclick="openQuranPage(${bm.pageNumber}, ${bm.surahId}, ${bm.verseId}, 'bookmark')">
                <div class="item-number" style="font-size: 0.65rem;">${t('page')}<br>${bm.pageNumber}</div>
                <div class="item-info">
                    <div class="item-title">${bm.surahName}</div>
                    <div class="item-subtitle">${t('ayah')} ${bm.verseId}</div>
                </div>
                <div class="action-group">
                    <button class="action-btn drag-handle" onmousedown="startDragItem(event, '${bm.id}', 'bookmark')" ontouchstart="startDragItem(event, '${bm.id}', 'bookmark')">${svgGrip}</button>
                    <button class="action-btn" onclick="event.stopPropagation(); openMoveModal('${bm.id}')">${getFolderSvg('folder')}</button>
                    <button class="action-btn danger" onclick="event.stopPropagation(); promptRemoveBookmark('${bm.id}')">${svgTrash}</button>
                </div>
            </div>
        `;
    });
    bookmarkList.innerHTML = bHtml;
}

function openLastReadHistory() {
    const list = document.getElementById('last-read-history-list');
    if(!list) return;
    let html = '';
    if(appLastRead && appLastRead.items) {
        appLastRead.items.forEach(lr => {
            html += `
                <div class="list-item" style="border-left: 3px solid var(--primary);" onclick="closeLastReadHistory(); openQuranPage(${lr.pageNumber}, ${lr.surahId}, ${lr.verseId}, 'lastread')">
                    <div class="item-info">
                        <div class="item-title">${lr.surahName} : ${lr.verseId}</div>
                        <div class="item-subtitle">${t('page')} ${lr.pageNumber}</div>
                    </div>
                    <div style="font-size:0.6rem; color:var(--text-muted); text-align:right;">${getTimeAgo(lr.timestamp)}</div>
                </div>
            `;
        });
    }
    list.innerHTML = html;
    document.getElementById('last-read-history-modal').classList.add('active');
}

function closeLastReadHistory() { document.getElementById('last-read-history-modal').classList.remove('active'); }

let editingFolderId = null; let tempFolderColor = '#0D9488'; let tempFolderIcon = 'folder';

function openFolderModal(folderId = null) {
    editingFolderId = folderId;
    const modalTitle = document.getElementById('folder-modal-title');
    const inputName = document.getElementById('input-folder-name');

    if (folderId) {
        const folder = appFolders.find(f => f.id === folderId);
        if (folder) {
            modalTitle.innerText = t('edit_folder_title'); inputName.value = folder.name;
            tempFolderColor = folder.color || '#0D9488'; tempFolderIcon = folder.icon || 'folder';
        }
    } else {
        modalTitle.innerText = t('create_folder_title'); inputName.value = '';
        tempFolderColor = '#0D9488'; tempFolderIcon = 'folder';
    }

    renderFolderCustomizers();
    document.getElementById('folder-modal').classList.add('active');
    inputName.focus();
}

function renderFolderCustomizers() {
    const colorPicker = document.getElementById('folder-color-picker');
    const iconPicker = document.getElementById('folder-icon-picker');
    let cHtml = '';
    folderColors.forEach(c => {
        let active = c === tempFolderColor ? 'active' : '';
        cHtml += `<div class="color-circle ${active}" style="background-color:${c};" onclick="selectFolderColor('${c}')"></div>`;
    });
    colorPicker.innerHTML = cHtml;
    let iHtml = '';
    for (const [key, path] of Object.entries(folderIcons)) {
        let active = key === tempFolderIcon ? 'active' : '';
        iHtml += `<div class="icon-box ${active}" onclick="selectFolderIcon('${key}')"><svg ${iconProps}>${path}</svg></div>`;
    }
    iconPicker.innerHTML = iHtml;
}

function selectFolderColor(c) { tempFolderColor = c; renderFolderCustomizers(); }
function selectFolderIcon(i) { tempFolderIcon = i; renderFolderCustomizers(); }
function closeFolderModal() { document.getElementById('folder-modal').classList.remove('active'); editingFolderId = null; }

function saveFolder() {
    const name = document.getElementById('input-folder-name').value.trim();
    if(!name) { showToast(t('empty_folder_name')); return; }

    if (editingFolderId) {
        const index = appFolders.findIndex(f => f.id === editingFolderId);
        if(index > -1) {
            appFolders[index].name = name; appFolders[index].color = tempFolderColor;
            appFolders[index].icon = tempFolderIcon; appFolders[index].timestamp = new Date().getTime();
        }
    } else {
        appFolders.unshift({
            id: 'f_' + new Date().getTime(), name: name, color: tempFolderColor, icon: tempFolderIcon,
            orderIndex: -(new Date().getTime()), timestamp: new Date().getTime(), deleted: false
        });
    }
    saveBookmarks();
    if (currentViewingFolderId) {
        const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
        if (folder) openFolderView(folder.id, folder.name); else closeFolderView();
    } else renderBookmarkTab();

    closeFolderModal(); showToast(t('folder_created'));
}

function openMoveModal(bookmarkId) {
    bookmarkToMove = appBookmarks.find(b => b.id === bookmarkId);
    if(!bookmarkToMove) return;
    const list = document.getElementById('move-folder-list');
    let html = `<div class="move-folder-item" onclick="executeMoveBookmark(null)" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display:block;">${t('root_folder')}</div>`;

    appFolders.filter(f => !f.deleted).forEach(f => {
        let iconSvg = getFolderSvg(f.icon);
        html += `<div class="move-folder-item" onclick="executeMoveBookmark('${f.id}')" style="display:flex; gap:8px; align-items:center; box-sizing:border-box;">
                    <span style="color:${f.color || '#0D9488'}; display:flex; align-items:center; flex-shrink: 0;">${iconSvg}</span>
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0;">${f.name}</span>
                </div>`;
    });
    list.innerHTML = html; document.getElementById('folder-move-modal').classList.add('active');
}

function closeMoveModal() { document.getElementById('folder-move-modal').classList.remove('active'); bookmarkToMove = null; }

function executeMoveBookmark(folderId) {
    if(bookmarkToMove) {
        bookmarkToMove.folderId = folderId; bookmarkToMove.orderIndex = -(new Date().getTime()); bookmarkToMove.timestamp = new Date().getTime();
        saveBookmarks();
        if (currentViewingFolderId) {
            const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
            if (folder) openFolderView(folder.id, folder.name); else closeFolderView();
        } else renderBookmarkTab();
        showToast(t('bookmark_moved'));
    }
    closeMoveModal();
}

function openFolderView(folderId, folderName) {
    currentViewingFolderId = folderId;
    document.getElementById('bookmark-root-view').style.display = 'none';
    document.getElementById('bookmark-folder-view').style.display = 'block';
    document.getElementById('current-folder-name').innerText = folderName;

    const container = document.getElementById('folder-content-list');
    const folderBookmarks = sortItemsArray(appBookmarks.filter(b => b.folderId === folderId && !b.deleted));

    if(folderBookmarks.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted); font-size: 0.75rem;">${t('empty_folder')}</div>`;
        return;
    }

    let html = '';
    folderBookmarks.forEach(bm => {
        let arabicWordsHtml = ""; let hiddenWords = bm.hiddenWords || [];
        if(db) {
            const verseData = execQuery(`SELECT arabic_text, arabic_words FROM verses WHERE surah_number=${bm.surahId} AND verse_number=${bm.verseId}`);
            if(verseData.length > 0) {
                let words = [];
                try { words = JSON.parse(verseData[0].arabic_words || "[]"); } catch(e) {}
                if(words.length === 0) words = verseData[0].arabic_text.split(' ');
                arabicWordsHtml = words.map((w, index) => {
                    const isHidden = hiddenWords.includes(index) ? 'hidden' : '';
                    return `<span class="folder-word ${isHidden}">${w}</span>`;
                }).join('');
            }
        }

        html += `
            <div class="list-item" data-id="${bm.id}" style="flex-direction:column; align-items:flex-start; gap:10px; padding: 12px;" onclick="openQuranPage(${bm.pageNumber}, ${bm.surahId}, ${bm.verseId}, 'bookmark')">
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <div style="font-weight:700; color:var(--primary); font-size:0.8rem;">${bm.surahName} : ${bm.verseId}</div>
                    <div class="action-group">
                        <button class="action-btn drag-handle" onmousedown="startDragItem(event, '${bm.id}', 'bookmark')" ontouchstart="startDragItem(event, '${bm.id}', 'bookmark')">${svgGrip}</button>
                        <button class="action-btn" onclick="event.stopPropagation(); openMoveModal('${bm.id}')">${getFolderSvg('folder')}</button>
                        <button class="action-btn" onclick="event.stopPropagation(); openEditWordsModal('${bm.id}')" style="color:var(--primary);">${svgEdit}</button>
                        <button class="action-btn danger" onclick="event.stopPropagation(); promptRemoveBookmark('${bm.id}')">${svgTrash}</button>
                    </div>
                </div>
                <div class="folder-bookmark-arabic">${arabicWordsHtml}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

let editingBookmarkId = null; let tempHiddenWords = [];

function openEditWordsModal(bookmarkId) {
    editingBookmarkId = bookmarkId;
    const bm = appBookmarks.find(b => b.id === bookmarkId);
    if (!bm) return;
    tempHiddenWords = [...(bm.hiddenWords || [])];
    let words = [];
    if(db) {
        const verseData = execQuery(`SELECT arabic_text, arabic_words FROM verses WHERE surah_number=${bm.surahId} AND verse_number=${bm.verseId}`);
        if(verseData.length > 0) {
            try { words = JSON.parse(verseData[0].arabic_words || "[]"); } catch(e) {}
            if (words.length === 0) words = verseData[0].arabic_text.split(' ');
        }
    }
    const container = document.getElementById('edit-words-container');
    container.innerHTML = words.map((w, index) => {
        const isHidden = tempHiddenWords.includes(index);
        return `<div class="edit-word-chip ${isHidden ? 'hidden' : ''}" onclick="toggleWordHidden(${index}, this)">${w}</div>`;
    }).join('');
    document.getElementById('edit-words-modal').classList.add('active');
}

function toggleWordHidden(index, element) {
    const pos = tempHiddenWords.indexOf(index);
    if (pos > -1) { tempHiddenWords.splice(pos, 1); element.classList.remove('hidden'); }
    else { tempHiddenWords.push(index); element.classList.add('hidden'); }
}

function closeEditWordsModal() { document.getElementById('edit-words-modal').classList.remove('active'); editingBookmarkId = null; }

function saveEditWords() {
    if (editingBookmarkId) {
        const bmIndex = appBookmarks.findIndex(b => b.id === editingBookmarkId);
        if (bmIndex > -1) {
            appBookmarks[bmIndex].hiddenWords = [...tempHiddenWords];
            appBookmarks[bmIndex].timestamp = new Date().getTime();
            saveBookmarks();
            if (currentViewingFolderId) {
                const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
                if (folder) openFolderView(folder.id, folder.name);
            }
        }
    }
    closeEditWordsModal();
}

function closeFolderView() {
    currentViewingFolderId = null;
    document.getElementById('bookmark-root-view').style.display = 'block';
    document.getElementById('bookmark-folder-view').style.display = 'none';
    renderBookmarkTab();
}

function renderJuzList() {
    const container = document.getElementById('juz-list');
    if (!container) return;
    let html = '';
    for (let i = 1; i <= 30; i++) {
        const juzQuery = execQuery(`
            SELECT v.page_number, v.surah_number, v.verse_number, s.name_latin
            FROM verses v LEFT JOIN surah s ON v.surah_number = s.id WHERE v.juz_number = ${i} ORDER BY v.id ASC LIMIT 1
        `);
        let startPage = 1, surahName = "", verseNumber = 1;
        if (juzQuery.length > 0) {
            startPage = juzQuery[0].page_number; surahName = juzQuery[0].name_latin; verseNumber = juzQuery[0].verse_number;
        }
        let paddedJuz = String(i).padStart(3, '0');
        html += `
            <div class="list-item" onclick="openQuranPage(${startPage})">
                <div class="item-number">${t('juz')}<br>${i}</div>
                <div class="item-info">
                    <div class="juz-title item-title">juz${paddedJuz}</div>
                    <div class="item-subtitle">${surahName} • ${t('ayah')} ${verseNumber}</div>
                </div>
                <div class="first_ayah">j${paddedJuz}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function initQuranTrack() {
    if (quranTrackInitialized) return;
    const track = document.getElementById('quran-slider-track');
    if (!track) return;
    track.innerHTML = '';
    for(let i = 1; i <= 604; i++) {
        let card = document.createElement('div'); card.className = 'slide-card'; card.id = `quran-page-${i}`;
        card.innerHTML = `<div class="quran-page-content arabic" dir="rtl"></div>`; track.appendChild(card);
    }
    quranTrackInitialized = true; setupQuranTouchEvents();
}

function applyTranslationState() {
    const popup = document.getElementById('verse-popup');
    const translateBtn = document.getElementById('vp-btn-translate');
    const transContainer = document.getElementById('vp-translation-text');
    if (keepTranslationExpanded && activeVerseData) {
        let text = activeVerseData.translationText.replace(/&quot;/g, '"').replace(/\\'/g, "'");
        transContainer.innerHTML = formatTranslation(text) || t('no_translation');
        popup.classList.add('expanded'); if(translateBtn) translateBtn.classList.add('active-btn');
    } else {
        popup.classList.remove('expanded'); if(translateBtn) translateBtn.classList.remove('active-btn');
        setTimeout(() => { if(!popup.classList.contains('expanded')) transContainer.innerHTML = ""; }, 400);
    }
}

function handleVerseClick(surahId, verseId, pageNumber, surahName, arabicText, translationText, element) {
    if (preventNextClick) return;
    const popup = document.getElementById('verse-popup');
    const isPopupActive = popup.classList.contains('active');

    if(element.classList.contains('highlighted') && window._currentClickAction == null) {
        if (!isPopupActive) {
            activeVerseData = { surahId, verseId, pageNumber, surahName, arabicText, translationText };
            document.getElementById('vp-title').innerText = surahName;
            document.getElementById('vp-subtitle').innerText = `${t('ayah')} ${verseId}`;
            applyTranslationState(); popup.classList.add('active'); return;
        } else {
            element.classList.remove('highlighted'); closeVersePopup(); return;
        }
    }

    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    element.classList.add('highlighted');
    activeVerseData = { surahId, verseId, pageNumber, surahName, arabicText, translationText };

    if (window._currentClickAction === 'bookmark' || window._currentClickAction === 'lastread') closeVersePopup();
    else {
        document.getElementById('vp-title').innerText = surahName; document.getElementById('vp-subtitle').innerText = `${t('ayah')} ${verseId}`;
        applyTranslationState(); popup.classList.add('active');
    }
}

function copyVerseText() {
    if(!activeVerseData) return;
    const textToCopy = `${activeVerseData.arabicText}\n\n"${activeVerseData.translationText}"\n(QS. ${activeVerseData.surahName} : ${activeVerseData.verseId})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(t('copied')); closeVersePopup();
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    }).catch(err => console.error('Gagal menyalin:', err));
}

function togglePopupTranslation() {
    if(!activeVerseData) return;
    keepTranslationExpanded = !keepTranslationExpanded; applyTranslationState();
}

function closeVersePopup() {
    const popup = document.getElementById('verse-popup');
    if(popup) {
        popup.classList.remove('active'); popup.classList.remove('expanded');
        document.getElementById('vp-btn-translate').classList.remove('active-btn'); keepTranslationExpanded = false;
        setTimeout(() => { if(!popup.classList.contains('expanded')) document.getElementById('vp-translation-text').innerHTML = ""; }, 400);
    }
    activeVerseData = null;
}

function openSurahInfoModal(surahId) {
    if (preventNextClick) return;
    const data = execQuery(`SELECT * FROM surah WHERE id=${surahId}`);
    if(data.length > 0) {
        const s = data[0];
        const subName = appSettings.appLanguage === 'en' ? s.name_latin : s.name_id;
        document.getElementById('surah-info-title').innerText = `${s.name_latin} (${subName})`;
        let descRaw = appSettings.appLanguage === 'en' && s.long_desc_en ? s.long_desc_en : s.long_desc;
        document.getElementById('surah-info-content').innerHTML = descRaw ? descRaw.replace(/\n/g, '<br><br>') : t('not_available');
        document.getElementById('surah-info-modal').classList.add('active');
    }
}

function closeSurahInfoModal() { document.getElementById('surah-info-modal').classList.remove('active'); }

function renderPageContent(pageNumber, forceRender = false) {
    if (pageNumber < 1 || pageNumber > 604 || !db) return;
    const container = document.querySelector(`#quran-page-${pageNumber} .quran-page-content`);
    if (!container) return;
    if (container.dataset.loaded === "true" && !forceRender) return;

    const verses = execQuery(`SELECT v.*, s.name_ar, s.name_latin, s.name_id, s.location, s.verses_count FROM verses v LEFT JOIN surah s ON v.surah_number = s.id WHERE v.page_number = ${pageNumber} ORDER BY v.surah_number, v.verse_number`);

    if (verses.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px; color: var(--text-muted); font-size: 0.8rem;">${t('data_not_found')}</div>`; return;
    }

    const isMushafMode = !appSettings.wordByWord && !appSettings.showTransliteration && !appSettings.showTranslation;
    if (isMushafMode) { container.classList.remove('list-mode'); container.classList.add('mushaf-mode'); }
    else { container.classList.remove('mushaf-mode'); container.classList.add('list-mode'); }

    let html = '';
    verses.forEach(v => {
        if (v.verse_number === 1) {
            const surahSubName = appSettings.appLanguage === 'en' ? v.name_latin : v.name_id;
            html += `
                <div class="surah-header-separator" onclick="openSurahInfoModal(${v.surah_number})">
                    <div class="surah-col-left">${v.verses_count}<br>${t('ayah')}</div>
                    <div class="surah-col-center">                       
                        <div class="surah-name-ar">surah${String(v.surah_number).padStart(3, '0')}</div>
                        <div class="surah-name-latin">${v.name_latin}</div>
                        <div class="surah-name-translation">${surahSubName}</div>
                    </div>
                    <div class="surah-col-right">${v.location}</div>
                </div>
            `;
        }

        let fullArabicText = v.arabic_text || ''; let textForCopy = fullArabicText;
        try { let arWords = JSON.parse(v.arabic_words || "[]"); if (arWords.length > 0) textForCopy = arWords.slice(0, -1).join(' '); } catch (e) {}

        if (v.surah_number !== 1 && v.surah_number !== 9 && v.verse_number === 1) {
            const bismillahs = ["بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ", "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"];
            bismillahs.forEach(b => {
                if (fullArabicText.startsWith(b)) fullArabicText = fullArabicText.replace(b, "").trim();
                if (textForCopy.startsWith(b)) textForCopy = textForCopy.replace(b, "").trim();
            });
            html += `<div class="bismillah-header">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>`;
        }

        const safeSurahName = v.name_latin.replace(/'/g, "\\'");
        const cleanArabicForCopy = textForCopy.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const selectedTranslationText = appSettings.appLanguage === 'en' ? v.translation_en : v.translation_id;
        const cleanTranslationForCopy = (selectedTranslationText || '').replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const verseElId = `verse-wrap-${v.surah_number}-${v.verse_number}`;

        if (isMushafMode) {
            html += `<span id="${verseElId}" class="verse-mushaf-wrap" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', '${cleanArabicForCopy}', '${cleanTranslationForCopy}', this)"><span class="verse-word">${fullArabicText}</span></span> `;
        } else {
            html += `<div id="${verseElId}" class="verse-container" onclick="handleVerseClick(${v.surah_number}, ${v.verse_number}, ${pageNumber}, '${safeSurahName}', '${cleanArabicForCopy}', '${cleanTranslationForCopy}', this)">`;
            if (appSettings.wordByWord) {
                html += `<div class="wbw-container">`;
                let arWords = [], trWords = [], tlWords = [];
                try {
                    arWords = JSON.parse(v.arabic_words || "[]"); trWords = JSON.parse(v.transliteration_words || "[]");
                    if (appSettings.showTranslation) tlWords = appSettings.appLanguage === 'en' ? JSON.parse(v.translation_en_words || "[]") : JSON.parse(v.translation_id_words || "[]");
                } catch (e) {}
                if (arWords.length > 0) {
                    for (let i = 0; i < arWords.length; i++) {
                        html += `<div class="word-group"><div class="word-arabic">${arWords[i] || ''}</div>`;
                        if (appSettings.showTransliteration && trWords[i]) html += `<div class="word-transliteration">${trWords[i]}</div>`;
                        if (appSettings.showTranslation && tlWords[i]) html += `<div class="word-translation">${formatTranslation(tlWords[i])}</div>`;
                        html += `</div>`;
                    }
                } else html += `<div class="word-group"><div class="word-arabic">${fullArabicText}</div></div>`;
                html += `</div>`;
            } else {
                html += `<div class="verse-text-group"><span class="verse-word">${fullArabicText}</span></div>`;
                if (appSettings.showTransliteration) html += `<div class="verse-transliteration">${v.transliteration || ''}</div>`;
                if (appSettings.showTranslation) html += `<div class="verse-translation">${formatTranslation(selectedTranslationText || '')}</div>`;
            }
            html += `</div>`;
        }
    });

    container.innerHTML = html; container.dataset.loaded = "true";
}

function openQuranPage(pageNumber, highlightSurah = null, highlightVerse = null, actionType = null) {
    currentPage = pageNumber; localStorage.setItem('quran_last_page', pageNumber); localStorage.setItem('quran_is_reading', 'true');
    document.getElementById('quran-view').classList.add('active'); document.getElementById('home-view').classList.remove('active');
    if (!quranTrackInitialized) initQuranTrack();
    renderPageContent(currentPage); document.getElementById('quran-slider-track').style.transition = 'none'; updateQuranUI();
    const activeCard = document.getElementById(`quran-page-${currentPage}`); if (activeCard) activeCard.scrollTo({ top: 0 });

    setTimeout(() => {
        document.getElementById('quran-slider-track').style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        renderPageContent(currentPage - 1); renderPageContent(currentPage + 1);
        if (highlightSurah && highlightVerse) {
            const targetEl = document.getElementById(`verse-wrap-${highlightSurah}-${highlightVerse}`);
            if (targetEl) { targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (!targetEl.classList.contains('highlighted')) { window._currentClickAction = actionType; targetEl.click(); window._currentClickAction = null; } }
        }
    }, 150);
}

function updateQuranUI() {
    let headerText = `${t('page')} ${currentPage}`; let headerParts = [];
    const pageVerses = execQuery(`SELECT surah_number, verse_number, juz_number FROM verses WHERE page_number = ${currentPage}`);
    if (pageVerses.length > 0) {
        const surahGroups = {}; const juzSet = new Set();
        pageVerses.forEach(v => {
            if (!surahGroups[v.surah_number]) surahGroups[v.surah_number] = [];
            surahGroups[v.surah_number].push(v.verse_number); if (v.juz_number) juzSet.add(v.juz_number);
        });
        for (const surahId in surahGroups) {
            const versesInSurah = surahGroups[surahId];
            const minVerse = Math.min(...versesInSurah); const maxVerse = Math.max(...versesInSurah);
            const surahInfo = execQuery(`SELECT name_latin FROM surah WHERE id = ${surahId}`);
            const surahName = surahInfo.length > 0 ? surahInfo[0].name_latin : `Surah ${surahId}`;
            if (minVerse === maxVerse) headerParts.push(`${surahId}. ${surahName}: ${minVerse}`);
            else headerParts.push(`${surahId}. ${surahName}: ${minVerse}-${maxVerse}`);
        }
        const surahString = headerParts.join(' | '); const juzString = Array.from(juzSet).join('-');
        headerText = `<span style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.65rem;">${surahString}</span><span style="display: block; font-size: 0.65rem; font-weight: 600; color: var(--text-muted); margin-top: 2px;">${juzString ? t('juz') + ' ' + juzString : ''}</span>`;
    }
    document.getElementById('quran-header-title').innerHTML = headerText;
    document.getElementById('page-info-pill').innerText = `${t('page')} ${currentPage}`;
    document.getElementById('btn-prev-page').disabled = (currentPage <= 1);
    document.getElementById('btn-next-page').disabled = (currentPage >= 604);

    const track = document.getElementById('quran-slider-track');
    if (track) track.style.transform = `translate3d(${(currentPage - 1) * 100}%, 0, 0)`;

    document.querySelectorAll('#quran-slider-track .slide-card').forEach((card, index) => {
        if (index === currentPage - 1) card.classList.add('active-slide'); else card.classList.remove('active-slide');
    });
}

function changePage(delta) {
    let newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= 604) {
        closeVersePopup(); document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
        currentPage = newPage; localStorage.setItem('quran_last_page', currentPage);
        renderPageContent(currentPage);
        const track = document.getElementById('quran-slider-track');
        if (track) track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        updateQuranUI();
        const activeCard = document.getElementById(`quran-page-${currentPage}`);
        if (activeCard) activeCard.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { renderPageContent(currentPage - 1); renderPageContent(currentPage + 1); }, 400);
    }
}

function setupQuranTouchEvents() {
    const viewport = document.getElementById('quran-slider-viewport'); if (!viewport) return;
    let isScrolling = null, ignoreMouseSwipe = false;

    const onStart = (e) => {
        if (e.type === 'touchstart') ignoreMouseSwipe = true; if (e.type === 'mousedown' && ignoreMouseSwipe) return;
        isDragging = true; isScrolling = null; globalIsDragging = false;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX; startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        const track = document.getElementById('quran-slider-track'); if (track) track.style.transition = 'none';
    };

    const onMove = (e) => {
        if (e.type === 'mousemove' && ignoreMouseSwipe) return; if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX; const currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
        const diffX = currentX - startX, diffY = currentY - startY;

        if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
            if (!globalIsDragging) { globalIsDragging = true; closeVersePopup(); document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted')); }
        }

        if (isScrolling === null) { if (Math.abs(diffX) > 3 || Math.abs(diffY) > 3) isScrolling = Math.abs(diffY) > Math.abs(diffX); }
        if (isScrolling) return;

        if (e.cancelable) e.preventDefault();
        const percentMove = (diffX / viewport.offsetWidth) * 100;
        const currentTranslate = (currentPage - 1) * 100 + percentMove;
        const track = document.getElementById('quran-slider-track');
        if (track) track.style.transform = `translate3d(${currentTranslate}%, 0, 0)`;
    };

    const onEnd = (e) => {
        if (e.type === 'mouseup' && ignoreMouseSwipe) return; if (!isDragging) return;
        isDragging = false;
        if (globalIsDragging) { preventNextClick = true; setTimeout(() => preventNextClick = false, 300); }
        if (e.type === 'touchend') setTimeout(() => { ignoreMouseSwipe = false; }, 300);
        if (isScrolling) { isScrolling = null; return; }

        const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX; const diff = endX - startX;
        if (diff > 70 && currentPage < 604) changePage(1);
        else if (diff < -70 && currentPage > 1) changePage(-1);
        else {
            const track = document.getElementById('quran-slider-track');
            if (track) { track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'; track.style.transform = `translate3d(${(currentPage - 1) * 100}%, 0, 0)`; }
        }
    };

    viewport.addEventListener('mousedown', onStart); viewport.addEventListener('mousemove', onMove, { passive: false });
    viewport.addEventListener('mouseup', onEnd); viewport.addEventListener('mouseleave', onEnd);
    viewport.addEventListener('touchstart', onStart, { passive: true }); viewport.addEventListener('touchmove', onMove, { passive: false });
    viewport.addEventListener('touchend', onEnd);
}

function closeQuran() {
    closeVersePopup(); document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    document.getElementById('quran-view').classList.remove('active'); document.getElementById('home-view').classList.add('active');
    closeAllSheets(); localStorage.removeItem('quran_is_reading');
}

function openSettings() {
    closeVersePopup(); document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    applySettingsToUI(); document.getElementById('info-sheet').classList.add('expanded'); checkOverlay();
}

function closeAllSheets() { document.getElementById('info-sheet').classList.remove('expanded'); checkOverlay(); }
function checkOverlay() {
    const isExp = document.getElementById('info-sheet').classList.contains('expanded');
    if (isExp) document.getElementById('sheet-overlay').classList.add('active');
    else document.getElementById('sheet-overlay').classList.remove('active');
}

function applySettingsToUI() {
    document.getElementById('select-language').value = appSettings.appLanguage;
    document.getElementById('toggle-perkata').checked = appSettings.wordByWord;
    document.getElementById('toggle-transliterasi').checked = appSettings.showTransliteration;
    document.getElementById('toggle-translation').checked = appSettings.showTranslation;
}

function updateSettings() {
    appSettings.appLanguage = document.getElementById('select-language').value;
    appSettings.wordByWord = document.getElementById('toggle-perkata').checked;
    appSettings.showTransliteration = document.getElementById('toggle-transliterasi').checked;
    appSettings.showTranslation = document.getElementById('toggle-translation').checked;
    appSettings.timestamp = new Date().getTime();
    localStorage.setItem('quran_settings', JSON.stringify(appSettings));

    applyUILanguage(); applySettings();
    document.querySelectorAll('.quran-page-content').forEach(container => { container.dataset.loaded = "false"; });

    if (document.getElementById('quran-view').classList.contains('active')) {
        renderPageContent(currentPage, true); renderPageContent(currentPage - 1, true); renderPageContent(currentPage + 1, true); updateQuranUI();
    } else {
        renderSurahList(); renderJuzList(); renderBookmarkTab();
    }
    if (localStorage.getItem('quran_gdrive_linked') === 'true' && checkAndRestoreToken()) performSync(true);
}

function loadSettings() {
    const saved = localStorage.getItem('quran_settings');
    if (saved) appSettings = Object.assign({}, appSettings, JSON.parse(saved));
    applySettingsToUI(); applyUILanguage(); applySettings();
}

function changeFontSize(step) {
    appSettings.arabicSize += step;
    if (appSettings.arabicSize < 0.75) appSettings.arabicSize = 0.75;
    if (appSettings.arabicSize > 5.0) appSettings.arabicSize = 5.0;
    updateSettings();
}

function applySettings() {
    document.body.classList.remove('font-dkip'); document.body.classList.add('font-' + appSettings.font);
    document.documentElement.style.setProperty('--arabic-font-size', appSettings.arabicSize + 'rem');
}

function setupSheetDrag(sheetId, dragAreaId) {
    const sheet = document.getElementById(sheetId); const dragArea = document.getElementById(dragAreaId);
    if (!sheet || !dragArea) return;
    let startY = 0, currentY = 0, isDraggingSheet = false;

    const onStart = (e) => { isDraggingSheet = true; startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY; sheet.style.transition = 'none'; };
    const onMove = (e) => {
        if (!isDraggingSheet) return; if (e.cancelable) e.preventDefault();
        currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY; const diff = currentY - startY;
        let transformY = sheet.classList.contains('expanded') ? diff : (sheet.offsetHeight - 50) + diff;
        if (transformY < 0) transformY = 0; sheet.style.transform = `translateY(${transformY}px)`;
    };
    const onEnd = (e) => {
        if (!isDraggingSheet) return; isDraggingSheet = false;
        sheet.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        const diff = currentY - startY; const isExpanded = sheet.classList.contains('expanded');
        if (Math.abs(diff) > 50) {
            if (isExpanded && diff > 50) sheet.classList.remove('expanded');
            else if (!isExpanded && diff < -50) sheet.classList.add('expanded');
        } else if (Math.abs(diff) < 10) sheet.classList.toggle('expanded');
        sheet.style.transform = ''; checkOverlay();
    };

    dragArea.addEventListener('mousedown', onStart); document.addEventListener('mousemove', onMove, { passive: false }); document.addEventListener('mouseup', onEnd);
    dragArea.addEventListener('touchstart', onStart, { passive: true }); document.addEventListener('touchmove', onMove, { passive: false }); document.addEventListener('touchend', onEnd);
}

function openGoToPopup() {
    document.getElementById('goto-modal').classList.add('active');
    const currentSurahData = execQuery(`SELECT surah_number FROM verses WHERE page_number = ${currentPage} LIMIT 1`);
    if(currentSurahData.length > 0) gotoData.surah = currentSurahData[0].surah_number;
    populateGoToSurah(); updateGoToAyahAndPage(gotoData.surah);
}
function closeGoToPopup() { document.getElementById('goto-modal').classList.remove('active'); }
function executeGoTo() { closeGoToPopup(); openQuranPage(gotoData.page, gotoData.surah, gotoData.ayah, 'goto'); }

function populateGoToSurah() {
    const list = document.getElementById('goto-list-surah');
    const surahData = execQuery("SELECT id, name_latin, verses_count FROM surah ORDER BY id ASC");
    let html = '';
    surahData.forEach(s => {
        const activeClass = s.id === gotoData.surah ? 'active' : '';
        html += `<div class="goto-item ${activeClass}" onclick="selectGoToSurah(${s.id}, ${s.verses_count})">${s.id}. ${s.name_latin}</div>`;
    });
    list.innerHTML = html; scrollToActiveItem(list);
}

function selectGoToSurah(surahId, versesCount) { gotoData.surah = surahId; gotoData.totalAyahs = versesCount; gotoData.ayah = 1; populateGoToSurah(); updateGoToAyahAndPage(surahId, 1); }

function updateGoToAyahAndPage(surahId, ayahId = 1) {
    const sData = execQuery(`SELECT verses_count FROM surah WHERE id=${surahId}`);
    if(sData.length > 0) gotoData.totalAyahs = sData[0].verses_count;
    gotoData.ayah = ayahId;

    const listAyah = document.getElementById('goto-list-ayah');
    let ayahHtml = '';
    for(let i=1; i<=gotoData.totalAyahs; i++) {
        const activeClass = i === gotoData.ayah ? 'active' : '';
        ayahHtml += `<div class="goto-item ${activeClass}" onclick="selectGoToAyah(${i})">${t('ayah')} ${i}</div>`;
    }
    listAyah.innerHTML = ayahHtml; scrollToActiveItem(listAyah); updateGoToPageBySurahAyah();
}

function selectGoToAyah(ayahId) { gotoData.ayah = ayahId; updateGoToAyahAndPage(gotoData.surah, ayahId); }

function updateGoToPageBySurahAyah() {
    const pData = execQuery(`SELECT page_number FROM verses WHERE surah_number=${gotoData.surah} AND verse_number=${gotoData.ayah}`);
    if(pData.length > 0) gotoData.page = pData[0].page_number;

    const listPage = document.getElementById('goto-list-page');
    let pageHtml = '';
    for(let i=1; i<=604; i++) {
        const activeClass = i === gotoData.page ? 'active' : '';
        pageHtml += `<div class="goto-item ${activeClass}" onclick="selectGoToPage(${i})">${t('page')} ${i}</div>`;
    }
    listPage.innerHTML = pageHtml; scrollToActiveItem(listPage);
}

function selectGoToPage(pageId) {
    gotoData.page = pageId;
    const data = execQuery(`SELECT surah_number, verse_number FROM verses WHERE page_number=${pageId} LIMIT 1`);
    if(data.length > 0) { gotoData.surah = data[0].surah_number; gotoData.ayah = data[0].verse_number; }
    populateGoToSurah(); updateGoToAyahAndPage(gotoData.surah, gotoData.ayah);
}

function scrollToActiveItem(listElement) {
    setTimeout(() => {
        const activeItem = listElement.querySelector('.active');
        if(activeItem) listElement.scrollTo({ top: activeItem.offsetTop - (listElement.offsetHeight / 2) + (activeItem.offsetHeight / 2), behavior: 'smooth' });
    }, 10);
}

window.addEventListener('resize', () => { if (document.getElementById('quran-view').classList.contains('active')) updateQuranUI(); });
document.addEventListener('DOMContentLoaded', initApp);

/* =========================================
   GOOGLE DRIVE SYNC & MANUAL EXPORT/IMPORT
========================================= */
let driveAccessToken = '';
let tokenClient;
let driveFileId = localStorage.getItem('quran_drive_file_id') || null;

function initGoogleSync() {
    if (typeof google === 'undefined') { setTimeout(initGoogleSync, 500); return; }

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: '219268814398-2lsp4fspvpat7quoc7jq6qe9jpi13c1g.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email',
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                driveAccessToken = tokenResponse.access_token;
                const expiryTime = new Date().getTime() + (tokenResponse.expires_in * 1000) - 60000;
                localStorage.setItem('quran_gdrive_token', driveAccessToken);
                localStorage.setItem('quran_gdrive_token_expiry', expiryTime.toString());
                localStorage.setItem('quran_gdrive_linked', 'true');

                fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { 'Authorization': 'Bearer ' + driveAccessToken } })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.email) {
                            localStorage.setItem('quran_sync_email', data.email);
                            if(data.picture) localStorage.setItem('quran_sync_avatar', data.picture);
                            updateToolboxUI();
                        }
                    }).catch(err => console.error(err));

                updateToolboxUI(); performSync();
            }
        },
    });

    updateToolboxUI();
}

function updateToolboxUI() {
    const isLinked = localStorage.getItem('quran_gdrive_linked') === 'true';
    const emailEl = document.getElementById('tb-email-title');
    const syncEl = document.getElementById('tb-sync-desc');
    const avatarImg = document.getElementById('tb-avatar');
    const btnSync = document.getElementById('btn-toolbox-sync');
    const btnLogout = document.getElementById('tb-logout-btn');

    if (isLinked) {
        if(emailEl) emailEl.innerText = localStorage.getItem('quran_sync_email') || t('waiting_info');
        if(syncEl) syncEl.innerText = `${t('last_sync')} ${localStorage.getItem('quran_last_sync') || '-'}`;
        const avatarUrl = localStorage.getItem('quran_sync_avatar');
        if (avatarUrl && avatarImg) avatarImg.src = avatarUrl;
        if(btnSync) btnSync.classList.add('highlight');
        if(btnLogout) btnLogout.style.display = 'inline-block';
    } else {
        if(emailEl) emailEl.innerText = t('login_sync');
        if(syncEl) syncEl.innerText = t('never_sync');
        if(avatarImg) avatarImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230D9488'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
        if(btnSync) btnSync.classList.remove('highlight');
        if(btnLogout) btnLogout.style.display = 'none';
    }
}

window.handleLogout = function() {
    showConfirm(t('logout_prompt_title'), t('logout_prompt_msg'), () => {
        localStorage.removeItem('quran_gdrive_linked');
        localStorage.removeItem('quran_gdrive_token');
        localStorage.removeItem('quran_gdrive_token_expiry');
        localStorage.removeItem('quran_sync_email');
        localStorage.removeItem('quran_sync_avatar');
        localStorage.removeItem('quran_last_sync');
        localStorage.removeItem('quran_drive_file_id');
        driveAccessToken = ''; driveFileId = null;
        updateToolboxUI();
        showToast("Logout Berhasil");
    }, t('logout'));
};

function checkAndRestoreToken() {
    if (driveAccessToken) {
        const tokenExpiry = localStorage.getItem('quran_gdrive_token_expiry');
        if (tokenExpiry && new Date().getTime() >= parseInt(tokenExpiry)) { driveAccessToken = ''; return false; }
        return true;
    }
    const savedToken = localStorage.getItem('quran_gdrive_token');
    const tokenExpiry = localStorage.getItem('quran_gdrive_token_expiry');
    const now = new Date().getTime();
    if (savedToken && tokenExpiry && now < parseInt(tokenExpiry)) { driveAccessToken = savedToken; return true; }
    return false;
}

function handleAuthClick() {
    if (!tokenClient) { showToast(t('sync_not_ready')); return; }
    const isLinked = localStorage.getItem('quran_gdrive_linked') === 'true';
    if (isLinked && checkAndRestoreToken()) { showToast(t('syncing')); performSync(); return; }
    showToast(isLinked ? t('syncing') : t('auth_google'));
    if (isLinked) tokenClient.requestAccessToken({prompt: ''}); else tokenClient.requestAccessToken();
}

async function performSync(isSilent = false) {
    try {
        const queryStr = encodeURIComponent("name='quran_sync.json'");
        const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${queryStr}`, { headers: { 'Authorization': 'Bearer ' + driveAccessToken } });
        if (!searchRes.ok) throw new Error("Gagal mencari file di Google Drive");
        const searchData = await searchRes.json();

        let remoteData = { bookmarks: [], folders: [], lastRead: null, settings: null };

        if (searchData.files && searchData.files.length > 0) {
            driveFileId = searchData.files[0].id; localStorage.setItem('quran_drive_file_id', driveFileId);
            const fileRes = await fetch(`https://www.googleapis.com/drive/v3/files/${driveFileId}?alt=media`, { headers: { 'Authorization': 'Bearer ' + driveAccessToken } });
            if (fileRes.ok) {
                const text = await fileRes.text();
                if (text && text.trim() !== "") {
                    try {
                        let parsedData = JSON.parse(text);
                        remoteData.bookmarks = parsedData.bookmarks || []; remoteData.folders = parsedData.folders || [];
                        remoteData.lastRead = parsedData.lastRead || null; remoteData.settings = parsedData.settings || null;
                    } catch (e) { console.error("Format JSON file di GDrive tidak valid.", e); }
                }
            }
        }

        appBookmarks = mergeSyncData(appBookmarks, remoteData.bookmarks);
        appFolders = mergeSyncData(appFolders, remoteData.folders);

        if (remoteData.lastRead) {
            let rLastRead = remoteData.lastRead;
            if (!rLastRead.items) {
                if (Array.isArray(rLastRead)) rLastRead = { items: rLastRead, timestamp: rLastRead[0]?.timestamp || new Date().getTime() };
                else rLastRead = { items: [rLastRead], timestamp: rLastRead.timestamp || new Date().getTime() };
            }
            if (!appLastRead || !appLastRead.timestamp || (rLastRead.timestamp > appLastRead.timestamp)) appLastRead = rLastRead;
        }

        if (remoteData.settings) {
            if (!appSettings.timestamp || (remoteData.settings.timestamp > appSettings.timestamp)) {
                appSettings = Object.assign({}, appSettings, remoteData.settings);
                localStorage.setItem('quran_settings', JSON.stringify(appSettings));
                applySettingsToUI(); applyUILanguage(); applySettings();
            }
        }

        saveBookmarks();

        if (document.getElementById('home-view').classList.contains('active')) {
            renderSurahList(); renderJuzList(); renderBookmarkTab();
        }

        if (currentViewingFolderId) {
            const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
            if (folder) openFolderView(folder.id, folder.name); else closeFolderView();
        }

        await uploadToDriveRobust({ bookmarks: appBookmarks, folders: appFolders, lastRead: appLastRead, settings: appSettings });

        const now = new Date();
        const timeString = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
        localStorage.setItem('quran_last_sync', timeString); updateToolboxUI();

        if (!isSilent) showToast(t('sync_success'));
    } catch (error) {
        console.error("Sync error:", error);
        if (!isSilent) showToast(t('sync_failed') + error.message);
    }
}

function mergeSyncData(localArr, remoteArr) {
    const map = new Map();
    remoteArr.forEach(item => map.set(item.id, item));
    localArr.forEach(item => {
        if (map.has(item.id)) {
            const existingTime = map.get(item.id).timestamp || 0;
            const localTime = item.timestamp || 0;
            if (localTime > existingTime) map.set(item.id, item);
        } else map.set(item.id, item);
    });
    return sortItemsArray(Array.from(map.values()));
}

async function uploadToDriveRobust(dataObj) {
    const metadata = { name: 'quran_sync.json' };
    if (!driveFileId) metadata.parents = ['appDataFolder'];

    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const closeDelim = "\r\n--" + boundary + "--";
    const body = delimiter + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(dataObj) + closeDelim;
    const url = driveFileId ? `https://www.googleapis.com/upload/drive/v3/files/${driveFileId}?uploadType=multipart` : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    const res = await fetch(url, {
        method: driveFileId ? 'PATCH' : 'POST',
        headers: { 'Authorization': 'Bearer ' + driveAccessToken, 'Content-Type': `multipart/related; boundary=${boundary}` },
        body: body
    });

    if (!res.ok) throw new Error(`Upload ditolak oleh server (HTTP ${res.status})`);
    const resData = await res.json();
    if (!driveFileId && resData.id) { driveFileId = resData.id; localStorage.setItem('quran_drive_file_id', driveFileId); }
}

function exportDataJson() {
    const data = { bookmarks: appBookmarks, folders: appFolders, lastRead: appLastRead, settings: appSettings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `quran_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
}

function importDataJson(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            appBookmarks = mergeSyncData(appBookmarks, importedData.bookmarks || []);
            appFolders = mergeSyncData(appFolders, importedData.folders || []);

            if (importedData.lastRead && importedData.lastRead.timestamp) {
                if (!appLastRead || !appLastRead.timestamp || importedData.lastRead.timestamp > appLastRead.timestamp) {
                    appLastRead = importedData.lastRead;
                }
            }
            if (importedData.settings && importedData.settings.timestamp) {
                if (!appSettings.timestamp || importedData.settings.timestamp > appSettings.timestamp) {
                    appSettings = Object.assign({}, appSettings, importedData.settings);
                    localStorage.setItem('quran_settings', JSON.stringify(appSettings));
                    applySettingsToUI(); applyUILanguage(); applySettings();
                }
            }
            saveBookmarks();
            if (document.getElementById('home-view').classList.contains('active')) renderBookmarkTab();
            if (currentViewingFolderId) {
                const folder = appFolders.find(f => f.id === currentViewingFolderId && !f.deleted);
                if (folder) openFolderView(folder.id, folder.name); else closeFolderView();
            }
            showToast(t('import_success'));
        } catch (err) {
            console.error("Import Error", err); showToast(t('import_failed'));
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

/* =========================================
   PWA GESTURE PREVENTION FALLBACK
========================================= */
let pwaTouchStartX = 0; let pwaTouchStartY = 0;
document.addEventListener('touchstart', e => { pwaTouchStartX = e.touches[0].clientX; pwaTouchStartY = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchmove', e => {
    const touchCurrentX = e.touches[0].clientX; const touchCurrentY = e.touches[0].clientY;
    const diffX = touchCurrentX - pwaTouchStartX; const diffY = touchCurrentY - pwaTouchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (pwaTouchStartX < 20 || pwaTouchStartX > window.innerWidth - 20) { if (e.cancelable) e.preventDefault(); }
    } else {
        if (diffY > 0) {
            const scrollable = e.target.closest('.tab-pane, .slide-card, .sheet-content, #surah-info-content, .edit-words-container, .move-folder-list, .goto-list, .verse-popup-translation-container, #last-read-history-list');
            if (!scrollable || scrollable.scrollTop <= 0) { if (e.cancelable) e.preventDefault(); }
        }
    }
}, { passive: false });