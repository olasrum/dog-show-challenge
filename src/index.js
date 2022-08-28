const dogForm = document.getElementById('dog-form')
const dogTable = document.getElementById('table-body')

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => displayDogs(dogs))
}

function displayDogs(dogs) {
    dogs.forEach(dog => {
        const tr = document.createElement('tr')
        tr.id = dog.id
        tr.innerHTML = `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`
        dogTable.appendChild(tr)
        })
    }

getDogs();

dogTable.addEventListener("click", clickedEdit)

function clickedEdit() {
	if (event.target.dataset.id) {
		addDogToForm()
	}
}

function addDogToForm() {
	let row = event.target.parentElement.parentElement.children;
	dogForm.children[0].value = row[0].innerText
	dogForm.children[1].value = row[1].innerText
	dogForm.children[2].value = row[2].innerText
	dogForm.children[3].dataset.id = row[3].children[0].dataset.id
}

dogForm.addEventListener("submit", clickedSubmit)

function clickedSubmit() {
	event.preventDefault();

	const name = dogForm.children[0].value;
	const breed = dogForm.children[1].value;
	const sex = dogForm.children[2].value;
	const id = dogForm.children[3].dataset.id;

editDog(id, name, breed, sex)
		.then(resp => resp.json())
		.then(dog => {
			document.getElementById(dog.id).innerHTML = `
			<tr>
				<td>${dog.name}</td> 
				<td>${dog.breed}</td> 
				<td>${dog.sex}</td> 
				<td><button data-id=${dog.id}>Edit</button></td>
			</tr>
			`
		})
}

function editDog(id, name, breed, sex) {
    return fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


//https://medium.com/@ericalehotzky/dog-show-challenge-in-5-minutes-97c7f5b12dfd
