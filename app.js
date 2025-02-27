// Cat Shelter App to Demo Dom Manipulation

const form = document.querySelector('#shelterForm');
const input = document.querySelector('input#catname');

// Assuming you have an array called 'cats' that stores the user's cat list
let cats = [];

// Error handling object
const catErrors = {
	nameEmpty: false,
	nameExists: false,
	nameTooLong: false,
};

// Function to reset error states
function resetErrors() {
	for (const key in catErrors) {
		catErrors[key] = false;
	}
}

// Function to display errors
function displayErrors() {
	const div = document.querySelector('div#errors');
	div.innerHTML = ''; // Clear existing errors

	if (catErrors.nameEmpty) {
		div.innerHTML += '<p>Cat name cannot be empty!</p>';
	}

	if (catErrors.nameExists) {
		div.innerHTML += '<p>Cat name already exists!</p>';
	}

	if (catErrors.nameTooLong) {
		div.innerHTML += '<p>Cat name cannot be longer than 20 characters!</p>';
	}
}

// Function to run validation check
function inputValidationCheck(catName) {
	resetErrors();

	if (!catName.trim()) {
		catErrors.nameEmpty = true;
	} else if (cats.map(cat => cat.toLowerCase()).includes(catName.toLowerCase())) {
		catErrors.nameExists = true;
	} else if (catName.length > 20) {
		catErrors.nameTooLong = true;
	}

	if (Object.values(catErrors).some((error) => error)) {
		displayErrors();

		// Stop execution if errors exist
		throw new Error('Invalid input detected!');
	}
}

// Function which returns a li element with the content inside
function listItemFactory(value) {
	const li = document.createElement('li');
	const button = document.createElement('button');
	button.append('Delete');

	button.addEventListener('click', function () {
		deleteCat(value);
	});

	li.append(value, button);
	return li;
}

// Function to save the cats array to localStorage
function saveCatsToLocalStorage() {
	try {
		localStorage.setItem('userCats', JSON.stringify(cats));
		console.log('Cats saved to localStorage.');
	} catch (error) {
		console.error('Error saving cats to localStorage:', error);
	}
}

// Function to load the cats array from localStorage
function loadCatsFromLocalStorage() {
	try {
		const storedCats = localStorage.getItem('userCats');

		if (storedCats) {
			cats = JSON.parse(storedCats);
			console.log('Cats loaded from localStorage.');

			// Update your UI with the loaded cats array here.
			updateCatDisplay(); //call function to update the users display.
		}
	} catch (error) {
		console.error('Error loading cats from localStorage:', error);
	}
}

// Example function to add a cat to the array
function addCat(catName) {
	try {
		inputValidationCheck(catName);
		cats.push(catName);
		saveCatsToLocalStorage();
		updateCatDisplay(); //call function to update the users display.
	} catch (err) {
		console.log(err);
	}
}

// Function to delete a cat from the array
function deleteCat(catName) {
	const index = cats.indexOf(catName);

	if (index > -1) {
		cats.splice(index, 1);
		saveCatsToLocalStorage();
		updateCatDisplay();
	}
}

//Example function to update the user display
function updateCatDisplay() {
	const list = document.querySelector('ul#cats');
	list.innerHTML = ''; // clear list

	for (const cat of cats) {
		list.append(listItemFactory(cat));
	}
}

// Event listener for visibilitychange
document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'hidden') {
		saveCatsToLocalStorage(); // Save when the page becomes hidden
	}
});

// Load cats when the page loads
window.addEventListener('load', () => {
	loadCatsFromLocalStorage();
});

// Example usage (you'd have your own UI to trigger this):
// addCat("Whiskers");
// addCat("Mittens");
// addCat("Patches");

form.addEventListener('submit', function (event) {
	event.preventDefault();
	console.log(input.value);
	addCat(input.value);
	input.value = '';
});
