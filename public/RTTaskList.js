window.TaskList = window.TaskList || function(){ 
	function TaskList (init_list) {
		this.list = init_list;
		
	}

	TaskList.prototype.addTaskObj = function (task){
		var list = readListFromLS();
		task.id = Date.now();
		list.push(task);
		saveListToLS(list);
	}

	TaskList.prototype.delTaskId = function (){

	}

	TaskList.prototype.updateTaskId = function (){

	}

	TaskList.prototype.getFullListArr = function(){
		return JSON.parse(localStorage.getItem('RTTaskList'));
	}

	function saveListToLS(listArr){
		var arrString = JSON.stringify(listArr);
		localStorage.setItem('RTTaskList', arrString);
	}

	function readListFromLS () {
		var rawList = localStorage.getItem('RTTaskList');
		if (rawList === null){
			saveListToLS({});
			return [];
		} else {
			return JSON.parse(rawList);
		}
	}

	function getListLength (){
		var list = readListFromLS();
		if (list === null) {
			return 0;
		} else {
			return list.length;
		}
	}

	function getSingleTaskById (id) {
		for(var i= 0; i < getListLength(); i++){
			if(list[i].id === id) return list[i];
		}
	}


	var instance = new TaskList ({});
	return instance;
}()