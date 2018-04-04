addNameToNavBar();

function addNameToNavBar() {
	var dropbtn = document.getElementById('dropbtn');
	dropbtn.innerHTML = localStorage.name + ' ' + dropbtn.innerHTML;
}

document.getElementById('dropbtn').addEventListener('click', function() {
	document.getElementById('dropdown-list').classList.toggle('show');
});

window.onclick = function (event) {
	if (!event.target.matches('#dropbtn')) {
		var dropdown = document.getElementById('dropdown-list');
		if (dropdown.classList.contains('show')) {
			dropdown.classList.remove('show');
		}
	}
};


