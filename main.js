// Do your work here...
console.log("Hello, world!");

const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu belum mendukung local atau session storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

// document.addEventListener(RENDER_EVENT, function () {
//   const unCompletedBookList = document.getElementById;
// });

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("bookFormSubmit");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addNewBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addNewBook() {
  const bookTitle = document.getElementById("bookFormTitle").value;
  const bookAuthor = document.getElementById("bookFormAuthor").value;
  const bookYear = document.getElementById("bookFormYear").value;
  const bookIsComplete = document.getElementById("bookFormIsComplete");

  bookIsComplete.addEventListener("change", function () {
    if (bookIsComplete.checked) {
      console.log("The book has been completed");
    } else {
      console.log("The book has not been completed");
    }
  });

  const generatedID = generateID();
  const bookObject = generateBookObject(
    generatedID,
    bookTitle,
    bookAuthor,
    bookYear,
    bookIsComplete
  );

  books.push(bookObject);
}

function generateID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }
}
