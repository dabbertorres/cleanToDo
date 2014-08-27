var loadedList = false;

function CreateToDo(string)
{
	if(string.length > 0)
	{
		$("#toDoList").append("<li>" + string + "</li>");
		$("#toDoForm").val("");
	}
}

function SaveList()
{
	localStorage.clear();
	
	$("#toDoList li").each(function(index, li)
	{
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
	
	$(document).on("click", "#toDoList li", function()
	{
		$(this).animate(
		{
			opacity: 0
		}, 400, "linear", function()
		{
			$(this).remove();
		});
	});
	
	// save list when window exits
	$(window).on("beforeunload", function()
	{
		SaveList();
	});
});
