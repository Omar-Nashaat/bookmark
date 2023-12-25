var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");


var bookmarks = [];

if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayData();
}

function addSite() {
    var bookMark = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };
    if (isUrlValid() && isNameValid()) {
        closeModal();
        bookmarks.push(bookMark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        displayData();
    }
    else if (!isUrlValid() || !isNameValid()) {
        showModal();
    }
}

function displayData() {
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td><a href="${bookmarks[i].url}" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye me-1"></i>Visit</button></a></td>
        <td><button class="btn btn-danger" onclick="deleteItem(${i});"><i class="fa-solid fa-trash-can  me-1"></i>Delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function deleteItem(index) {
    bookmarks.splice(index, 1)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayData();
}


function isNameValid() {
    if (siteNameInput.value.length > 3)
        return true;
    else
        return false;

}


var urlRegex = /^(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
function isUrlValid() {
    if (urlRegex.test(siteUrlInput.value)) {
        return true;
    }
    else
        return false;
}

function showModal() {
    addBtn.setAttribute("data-bs-target", "#exampleModal");
}
function closeModal() {
    addBtn.removeAttribute("data-bs-target", "#exampleModal");
}

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function search() {
    var term = searchInput.value;
    var cartona = "";
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td><a href="${bookmarks[i].url}" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye me-1"></i>Visit</button></a></td>
        <td><button class="btn btn-danger" onclick="deleteItem(${i});"><i class="fa-solid fa-trash-can  me-1"></i>Delete</button></td>
    </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
}