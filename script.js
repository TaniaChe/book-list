const spinner = document.getElementById("spinner");
const nextBtn = document.getElementById("next");
const pageStatus = document.getElementById("page-status");
const prevBtn = document.getElementById("previous");
const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector('.form-control');

const url = "https://64a65266096b3f0fcc7f9186.mockapi.io/api/v1/books";

let allBooks = [];
let activePage = 1;
let itemsPerPage = 5;

// function getT() {
//   console.log("I am invoked by calling");
// }

// getT();

(async () => {
	const resp = await axios.get(url);

	//   console.log(resp);

	allBooks = resp.data;

	setTimeout(() => {
		spinner.style.display = "none";
		displayAllBooks(allBooks);
	}, 1000);
})();

function displayAllBooks(books) {
	pageStatus.innerHTML = activePage + "/" + books.length / itemsPerPage;
	//   console.log(books);

	const startIndex = (activePage - 1) * itemsPerPage;
	const endIndex = activePage * itemsPerPage;

	const slicedBooks = books.slice(startIndex, endIndex);

	tableBody.innerHTML = "";

	//   books = [];

	if (slicedBooks.length) {
		slicedBooks.forEach((book, index) => {
			const { img, title, author, year, id } = book;

			//   <td>${index + 1}</td>
			const row = `<tr>
      <td>${id}</td>
      <td><img src="${img}" width="50" height="50" alt=""></td>
      <td>${title}</td>
      <td>${author.length ? author : "N/A"}</td>
      <td>${year}</td>
      <td class="d-flex align-items-center justify-content-around">
        <i class="fa fa-heart fs-5"></i>
        <i class="fa fa-archive fs-5"></i>
      </td>
    </tr>`;

			tableBody.innerHTML += row;
		});
	} else {
		tableBody.innerHTML = `<tr>
    <td colspan="6" class="text-center">No Data Found</td>
  </tr>`;
	}
}

nextBtn.addEventListener("click", () => {
	activePage++;

	displayAllBooks(allBooks);

	console.log("clicking next");
});

prevBtn.addEventListener("click", () => {
	activePage--;

	displayAllBooks(allBooks);

	console.log("clicking previous");
});

searchInput.addEventListener('keyup', () => {
	console.log(searchInput.value)


	// const value = event.target.value;
	// const filteredList = [];

	// for (let cocktail of data) {
	// 	if (cocktail["strDrink"].toLowerCase().includes(value)) {
	// 		filteredList.push(cocktail);
	// 		renderData(filteredList);
	// 	}
	// }
})

// const displayMyFavorites = () => { };

// const displayArchived = () => { };