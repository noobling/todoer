var MIN_PASS_LENGTH = 6;

// When form is being submitted
document.getElementById('submit').addEventListener('click', function(e) {
	saveFormData();
	
	// Check if it is a valid form submission
	if (document.getElementById('password').value.length < MIN_PASS_LENGTH) {
		e.preventDefault();
		document.getElementById('password').insertAdjacentHTML('afterend','<p class="error">Password must be greater than 6 characters</p>');
	}
});

/**
 * Store form data to be used on another page
 */
function saveFormData() {
	localStorage.email = document.getElementsByName('email')[0].value;

	localStorage.name = document.getElementsByName('name')[0].value;
}