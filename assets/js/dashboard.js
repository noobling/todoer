
addNameToNavBar();

addProjects();

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

function addNameToNavBar() {
	var dropbtn = document.getElementById('dropbtn');
	dropbtn.innerHTML = localStorage.name + ' ' + dropbtn.innerHTML;
}

function addProjects() {
	var projects = JSON.parse(localStorage.projects);

	for (var i = 0; i < projects.length; i++) {
		var html = `
			<div class="project-item material-border mb-2">
			<div class="image-box mr-2">
				<img src="assets/images/placeholder.png" alt="Project logo" class="project-logo">
			</div>
			<div class="project-description">
				<h3 class="heading-sm mt-1 mb-0">${projects[i].name}</h3>
				<p>${projects[i].description}</p>
			</div>
		</div>
		`;
		document.getElementById('projects').innerHTML += html;
	}
}