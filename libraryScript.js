const books = [
{
  id: 1,
  title: "Madonna in a Fur Coat",
  author: "Sabahattin Ali",
  year: 1943,
  pages: 200,
  copies: 3,
  image: "image/Madonna.jpg"
},
{
  id: 2,
  title: "Metamorphosis",
  author: "Franz Kafka",
  year: 1915,
  pages: 100,
  copies: 5,
  image: "image/Metamorphosis.jpg"
},
{
  id: 3,
  title: "The Tunnel",
  author: "Ernesto Sabato",
  year: 1948,
  pages: 240,
  copies: 2,
    image: "image/TheTunnel.jpg"
},
{
  id: 4,
  title: "White Nights",
  author: "Fyodor Dostoevsky",
  year: 1848,
  pages: 120,
  copies: 4,
  image: "image/WhiteNights.jpg"
},
{
  id: 5,
  title: "The Secret History",
  author: "Donna Tartt",
  year: 1992,
  pages: 576,
  copies: 1,
  image: "image/ThesecretHistory.jpg"
},
{
  id: 6,
  title: "Franz Kafka Diary",
  author: "Franz Kafka",
  year: 1910,
  pages: 320,
  copies: 2,
  image: "image/KafkaDiary.jpg"
}
];
let currentBookId = null;

function openLibraryTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(tc => tc.style.display = "none");

    const tabbuttons = document.querySelectorAll('.tabbutton');
    tabbuttons.forEach(tb => tb.classList.remove("active"));

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

function displayBooks(bookList) {
const grid = document.getElementById("bookGrid");
grid.innerHTML = "";
bookList.forEach(book => {
    const item = document.createElement("div");
    item.className = "book-item";
    item.innerHTML = `
        <img src="${book.image}" alt="${book.title}" onclick="showBookDetail(${book.id})">
        <p><strong>${book.title}</strong><br><small>Author: ${book.author}</small></p>
    `;
    grid.appendChild(item);
  });
}

function sortBook() {
const type = document.getElementById("sortSelect").value;
let sortedBooks = [...books];
if (type === "id") {
    sortedBooks.sort((a, b) => a.id - b.id);
} else if (type === "title") {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
}
displayBooks(sortedBooks);
}

function searchBook() {
const query = document.getElementById("searchInput").value.toLowerCase();
const filtered = books.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query)
);
displayBooks(filtered);
}

function showBookDetail(bookId) {
const book = books.find(b => b.id === bookId);
if (book) {
    currentBookId = bookId;
    
    document.getElementById("modalTitle").textContent = book.title;
    document.getElementById("modalId").textContent = "ID: " + book.id;
    document.getElementById("modalAuthor").textContent = "Author: " + book.author;
    document.getElementById("modalYear").textContent = "Published: " + book.year;
    document.getElementById("modalPages").textContent = "Pages: " + book.pages;
    document.getElementById("modalCopies").textContent = "Copies in Library: " + book.copies;
    
    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";
    
    document.getElementById("bookModal").style.display = "block";
    }
}

function enterEditMode() {
const book = books.find(b => b.id === currentBookId);
if (book) {

    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editYear").value = book.year;
    document.getElementById("editPages").value = book.pages;
    document.getElementById("editCopies").value = book.copies;
    
    document.getElementById("viewMode").style.display = "none";
    document.getElementById("editMode").style.display = "block";
}
}

function saveBook() {
const book = books.find(b => b.id === currentBookId);
if (book) {
    // Get updated values
    const newTitle = document.getElementById("editTitle").value.trim();
    const newAuthor = document.getElementById("editAuthor").value.trim();
    const newYear = parseInt(document.getElementById("editYear").value);
    const newPages = parseInt(document.getElementById("editPages").value);
    const newCopies = parseInt(document.getElementById("editCopies").value);
  
if (!newTitle || !newAuthor || !newYear || !newPages || !newCopies) {
    alert("Please fill in all fields with valid values.");
    return;
}
  
    book.title = newTitle;
    book.author = newAuthor;
    book.year = newYear;
    book.pages = newPages;
    book.copies = newCopies;
    
    // Refresh displays
    displayBooks(books);
    showBookDetail(book.id);
}
}

function cancelEdit() {
    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";
}

function closeModal() {
    document.getElementById("bookModal").style.display = "none";
    document.getElementById("viewMode").style.display = "block";
    document.getElementById("editMode").style.display = "none";
}

window.onclick = function(event) {
const modal = document.getElementById("bookModal");
if (event.target === modal) {
    closeModal();
}
}


document.addEventListener("DOMContentLoaded", () => {
    displayBooks(books);

    document.querySelector(".tabbutton").click();
});

