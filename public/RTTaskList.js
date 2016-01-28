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

	TaskList.prototype.delTaskId = function (id){
		var targetTask = getSingleTaskById(id);
		var list = readListFromLS();
		delete list[targetTask.index];
		var newList = list.slice(0,targetTask.index).concat(list.slice(targetTask.index +1, list.length));
		saveListToLS(newList);
	}

	TaskList.prototype.updateTaskIdObj = function (id, newTask){
		var targetTask = getSingleTaskById(id);
		var list = readListFromLS();
		newTask.id = id;
		list[targetTask.index] = newTask;
		saveListToLS(list);
	}

	TaskList.prototype.getFullListArr = function(){
		return JSON.parse(localStorage.getItem('RTTaskList'));
	}

	function saveListToLS(listArr){
		var arrString = listArr === null ? [] : JSON.stringify(listArr);
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
		var taskObj = {};
		var list = readListFromLS();
		for(var i= 0; i < getListLength(); i++){
			if(list[i].id === id) {
				taskObj.task = list[i];
				taskObj.index = i;
			}
		}
		return taskObj;
	}


	var instance = new TaskList ({});
	return instance;
}()