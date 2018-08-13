class animation_controller
{
	constructor(params)
	{
		this.stopLoop=function(){};
		this.markArray=[];
		this.images = this.images||{};
		this.animations=[];
		//создание stage
		this.container = params.animationContainer;
		var container = document.getElementById("animationContainer");
		console.log(container);
		this.canvas = document.createElement("canvas");
		this.canvas.style="position: absolute;";
		container.appendChild(this.canvas);
		this.stage = new createjs.Stage(this.canvas);

		//цепляние js анимации
		for (var i=0; i < params.animationAssets.length;i++)
		{
			var animation = params.animationAssets[i];
			this.loadAnimation(animation.jsLink,animation.manifest,animation.animations);	
		}
		//таймер проигрывания анимации
		this.playTime = 0;
		this.boundEventGenerator = this.eventGenerator.bind(this);
		this.loaded=false;
		//состояние проигрывания
		this.playing=false;
	}

	//загрузка ассетов анимации и добавление анимаций в массив анимаций
	loadAnimation(fileLink,manifest,animations)
	{
		$.getScript(fileLink);	
		var loader = new createjs.LoadQueue(false);
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

	handleComplete() 
	{
		var event = new Event('animation_controller: animation loaded');
		this.stage.dispatchEvent(event);
	}
	//удаление текущей анимации и установка новой анимации в stage
	switchClip(animation, setCanvasToAnimation, scale)
	{
		this.stage.removeAllChildren();
		this.killListeners();
		var animationExistsFlag=false
		//достаём размеры анимации из массива и проверяем что она есть
		for (var i=0; i<this.animations.length; i++)
		{
			if (this.animations[i].name==animation)
			{
				this.animationWidth=this.animations[i].width;
				this.animationHeight=this.animations[i].height;
				animationExistsFlag=true;
			}
		}
		if (animationExistsFlag)
		{
			eval("this.currentAnimation = new "+animation+"()")
			this.stage.addChild(this.currentAnimation);
			//получение таймлайна
			this.timeline=this.currentAnimation.timeline._labels;
			this.marks=Object.values(this.timeline);
			this.markNames=Object.getOwnPropertyNames(this.timeline);
			for (var i=0; i<this.marks.length-1; i++)
				{
					this.markArray[this.marks[i+1]]=this.markNames[i];
				}
			//опциональная установка размеров и масштабов
			if (setCanvasToAnimation)
			{
				this.setSize(this.animationHeight,this.animationWidth);
			}
			if (scale!=undefined)
			{
				this.setScale(scale);
			}
			//отображение анимации на канвасе
			this.stage.update();
		}
		else
		{
			console.log("ANIMATION CONTROLLER ERROR: animation does not exist");
		}
	}
	//отразить относительно вертикальной линии
	flipVertical()
	{
		this.stage.scaleX= -this.stage.scaleX;
		this.stage.x=this.stage.x+this.animationWidth*(-this.stage.scaleX);
		this.stage.update();
	}
	//отразить относительно горизонтальной линии
	flipHorizontal()
	{
		this.stage.scaleY= -this.stage.scaleY;
		this.stage.y=this.stage.y+this.animationHeight*(-this.stage.scaleY);
		this.stage.update();
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
		this.stage.scaleY=scalex;
		this.stage.scaleX=scaley;
	}
	//начать проигрывание
	play()
	{
		this.playing=true;
		createjs.Ticker.setFPS(25);
		createjs.Ticker.addEventListener("tick", this.stage);
		createjs.Ticker.addEventListener("tick", this.boundEventGenerator);	
	}
	//пауза
	pause()
	{
		this.killListeners();
	}
	//проигрывание с метки
	playFromMark(mark)
	{
		this.currentAnimation.gotoAndPlay(mark);
		for (var i=0; i<this.markNames.length;i++)
		{
			if (this.markNames[i]==mark)
			{
				this.playTime=this.marks[i];
			}
		}
	}
	//убирает канвас с анимацией
	destroy()
	{
		this.killListeners();
		this.canvas.remove();
	}
	//очистка stage
	clear()
	{
		this.killListeners();
		this.stage.removeAllChildren();
		this.stage.update();
	}
	//отключение слушателей
	killListeners()
	{
		createjs.Ticker.removeEventListener("tick", this.boundEventGenerator);
		createjs.Ticker.removeEventListener("tick", this.stage);
		this.playing=false;
	}
	//генератор событий на звершение проигрывание секций и анимации целиком
	eventGenerator()
	{
		this.playTime++;
		if (this.markArray[this.playTime]!=undefined)
		{
			var event = new CustomEvent('animation_controller: animation section finished playing', {'detail': this.markArray[this.playTime]});
			this.stage.dispatchEvent(event);
		}
		if (this.playTime==this.timeline.stop)
		{
			this.playTime=0;
			var event = new Event('animation_controller: animation finished playing');
			this.stage.dispatchEvent(event);
		}
	}
	//проигрывать анимацию с метки from до метки to (включительно), после чего проигрывание останавливается
	playFromTo(from, to,loop)
	{
		this.stopLoop();
		this.playFromMark(from);
		var boundStopPlayback=stopPlayback.bind(this);
		this.stage.addEventListener('animation_controller: animation section finished playing', boundStopPlayback);
		this.stopLoop=function(){this.stage.removeEventListener('animation_controller: animation section finished playing', boundStopPlayback);};
		function stopPlayback(event)
		{
			if(event.detail==to)
			{
				if (loop)
				{
					this.playFromMark(from);
				}
				else
				{
					this.stage.removeEventListener('animation_controller: animation section finished playing', boundStopPlayback);
					this.killListeners();
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
		this.stage.addEventListener('animation_controller: animation section finished playing', boundPutNext);
		this.stopLoop=function(){this.stage.removeEventListener('animation_controller: animation section finished playing', boundPutNext);}
		
		function putNext()
		{
			if (count<list.length)
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
					this.killListeners();
				}
			}
		}
	}
	//отключение цикла для playSet и playFromTo
	stopPlaySetLoop()
	{
		this.stopLoop();
		this.killListeners();
	}
	//метод создания анимаций в DOMах с определенным параметром
	spawn()
	{
		var elementList = document.querySelectorAll("div");
	}
}