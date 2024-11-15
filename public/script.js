let data = [];
let currentPage = 1;
const recordsPerPage = 5;
let editingIndex = null;

const form = document.getElementById('crudForm');
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('editModal');
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');

form.addEventListener('submit', addEntry);
searchInput.addEventListener('input', searchEntries);

function renderTable() {
    const filteredData = data.filter(entry => entry.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    const paginatedData = paginateData(filteredData, currentPage, recordsPerPage);

    tableBody.innerHTML = '';
    paginatedData.forEach((entry, index) => {
        const row = `<tr>
            <td>${(currentPage - 1) * recordsPerPage + index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>
                <button class="edit" onclick="openModal(${index})">Edit</button>
                <button class="delete" onclick="deleteEntry(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    renderPagination(filteredData.length);
}

function addEntry(event) {
    event.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    data.push({ name, email });
    form.reset();
    renderTable();
}

function openModal(index) {
    editingIndex = index;
    editName.value = data[index].name;
    editEmail.value = data[index].email;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function saveEdit() {
    data[editingIndex].name = editName.value;
    data[editingIndex].email = editEmail.value;
    closeModal();
    renderTable();
}

function deleteEntry(index) {
    data.splice(index, 1);
    renderTable();
}

function searchEntries() {
    currentPage = 1;
    renderTable();
}

function sortTable(property) {
    data.sort((a, b) => a[property].localeCompare(b[property]));
    renderTable();
}

function paginateData(array, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return array.slice(start, end);
}

function renderPagination(totalRecords) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = `<button onclick="changePage(${i})">${i}</button>`;
        paginationContainer.insertAdjacentHTML('beforeend', pageBtn);
    }
}

function changePage(page) {
    currentPage = page;
    renderTable();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

renderTable();
