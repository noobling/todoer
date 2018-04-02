document.getElementById('submit').addEventListener('click', function(event) {	
	saveFormData();
})

function saveFormData() {
	localStorage.email = document.getElementsByName('email')[0].value;

	localStorage.name = document.getElementsByName('name')[0].value;
}