// File: navbar.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Deteksi posisi file saat ini untuk menentukan prefix path
    const currentPath = window.location.pathname;
    let pathPrefix = "";

    // Logika kotor untuk static HTML routing
    if (currentPath.includes('/pages/berita/') ||
        currentPath.includes('/pages/koleksi-mural/')) {
        pathPrefix = "../../";
    } else if (currentPath.includes('/pages/')) {
        pathPrefix = "../";
    }

    // 2. Data navigasi terpusat
    const navLinks = [
        { name: "Beranda", url: `${pathPrefix}index.html`, pathMatch: "index.html" },
        { name: "Tentang Kami", url: `${pathPrefix}pages/tentang-kami.html`, pathMatch: "tentang-kami.html" },
        { name: "Berita", url: `${pathPrefix}pages/berita/berita_1.html`, pathMatch: "berita" },
        { name: "Kunjungi Kami", url: `${pathPrefix}pages/kunjungi-kami.html`, pathMatch: "kunjungi-kami.html" },
        { name: "Agenda", url: `${pathPrefix}pages/agenda.html`, pathMatch: "agenda.html" },
        { name: "Kuliner", url: `${pathPrefix}pages/kuliner.html`, pathMatch: "kuliner.html" },
        { name: "Merchandise", url: `${pathPrefix}pages/merchandise.html`, pathMatch: "merchandise.html" },
        { name: "Koleksi Mural", url: `${pathPrefix}pages/koleksi-mural.html`, pathMatch: "koleksi-mural" },
    ];

    // 3. Render Link dengan logika Active State otomatis
    const renderLinks = () => {
        return navLinks.map(link => {
            let isActive = false;

            if (link.pathMatch === "index.html") {
                isActive = currentPath.endsWith("/") ||
                           currentPath === "" ||
                           (currentPath.endsWith("/index.html") &&
                           !currentPath.includes("/pages/"));
            } else {
                isActive = currentPath.includes(link.pathMatch);
            }

            const activeClass = isActive
                ? "text-[#1E459F] font-bold border-b-2 border-[#1E459F] pointer-events-none"
                : "text-[#78350f] font-semibold hover:text-[#CF2A2A]";

            return `
                <li class="border-r border-[#78350f]/30 md:pr-3 md:pl-3 first:pl-0 w-full md:w-auto text-center md:text-left">
                    <a href="${link.url}" class="${activeClass} transition-colors text-sm block py-2 md:py-0">
                        ${link.name}
                    </a>
                </li>
            `;
        }).join('');
    };

    // 4. Standarisasi Struktur Navbar (Warna dipaksa seragam menggunakan #EEBB3B)
    const navbarHTML = `
        <header class="w-full bg-[#EEBB3B] border-b border-[#B92E2B]/20 sticky top-0 z-50 shadow-sm font-sans">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3">
                <a href="${pathPrefix}index.html" class="flex-shrink-0 inline-flex items-center group">
                    <img src="${pathPrefix}assets/beranda/logo.png" alt="Tambak Bayan logo" class="h-10 sm:h-12 md:h-14 object-contain group-hover:scale-105 transition-transform duration-300" />
                </a>

                <button id="menu-toggle" type="button" class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#B92E2B]/10 transition-colors" aria-label="Toggle menu">
                    <span class="block w-6 h-0.5 bg-[#78350f] rounded-full transition-all duration-300"></span>
                    <span class="block w-6 h-0.5 bg-[#78350f] rounded-full transition-all duration-300"></span>
                    <span class="block w-6 h-0.5 bg-[#78350f] rounded-full transition-all duration-300"></span>
                </button>

                <nav id="main-nav" class="hidden md:flex items-center gap-0 w-full md:w-auto order-3 md:order-none basis-full md:basis-auto bg-[#EEBB3B]/98 md:bg-transparent backdrop-blur-sm rounded-b-lg md:rounded-none -mx-4 px-4 md:mx-0 md:px-0">
                    <ul class="flex flex-col md:flex-row items-center gap-3 md:gap-0 py-3 md:py-0 list-none m-0 p-0">
                        ${renderLinks()}
                    </ul>
                </nav>
            </div>
        </header>
    `;

    // 5. Inject ke DOM
    const navContainer = document.getElementById("navbar-container");
    if (navContainer) {
        navContainer.innerHTML = navbarHTML;
    }

    // 6. Fungsionalitas Toggle Mobile
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('hidden'));
    }
});