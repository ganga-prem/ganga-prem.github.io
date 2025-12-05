/**
 * Unified Menu System for Family Portal
 * This file generates consistent navigation across all pages
 */

// Menu configuration - Single source of truth for all pages
const menuConfig = {
    // Internal pages
    pages: [
        { href: "index.html", label: "Home" },
        { href: "ganga_niwas_2.html", label: "Ganga Niwas 2" },
        { href: "wedding_2020.html", label: "Wedding 2020" },
        { href: "birthdays.html", label: "Birthdays" },
        { href: "ganpati.html", label: "Ganpati Celebrations" },
        { href: "holi.html", label: "Holi Celebrations" },
        { href: "rakhi.html", label: "Rakhi Celebrations" },
        { href: "gallery.html", label: "Gallery" },
        { href: "celebrations.html", label: "Celebrations" },
        { href: "my_photo.html", label: "My Photo" }
    ],
    // External links (Google Photos albums)
    externalLinks: [
        { href: "https://photos.app.goo.gl/GaWmynkSnZtA9v3u8", label: "गोद भराई - रविना" },
        { href: "https://photos.app.goo.gl/hmu9sZtVZQ3rfJZG7", label: "गोद भराई - रविना (Mobile)" },
        { href: "https://photos.app.goo.gl/cnugttombNy5KWr78", label: "Rakhi - 2023" },
        { href: "https://photos.app.goo.gl/7XWUJBjLZenUkhuW8", label: "Rakhi - 2024" },
        { href: "https://photos.app.goo.gl/eHBrc4jEpUokfzDq8", label: "Ganpati - 2022" },
        { href: "https://photos.app.goo.gl/ch6xfenz2RcNRacQ6", label: "Ganpati - 2023" },
        { href: "https://photos.app.goo.gl/WrufdDrSJ5NJv9Gd7", label: "Panund Parsadi - 2023" }
    ]
};

/**
 * Get the current page filename from the URL
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    // Return 'index.html' for root path or empty path
    return page === '' || page === '/' ? 'index.html' : page;
}

/**
 * Generate and inject the menu HTML
 */
function generateMenu() {
    const menuContainer = document.getElementById('menu');
    if (!menuContainer) {
        console.warn('Menu container not found');
        return;
    }

    const currentPage = getCurrentPage();
    let menuHTML = '<ul class="links">';

    // Add internal pages
    menuConfig.pages.forEach(page => {
        const isActive = page.href === currentPage;
        const activeClass = isActive ? 'class="button primary"' : '';
        menuHTML += `<li><a ${activeClass} href="${page.href}">${page.label}</a></li>`;
    });

    // Add separator if there are external links
    if (menuConfig.externalLinks.length > 0) {
        menuHTML += '<li class="menu-separator"><hr style="border-color: rgba(255,255,255,0.15); margin: 0.5em 0;"></li>';
        menuHTML += '<li style="padding: 0.5em 0; color: rgba(255,255,255,0.5); font-size: 0.8em; text-align: center;">External Albums</li>';
    }

    // Add external links
    menuConfig.externalLinks.forEach(link => {
        menuHTML += `<li><a href="${link.href}" target="_blank">${link.label} <span style="font-size: 0.8em;">↗</span></a></li>`;
    });

    menuHTML += '</ul>';
    
    menuContainer.innerHTML = menuHTML;
}

/**
 * Generate and inject the header HTML
 */
function generateHeader() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) {
        console.warn('Header container not found');
        return;
    }

    // Preserve existing classes on header
    const existingClasses = headerContainer.className;
    
    headerContainer.innerHTML = `
        <a href="index.html" class="logo"><strong>Family Portal</strong> <span>by Sunil Sharma</span></a>
        <nav>
            <a href="#menu">Menu</a>
        </nav>
    `;
}

// Initialize menu immediately (before main.js runs)
// This must run synchronously so main.js can properly wrap the menu content
(function() {
    // Wait for DOM to have the menu element
    if (document.getElementById('menu')) {
        generateMenu();
    } else {
        // If DOM not ready yet, wait for it
        document.addEventListener('DOMContentLoaded', function() {
            generateMenu();
        });
    }
})();

