function loadAjax() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject)
	{
		if (window.ActiveXObject)
		{
			try
			{
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e)
			{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		else
		{
			xhr = new XMLHttpRequest(); 
		}
	}
	else
	{
		alert("Votre navigateur ne supporte pas l'objet XMLHttpRequest");
		return null;
	}
	
	return xhr;
}

function a(url) {
    var xhr = loadAjax();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
        	var regex = /^([\s\S]*)<body>([\s\S]*)<\/body>([\s\S]*)$/;
        	var new_body = xhr.responseText.replace(regex, "$2");
			document.body.innerHTML = xhr.responseText;
			if (!god_damn_ie) {
				window.history.pushState(document.title, document.title, url);
			}
			var ajs = document.getElementsByTagName("ajaxscript");
			for (var i in ajs) {
				eval(ajs[i].innerHTML);
			}
        }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}