var MIN_PASS_LENGTH = 6;

// When form is being submitted
document.getElementById('submit').addEventListener('click', function(e) {
	// Check if it is a valid form submission
	if (document.getElementById('password').value.length < MIN_PASS_LENGTH) {
		e.preventDefault();
		document.getElementById('form').innerHTML += '<p class="error mt-3">Password must be greater than 6 characters</p>';
	} else {
		saveFormData();
	}
});

/**
 * Store form data to be used on another page
 */
function saveFormData() {
	localStorage.email = document.getElementsByName('email')[0].value;

	localStorage.name = document.getElementsByName('name')[0].value;
}