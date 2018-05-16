addProjects();

/**
 * Display all projects saved in local storage
 */
function addProjects() {
	if (localStorage.projects) {
		var projects = JSON.parse(localStorage.projects);

		for (var i = 0; i < projects.length; i++) {
			var html = `
			 <a href="project_show.html">
					<div class="project-item material-border mb-2 clickable">
						<div class="project-item-image-container mr-2">
							<img src="assets/images/placeholder.png" alt="Project logo" class="project-logo">
						</div>
						<div class="project-description">
							<h3 class="heading-sm mt-1 mb-0">${projects[i].name}</h3>
							<p>${projects[i].description}</p>
						</div>
					</div>
				</a>
			`;
			document.getElementById('projects').innerHTML += html;
		}
	}
}