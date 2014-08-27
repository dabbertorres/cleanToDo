var loadedList = false;

function CreateToDo(string)
{
	if(string.length > 0)
	{
		$("ul").append("<li>" + string + "</li>");
		$("input[name=entryForm]").val("");
	}
}

function SaveList()
{
	localStorage.clear();
	
	$("#todoList li").each(function(index, li)
	{
		console.log(index.toString() + ' ' + $(li).text());
		localStorage.setItem(index.toString(), $(li).text());
	});
}

function LoadList()
{
	for(var i = 0, len = localStorage.length; i < len; i++)
	{
		CreateToDo(localStorage.getItem(localStorage.key(i)));
	}
}

$(document).ready(function()
{
	if(!loadedList)
	{
		LoadList();
		loadedList = true;
	}
	
	$("#toDoButton").click(function()
	{
		CreateToDo($("input[name=entryForm]").val());
	});
	
	$(document).keyup(function(event)
	{
		if(event.keyCode == 13)
		{
			CreateToDo($("input[name=entryForm]").val());
		}
	});
	
	$(document).on("click", "#todoList li", function()
	{
		$(this).remove();
	});
	
	// save list when window exits
	$(window).on("beforeunload", function()
	{
		SaveList();
	});
});
