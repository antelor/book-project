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

function showForm(){
    bookForm.style.display = "block";
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
        bookDiv.classList.add("bookCard");
        
        let titleDiv = document.createElement("div");
        titleDiv.textContent = "\"" + myLibrary[book].title + "\"";
        let authorDiv = document.createElement("div");
        authorDiv.textContent = myLibrary[book].author;
        let pagesDiv = document.createElement("div");
        pagesDiv.textContent = myLibrary[book].pages;
        let readDiv = document.createElement("div");

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        
        let readButton = document.createElement("button");
        if ( myLibrary[book].read ){
            readButton.textContent = "Read";
            readButton.classList.add('read-btn')
        }
        else{
            readButton.textContent = "Not read";
            readButton.classList.add('unread-btn')
        }
        
        readButton.onclick = () => {
            (myLibrary[book].read === true ? myLibrary[book].read = false : myLibrary[book].read = true)
            displayBooks();
        };
        bookDiv.appendChild(readButton);
        
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            myLibrary.splice(book,1)
            displayBooks();
        };
        removeButton.classList.add('remove-btn');
        bookDiv.appendChild(removeButton);
        
        bookContainer.appendChild(bookDiv);
    }
}

function createBook(title, author, pages, read){
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    bookForm.style.display = "none";
    bookForm.reset();
}



addBookToLibrary('a','a','3', true);
addBookToLibrary('b','b','33', false);
displayBooks();