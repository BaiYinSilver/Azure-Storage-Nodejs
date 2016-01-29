$(document).ready(function(){
	var canvas = $("#canvas")[0], ctx = canvas.getContext("2d"), w = $("#canvas").width(), h = $("#canvas").height();
	
	var cw = 20, d, apple, score, snake_arr;
	
    var imageUp = new Image()
	imageUp.src = "img/up.png";
	var imageDown = new Image()
	imageDown.src = "img/down.png";
    var imageLeft = new Image()
	imageLeft.src = "img/left.png";
	var imageRight = new Image()
	imageRight.src = "img/right.png";
    
    var img = new Image();
    img.src = 'img/grass.jpg';
    
	function createSnake() {
		var init_length = 5;
        snake_arr = [];
		for(var i = init_length-1; i>=0; i--) {
			snake_arr.push({x: i, y:0, direction: d});
		}
	}
	
	function createApple(){
		apple = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
	
	function paint() {
		var headX = snake_arr[0].x;
		var headY = snake_arr[0].y;
		if(d == "right") headX++;
		else if(d == "left") headX--;
		else if(d == "up") headY--;
		else if(d == "down") headY++;
		
		if(headX == -1 || headX == w/cw || headY == -1 || headY == h/cw || checkEat(headX, headY, snake_arr)) {
			clearInterval(game_loop);
            var dataURL = canvas.toDataURL("image/jpg");
            $('.final-screenshot img').attr("src",dataURL);
            saveImage(dataURL);
			return;
		}
		
        ctx.drawImage(img,0,0);
        
		if(headX == apple.x && headY == apple.y) {
			var tail = {x: headX, y: headY, direction: d};
			score++;
			createApple();
		} else {
			var tail = snake_arr.pop();
			tail.x = headX; 
            tail.y = headY; 
            tail.direction = d;
		}
		snake_arr.unshift(tail);
		
		for(var i = 0; i < snake_arr.length; i++) {
			var c = snake_arr[i];
			drawCell(c.x, c.y, c.direction, i%2);
		}
		
		drawCell(apple.x, apple.y);
        
		var score_text = "Score: " + score;
        
        var gradient=ctx.createLinearGradient(0,0,130,0);
        gradient.addColorStop("0","white");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","yellow");
        ctx.font="30px Verdana";
        ctx.fillStyle=gradient;
		ctx.fillText(score_text, 5, h-5);
	}
	
	function drawCell(x, y, direction, swing) {
        switch(direction){
            case undefined:
                ctx.fillStyle = "red";
                ctx.fillRect(x*cw, y*cw, cw, cw);
                ctx.strokeStyle = "white";
                ctx.strokeRect(x*cw, y*cw, cw, cw);
                break;
            case 'right':
                swing === 0 ? ctx.drawImage(imageRight, x*cw, y*cw) : ctx.drawImage(imageRight, x*cw, y*cw);
                break;
            case 'left':
                swing === 0 ? ctx.drawImage(imageLeft, x*cw, y*cw) : ctx.drawImage(imageLeft, x*cw, y*cw);
                break;
            case 'up':
                swing === 0 ? ctx.drawImage(imageUp, x*cw, y*cw) : ctx.drawImage(imageUp, x*cw, y*cw);
                break;
            case 'down':
                swing === 0 ? ctx.drawImage(imageDown, x*cw, y*cw) : ctx.drawImage(imageDown, x*cw, y*cw);
                break;
        }
	}
	
	function checkEat(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
	})
    
    window.polyglot = new Polyglot();
    var lang_en = {
        "score": "Score",
        "game_title":"Snake",
        "hello_name": "Hello, %{name}."
    },
    lang_es = {
        "score": "Puntuacion",
        "game_title":"Serpiente",
        "hello_name": "Hola %{name}."
    };
    
    polyglot.extend(lang_en);
    $('.score_text').text(polyglot.t('score'));
    $('head title').html(polyglot.t('game_title'));
    
    $('.language-switch button').on('click',function(e){
        if($(e.target).hasClass('en')){
            polyglot.extend(lang_en);
        } else if ($(e.target).hasClass('es')){
            polyglot.extend(lang_es);
        }
        $('.score_text').text(polyglot.t('score'));
        $('head title').html(polyglot.t('game_title'));
    });
    $('.restart').on('click', function(){
        init();
    });
	
	function init()
	{
		d = "right";
		createSnake();
		createApple();
        
		score = 0;
		game_loop = setInterval(paint, 100);
	}
	init();
});

var saveImage = function(imgString){
    var jqxhr = $.post( "/addtask", 'item%5Bname%5D=222&item%5Bcategory%5D=233'+ imgString )
    //var jqxhr = $.post( "/addtask", 'item%5Bname%5D=222&item%5Bcategory%5D=233' )
    .done(function() {
        alert( "second success" );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "finished" );
    });
}