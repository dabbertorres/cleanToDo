var loadedList = false;

function CreateToDo(string)
{
	if(string.length > 0)
	{
		var newToDo = $("<li>" + string + "</li>").hide().fadeIn(400, "linear");
		$("#toDoList").append(newToDo);
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
		CreateToDo($("#toDoForm").val());
	});
	
	$(document).keyup(function(event)
	{
		if(event.keyCode == 13)
		{
			CreateToDo($("#toDoForm").val());
		}
	});
	
	$(document).on("click", "#toDoList li", function()
	{
		$(this).animate(
		{
			opacity: 0,
			left: '+=150px'
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
