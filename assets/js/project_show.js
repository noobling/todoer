initialiseTodoList();
addTodos();

/**
 * Filter by user entered search value
 * Search is case insensitive
 */
document.getElementById('filter-search').addEventListener('keyup', function () {
	var filter = document.getElementById('filter-search').value.toUpperCase();
	var items = document.getElementsByClassName('todo-item');

	// Hide all todo items that don't have the user entered `filter` in its heading 
	for (var i = 0; i < items.length; i++) {
		if (items[i].getElementsByTagName('h3')[0].innerHTML.toUpperCase().indexOf(filter) > -1) {
			items[i].style.display = '';
		} else {
			items[i].style.display = 'none';
		}
	}
});

document.getElementById('todo-filter-relevant').addEventListener('click', function (e) {
	e.target.classList.add('active');
	document.getElementById('todo-filter-priority').classList.remove('active');	
	// Do some magic to make it seem like things were sorted
	hideTodos();
	shuffleTodos();
	addTodos();
})

document.getElementById('todo-filter-priority').addEventListener('click', function (e) {
	e.target.classList.add('active');
	document.getElementById('todo-filter-relevant').classList.remove('active');
	// Do some magic to make it seem like things were sorted
	hideTodos();
	shuffleTodos();
	addTodos();
})

/**
 * Populate local storage todo list with some data in non exists
 */
function initialiseTodoList() {
	if (! localStorage.todos) {
		var todos = [
			{
				name: 'Create event page',
				description: 'This is a difficult task we need more people on this',
				tags: ['Coding', 'Event'],
				priority: 'high-priority',
				dueDate: '2018-4-29',
				teamMembers: 'David Yu • Jack Wang'
			},
			{
				name: 'Buy some coffee',
				description: 'Someone needs to do this because it is very important',
				tags: ['Food', 'Fun'],
				priority: 'medium-priority',
				dueDate: '2018-4-22',
				teamMembers: 'Jack Wang'
			},
			{
				name: 'Open the mail',
				description: 'Well someone needs to do this',
				tags: ['Time', 'Walking'],
				priority: 'medium-priority',
				dueDate: '2018-4-21',
				teamMembers: 'David Yu • Jack Wang'
			},
			{
				name: 'Take out the trash',
				description: 'Go to the backyard that is where all the trash is',
				tags: ['Fun', 'Needed'],
				priority: 'low-priority',
				dueDate: '2018-3-20',
				teamMembers: 'David Yu • Jack Wang'
			},
			{
				name: 'Buy some chairs',
				description: 'Go to the warehouse to get the chairs',
				tags: ['Finance', 'Money'],
				priority: 'high-priority',
				dueDate: '2018-4-11',
				teamMembers: 'David Yu • Jack Wang'
			}
		];

		localStorage.todos = JSON.stringify(todos);		
	}

}

/**
 * Adds todo in local storage to page
 * 
 * Requires moment js library
 */
function addTodos() {
	if (localStorage.todos) {
		var todos = JSON.parse(localStorage.todos);

		for (var i = 0; i < todos.length; i++) {
			var html = `
			<div class="todo-item card-horizontal mb-2">
				<div>
					<h3 class="heading-sm m0 mb-1 ${todos[i].priority}">${todos[i].name}</h3>
					<p>${todos[i].teamMembers}</p>
					<ul class="tags">
						<li class="tag">${todos[i].tags[0]}</li>
						<li class="tag">${todos[i].tags[1]}<li>
					</ul>
				</div>
				<div>
					<p class="time-remaining mb-2">${moment(todos[i].dueDate).fromNow().toUpperCase()}</p>
	
					<a href="todo_show.html?default=false" class="btn btn-primary">
						Edit
						<i class="far fa-edit"></i>
					</a>
				</div>
			</div>
			`
	
			document.getElementById('todo-item-list').insertAdjacentHTML('beforeend', html);
		}
	}
}

/**
 * Remove all existing todos
 */
function hideTodos() {
	var items = document.getElementsByClassName('todo-item');
	var len = items.length
	for (var i = 0; i < len; i++) {
		items[0].remove();
	}
}

/** 
 * Moves elements around in todo array stored in local storage
 */
function shuffleTodos() {
	if (localStorage.todos) {
		var todos = JSON.parse(localStorage.todos);
		localStorage.todos = JSON.stringify(todos.reverse());
	}
}