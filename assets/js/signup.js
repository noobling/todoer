warnIfSafari();

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

// User feed back for invalid email
document.getElementById('email').addEventListener('keyup', function(e) {
	if (!validEmail(e.target.value)) {
		if (!document.getElementById('incorrect-email')) {
			document.getElementById('form').insertAdjacentHTML('beforeend', '<p class="error" id="incorrect-email">Must be a valid email</p>');
		}
	} else {
		if (document.getElementById('incorrect-email')) {
			document.getElementById('incorrect-email').remove();
		}
	}
})

// User feed back for invalid password
document.getElementById('password').addEventListener('keyup', function(e) {
	if (e.target.value.length < 6) {
		if (!document.getElementById('incorrect-password')) {
			document.getElementById('form').insertAdjacentHTML('beforeend', '<p class="error" id="incorrect-password">Password must be greater than 6 characters</p>')
		}
	} else {
		if (document.getElementById('incorrect-password')) {
			document.getElementById('incorrect-password').remove();
		}
	}
})

/**
 * Store form data to be used on another page
 */
function saveFormData() {
	localStorage.email = document.getElementsByName('email')[0].value;

	localStorage.name = document.getElementsByName('name')[0].value;
}

/**
 * Valid email source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Safari has some issues with localStorage :(
 */
function warnIfSafari() {
	var ua = navigator.userAgent.toLowerCase(); 
	if (ua.indexOf('safari') != -1) { 
	  if (ua.indexOf('chrome') > -1) {
	  } else {
	    alert('Safari detected, there maybe be some issues with localStorage so there could be issues with dynamic content. Please switch to another browser to test dynamic content.') // Safari
	  }
	}
}
