window.TaskList = window.TaskList || function(){ 
	function RTTaskList (init_list) {
		this.list = init_list;
		
	}

	RTTaskList.prototype.addTask = function (){

	}

	RTTaskList.prototype.delTask = function (){

	}

	RTTaskList.prototype.updateTask = function (){

	}

	function saveListToLS(listObj){
		localStorage.addItem('RTTaskList', JSON.stringify(listObj));
	}

	function readListFromLS () {
		return JSON.parse(localStorage.getItem('RTTaskList'));
	}


	var instance = new RTTaskList ({});
	return instance;
}()