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



//Menu behavior

var menu = document.getElementById('menu');
var menuBtn = document.getElementById('menu_btn');

document.onclick = function() {
	document.body.style.marginLeft = '-250px';
};

menuBtn.onclick = function(e) {
	if (document.body.style.marginLeft == '-250px') {
		document.body.style.marginLeft = '0px';
	}
	else {
		document.body.style.marginLeft = '-250px';
	}
	e.stopPropagation();
};

menu.onclick = function(e) {
	e.stopPropagation();
};

document.body.style.marginLeft = '-250px';



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
	addCourseInList(name);
	switchActiveLi(name);
	createCourse(name, '');
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
	li_el.className='active';
	active.className='';
	active=li_el;
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
		alert('Impossible: Failed to connect to server');
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
	        	switchActiveLi(name);
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