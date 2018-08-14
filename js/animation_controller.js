//для работы необходим jQuery
class animation_controller
{
	constructor(params)
	{
		//инициализация функций и массивов
		this.stopLoop = function(){};
		this.markArray =[];
		this.images = this.images||{};
		this.animations = [];

		//создание stage
		this.container = params.animationContainer;
		var container = document.getElementById("animationContainer");
		this.canvas = document.createElement("canvas");
		this.canvas.style ="position: absolute;";
		container.appendChild(this.canvas);
		this.stage = new createjs.Stage(this.canvas);

		//загрузка анимаций из списка
		for (var i = 0; i < params.animationAssets.length;i++)
		{
			var animation = params.animationAssets[i];
			this.loadAnimation(animation.jsLink,animation.manifest,animation.animations);	
		}

		//таймер проигрывания анимации
		this.playTime = 0;
		this.boundEventGenerator = this.eventGenerator.bind(this);

		//FPS
		this.fps = 25;
	}

	//загрузка ассетов анимации и добавление анимаций в массив анимаций
	loadAnimation(fileLink,manifest,animations)
	{
		$.getScript(fileLink);	
		var loader = new createjs.LoadQueue(false);

		//слушатели на события загрузки файлов и окончание их загрузки
		loader.addEventListener("fileload", this.handleFileLoad.bind(this));
		loader.addEventListener("complete", this.handleComplete.bind(this));
		loader.loadManifest(manifest);

		for (var j = 0; j < animations.length; j++)
		{
			this.animations.push(animations[j]);
		}
	}

	handleFileLoad(evt)
	{
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}

	//генерация события по завершению загрузки анимации
	handleComplete() 
	{
		var event = new Event('animation_controller: animation loaded');
		this.stage.dispatchEvent(event);
	}

	//удаление текущей анимации и установка новой анимации в stage
	switchClip(animation, setCanvasToAnimation, scale)
	{
		//удаление предыдущей анимации, остановка таймера и сброс параметров
		this.stage.removeAllChildren();
		this.stage.x = 0;
		this.stage.y = 0;
		this.stage.scaleX = 1;
		this.stage.scaleY = 1;
		this.killListeners();
		this.playTime = 0;

		//флаг существования анимации
		var animationExistsFlag = false;

		//достаём размеры анимации из массива и проверяем что она есть
		for (var i = 0; i<this.animations.length; i++)
		{
			if (this.animations[i].name == animation)
			{
				this.animationWidth = this.animations[i].width;
				this.animationHeight = this.animations[i].height;
				this.fps = this.animations[i].fps || 25;
				animationExistsFlag = true;
			}
		}

		if (animationExistsFlag)
		{

			//опциональная установка размеров и масштабов
			if (setCanvasToAnimation)
			{
				this.setSize(this.animationHeight,this.animationWidth);
			}
			if (scale != undefined)
			{
				this.setScale(scale);
			}

			//создание объекта анимации
			eval("this.currentAnimation = new " + animation + " ()");

			//добавление анимации на stage
			this.stage.addChild(this.currentAnimation);

			//получение таймлайна
			this.timeline = this.currentAnimation.timeline._labels;
			
			//массив меток
			this.marks = Object.values(this.timeline);

			//массив названий меток
			this.markNames = Object.getOwnPropertyNames(this.timeline);

			//массив названий меток по индексам концов меток
			for (var i = 0; i < this.marks.length - 1; i++)
				{
					this.markArray[this.marks[i + 1]] = this.markNames[i];
				}

			//остановка анимации
			this.currentAnimation.stop();
			//отображение анимации на канвасе
			this.stage.update();
		}
		else
		{
			//вывод сообщения в консоль если запрошенной анимаии не существует
			console.log("ANIMATION CONTROLLER ERROR: animation does not exist");
		}
	}

	//отразить относительно вертикальной линии
	flipVertical()
	{
		this.stage.scaleX = - this.stage.scaleX;
		if (this.stage.scaleX > 0) 
			{
				this.stage.x = this.stage.x - this.animationWidth;
			}
			else
			{
				this.stage.x = this.stage.x + this.animationWidth;
			}
		this.stage.update(0);
	}

	//отразить относительно горизонтальной линии
	flipHorizontal()
	{
		this.stage.scaleY = - this.stage.scaleY;
		if (this.stage.scaleY > 0) 
			{
				this.stage.y = this.stage.y - this.animationHeight;
			}
			else
			{
				this.stage.y = this.stage.y + this.animationHeight;
			}
		this.stage.update(0);
	}

	//изменение размера канваса
	setSize(hight,width)
	{
		this.canvas.height = hight;
		this.canvas.width = width;
	}

	//изменение масштаба
	setScale(scalex,scaley)
	{
		if( scaley === undefined) scaley = scalex;
		this.stage.scaleY = scalex;
		this.stage.scaleX = scaley;
	}

	//начать проигрывание
	play()
	{
		this.currentAnimation.play();
		createjs.Ticker.setFPS(this.fps);
		createjs.Ticker.addEventListener("tick", this.stage);
		createjs.Ticker.addEventListener("tick", this.boundEventGenerator);	
	}

	//пауза
	pause()
	{
		this.killListeners();
		this.currentAnimation.stop();
	}

	//проигрывание с метки
	playFromMark(mark)
	{
		this.currentAnimation.gotoAndPlay(mark);
		for (var i = 0; i < this.markNames.length;i++)
		{
			if (this.markNames[i] == mark)
			{
				this.playTime = this.marks[i];
			}
		}
	}

	//убирает канвас с анимацией
	destroy()
	{
		this.pause();
		this.canvas.remove();
	}

	//очистка stage
	clear()
	{
		this.pause();
		this.stage.removeAllChildren();
		this.stage.update();
	}

	//отключение слушателей
	killListeners()
	{
		createjs.Ticker.removeEventListener("tick", this.boundEventGenerator);
		createjs.Ticker.removeEventListener("tick", this.stage);
	}

	//генератор событий на звершение проигрывание секций и анимации целиком. происходит каждый тик
	eventGenerator()
	{
		this.playTime++;
		//конец метки
		if (this.markArray[this.playTime] != undefined)
		{
			var event = new CustomEvent('animation_controller: animation section finished playing', {'detail': this.markArray[this.playTime]});
			this.stage.dispatchEvent(event);
		}
		//конец анимации
		if (this.playTime == this.timeline.stop)
		{
			this.playTime = 0;
			var event = new Event('animation_controller: animation finished playing');
			this.stage.dispatchEvent(event);
		}
	}

	//проигрывать анимацию с метки from до метки to (включительно), после чего проигрывание останавливается. зацикливается если loop==true
	playFromTo(from, to, loop)
	{
		this.stopLoop();
		this.playFromMark(from);
		var boundStopPlayback = stopPlayback.bind(this);
		//слушатель на событие конца проигрывания метки
		this.stage.addEventListener('animation_controller: animation section finished playing', boundStopPlayback);
		//запоминание функции остановки слушателя
		this.stopLoop = function(){this.stage.removeEventListener('animation_controller: animation section finished playing', boundStopPlayback);};
		//функция остановки или перехода в начало, если зациклено
		function stopPlayback(event)
		{
			if(event.detail == to)
			{
				if (loop)
				{
					this.playFromMark(from);
				}
				else
				{
					this.stage.removeEventListener('animation_controller: animation section finished playing', boundStopPlayback);
					this.pause();
				}
			}
		}
	}

	//проигрывание списка анимаций. зацикленно если loop==true
	playSet(list,loop)
	{
		this.stopLoop();
		var count = 1;
		this.playFromMark(list[0]);
		var boundPutNext =  putNext.bind(this);
		//слушатель на событие конца проигрывания метки
		this.stage.addEventListener('animation_controller: animation section finished playing', boundPutNext);
		//запоминание функции остановки слушателя
		this.stopLoop = function(){this.stage.removeEventListener('animation_controller: animation section finished playing', boundPutNext);}
		//функция перехода на следующую метку из списка или остановки, если не зациклено
		function putNext()
		{
			//переход к следующему элементу если не конец, переход в начало или отключение слушателя, если конец
			if (count < list.length)
			{
				this.playFromMark(list[count]);
				count++;
			}
			else
			{
				if (loop)
				{
					count = 0;
				}
				else
				{
					this.stage.removeEventListener('animation_controller: animation section finished playing', boundPutNext);
					this.pause();
				}
			}
		}
	}

	//отключение цикла для playSet и playFromTo
	stopPlayLoop()
	{
		this.stopLoop();
		this.pause();
	}
}