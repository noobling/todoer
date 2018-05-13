document.getElementById('submit').addEventListener('click', function() {
	initialiseProjectsList();
	
	saveFormData();
});

/**
 * Create an empty array in none exists for projects key in local storage
 */
function initialiseProjectsList() {
	if (! localStorage.projects) {
		var projectList = [];
		localStorage.projects = JSON.stringify(projectList);
	}
}

/**
 * Save project data to be used on another page
 */
function saveFormData() {
	var project = projectObj(); 

	project.name = document.getElementsByName('name')[0].value;
	project.description = document.getElementsByName('description')[0].value;
	project.team = document.getElementsByName('team')[0].value;

	var projectList = JSON.parse(localStorage.projects);

	projectList.unshift(project);

	localStorage.projects = JSON.stringify(projectList);	
}

function projectObj() {
	return {
		name: '',
		description: '',
		team: ''
	};
}