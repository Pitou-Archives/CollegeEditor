var editor_el = document.getElementById('editor_text');
var result = document.getElementById('result');
var isOnline = navigator.onLine;
var active = '';

function WYSIWYG() {
	if (editor_el.value == '') {
		result.innerHTML = '... And see the result here !';
	}
	else {
		result.innerHTML = marked(editor_el.value);
	}
}

var editor = new Behave({
    textarea: editor_el,
    replaceTab: true,
    softTabs: false,
    tabSize: 4,
    autoOpen: true,
    overwrite: true,
    autoStrip: true,
    autoIndent: true,
    fence: false
});

/*BehaveHooks.add('keyup', function(data){
	WYSIWYG();
});

BehaveHooks.add('change', function(data){
	alert('Saved !');
	WYSIWYG();
});*/

/*setInterval(function() {

	WYSIWYG();

}, 3000);*/


//Menu behavior

var menu = document.getElementById("menu"),
	menuBtn = document.getElementById("menu_btn"),
	section = document.getElementById("section");

document.onclick = function() {

	menu.className = "";
	section.className = "";

};

menuBtn.onclick = function(event) {

	if (section.className === "deplace") {

		menu.className = "";
		section.className = "";

	}

	else {

		menu.className = "show";
		section.className = "deplace";

	}

	event.stopPropagation();

};

menu.onclick = function(event) {

	event.stopPropagation();

};


// Editor CRUD Ajax

var saveBtn = document.getElementById('save_btn');
var addBtn = document.getElementById('add_btn');
var addInput = document.getElementById('add_input');
var current = '';

saveBtn.onclick = function() {
	createCourse(current, editor_el.value);
};

addBtn.onclick = function() {
	var name = addInput.value;
	if (name != '') {
		addCourseInList(name);
		switchActiveLi(name);
		createCourse(name, '');
	}
};

function addCourseInList(name) {
	var li = document.createElement('li');
	li.id = 'course_'+name;
	li.setAttribute('onclick', "getCourse('"+name+"')");
	li.innerHTML = name;
	document.getElementById('courses_list').appendChild(li);
	addInput.value = '';
}

function switchActiveLi(name) {
	var li_el = document.getElementById('course_'+name);
	active.className='';
	active=li_el;
	active.className='active';
}

function getCourse(name) {
	if (isOnline) {
		var xhr = loadAjax();
	    xhr.onreadystatechange = function()
	    {
	        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
	        {
	        	var resp = JSON.parse(xhr.responseText);
	        	current = name;
	        	editor_el.value = resp['markdown'];
	        	result.innerHTML = resp['html'];
	        	switchActiveLi(name);
	        }
	    };
	    xhr.open("POST", 'Core/Course.php', true);
	    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhr.send('_action=get&name='+encodeURIComponent(name));
	}
	else {
		alert('Error: Failed to connect to server');
	}
	menuBtn.click();
}

function createCourse(name, content) {
	if (name == '') {
		name = prompt('Course name :');
		if (name == null) {
			return false;
		}
		else {
			addCourseInList(name);
        	switchActiveLi(name);
		}
	}
	
	result.innerHTML = 'Compiling...';
	if (isOnline) {
		var xhr = loadAjax();
	    xhr.onreadystatechange = function()
	    {
	        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
	        {
	        	var resp = JSON.parse(xhr.responseText);
	        	current = name;
	        	result.innerHTML = resp['compiled'];
	        	result.scrollTop = result.innerHTML.length;
	        }
	    };
	    xhr.open("POST", 'Core/Course.php', true);
	    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhr.send('_action=create&name='+encodeURIComponent(name)+'&content='+encodeURIComponent(content));
	}
	else {
    	current = name;
		WYSIWYG();
	}
}

function deleteCourse(name) {
	var xhr = loadAjax();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
        	document.getElementById('courses_list').removeChild(document.getElementById('course_'+name));
        }
    };
    xhr.open("POST", 'Core/Course.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('_action=delete&name='+encodeURIComponent(addInput.value));
}

var timer = setInterval(function(){if(editor_el.value != ''){createCourse(current, editor_el.value)}}, 60000);