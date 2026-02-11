document.addEventListener('DOMContentLoaded', function () {
    initSidebar();
    initHeaderDropdowns();
    initDataTables();
    setActiveMenu();
});

function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
}

function initHeaderDropdowns() {
    const userDropdown = document.querySelector('.user-dropdown');

    if (userDropdown) {
        userDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('User dropdown clicked');
        });
    }

    const notificationBtn = document.querySelector('.notification-btn');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Notifications clicked');
        });
    }
}

function initDataTables() {
    const tables = document.querySelectorAll('.data-table');

    tables.forEach(table => {
        console.log('Table initialized:', table);
    });
}

function setActiveMenu() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}

function deleteItem(itemId, itemName) {
    if (confirm(`Tem certeza que deseja eliminar ${itemName}?`)) {
        console.log('Deleting item:', itemId);
        showAlert('success', `${itemName} eliminado com sucesso!`);
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

function showAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');

    if (!alertContainer) {
        return;
    }

    const alertHTML = `
        <div class="alert alert-${type}">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    alertContainer.innerHTML = alertHTML;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
}

function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

function validateForm(formId) {
    const form = document.getElementById(formId);

    if (!form) {
        return false;
    }

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

function clearForm(formId) {
    const form = document.getElementById(formId);

    if (form) {
        form.reset();
        form.querySelectorAll('.is-invalid').forEach(input => {
            input.classList.remove('is-invalid');
        });
    }
}

window.deleteItem = deleteItem;
window.showAlert = showAlert;
window.confirmAction = confirmAction;
window.validateForm = validateForm;
window.clearForm = clearForm;
