let myLibrary = [];

function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info = function(){
        return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, '+ (this.read == true ? 'read.' : 'not read.');
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks(){
    let bookContainer = document.querySelector(".bookContainer");
    bookContainer.textContent = "";

    for (let book in myLibrary){
        let bookDiv = document.createElement("div");
        bookDiv.textContent = myLibrary[book].info();
        bookDiv.classList.add("book");
        bookContainer.appendChild(bookDiv);
        
        let removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.onclick = () => {
            myLibrary.splice(book,1)
            displayBooks();
        };
        bookDiv.appendChild(removeButton);

        let readButton = document.createElement("button");
        readButton.textContent = "read / not read";
        readButton.onclick = () => {
            (myLibrary[book].read === true ? myLibrary[book].read = false : myLibrary[book].read = true)
            displayBooks();
        };
        bookDiv.appendChild(readButton);

    }
}

function createBook(title, author, pages, read){
    addBookToLibrary(title, author, pages, read);
    displayBooks();
}

let bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
  
    if (title.value == "" || author.value == "" || pages.value == "") {
        alert("Ensure you input a value in all fields!");
    } else {
        console.log(title.value + " " + author.value + " " + pages.value + " "+ read.value)
        createBook(title.value, author.value, pages.value, read.value);
    }
});

addBookToLibrary('a','a','3', true);
addBookToLibrary('b','b','33', false);
displayBooks();