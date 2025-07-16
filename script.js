const myLibrary = []
const bookTemplate = document.getElementById("bookTemplate")
const booksTableBody = document.getElementById("booksTableBody")
const bookForm = document.getElementById("bookForm")

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Must use new keyword when using Book()")
    }
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.markRead = function(isRead) {
        this.read = isRead
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    addToDisplay(newBook)
}

function findBookById(id) {
    return myLibrary.find((book) => book.id == id)
}

function addToDisplay(book) {
    const bookClone = cloneBookTemplate()
    setupBook(bookClone, book)
    booksTableBody.appendChild(bookClone)
}

function cloneBookTemplate() {
    return bookTemplate.content.cloneNode(true).children[0]
}

function updateBookRead(e) {
    const bookRow = e.target.parentElement.parentElement
    const bookId = bookRow.getAttribute("id")
    const book = findBookById(bookId)
    const index = myLibrary.indexOf(book)
    myLibrary[index].markRead(e.target.checked)
}

function updateDisplayFrom(index) {
    for (let i = index; i < myLibrary.length; i++) {
        const bookRow = document.getElementById(myLibrary[i].id)
        bookRow.children[0].textContent = i + 1;
    }
}

function deleteBook(e) {
    const bookRow = e.target.parentElement.parentElement
    const bookId = bookRow.getAttribute("id")
    const book = findBookById(bookId)
    const index = myLibrary.indexOf(book)
    bookRow.remove()
    myLibrary.splice(index, 1)
    updateDisplayFrom(index)

}

function setupBook(bookClone, book) {
    bookClone.setAttribute('id', book.id)
    bookClone.children[0].textContent = myLibrary.indexOf(book) + 1
    bookClone.children[1].textContent = book.title
    bookClone.children[1].setAttribute("id", `book-title-${book.id}`)
    bookClone.children[2].textContent = book.author
    bookClone.children[3].textContent = book.pages
    bookClone.children[4].firstChild.checked = book.read
    bookClone.children[4].firstChild.setAttribute("id", `book-read-${book.id}`)
    bookClone.children[4].firstChild.setAttribute("aria-labeledby", `${bookClone.children[4].firstChild.getAttribute("id")} ${bookClone.children[1].getAttribute("id")}`)
    bookClone.children[4].firstChild.addEventListener("click", updateBookRead)
    bookClone.children[5].firstChild.addEventListener("click", deleteBook)
    bookClone.children[5].firstChild.setAttribute("id", `book-delete-${book.id}`)
    bookClone.children[5].firstChild.setAttribute("aria-labeledby", `${bookClone.children[5].firstChild.getAttribute("id")} ${bookClone.children[1].getAttribute("id")}`)
}

addBookToLibrary("After", "Dude", 219, true)
addBookToLibrary("After", "Dude", 219, true)
addBookToLibrary("After", "Dude", 219, true)
addBookToLibrary("After", "Dude", 219, false)

function addBookFromForm(e) {
    const form = e.target
    const title = form["title"].value
    const author = form["author"].value
    const pages = form["pages"].value
    const read = form["read"].checked
    addBookToLibrary(title, author, pages, read)
    form.reset()
    e.preventDefault()
}

bookForm.addEventListener("submit", addBookFromForm)