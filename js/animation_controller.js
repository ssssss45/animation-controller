class animation_controller
{
	constructor(params)
	{
		this.markArray=[];
		this.instance=params.instance;
		this.hight = params.hight || 200 ;
		this.width = params.width || 200;
		this.scale = params.scale || 1;
		this.container = params.container;
		this.images = this.images||{};
		$.getScript(params.jsLink);
		var container = document.getElementById(this.container);
		//создание stage
		this.canvas = document.createElement("canvas");
		this.canvas.height=this.hight;
		this.canvas.width=this.width;
		this.canvas.style="position: absolute;";
		container.appendChild(this.canvas);

		this.playTime = 0;
		this.marks = params.marks;
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", this.handleFileLoad.bind(this));
		loader.addEventListener("complete", this.handleComplete.bind(this));
		loader.loadManifest(params.manifest);
		this.flippedVertically=false;
		this.flippedHorizontally=false;

		this.boundEventGenerator = this.eventGenerator.bind(this);
		this.loaded=false;
	}

	handleFileLoad(evt)
	{
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}

	handleComplete() 
	{
		this.exportRoot;
		eval("this.exportRoot = new "+this.marks+"()");
		this.stage = new createjs.Stage(this.canvas);

		if (this.instance==undefined)
		{
			this.stage.addChild(this.exportRoot);
			this.timeline=this.exportRoot.instance.timeline._labels;
		}
		else
		{
			eval("this.stage.addChild(this.exportRoot."+this.instance+")");
			eval("this.timeline=this.exportRoot."+this.instance+".timeline._labels");
		}

		this.marks=Object.values(this.timeline);
		this.markNames=Object.getOwnPropertyNames(this.timeline);
		for (var i=0; i<this.marks.length-1; i++)
			{this.markArray[this.marks[i+1]]=this.markNames[i];}
		
		this.stage.update();
		this.width=this.canvas.width;
		this.hight=this.canvas.hight;
		this.stage.scaleX=this.scale;
		this.stage.scaleY=this.scale;
		this.loaded=true;
		var event = new Event('animation_controller: animation loaded');
		this.stage.dispatchEvent(event);
	}
	//отразить относительно вертикальной линии
	flipVertical()
	{
		if (this.flippedVertically)
		{
			this.stage.x=0;
			this.stage.skewY=0;
		}
		else
		{
			this.stage.x=this.canvas.width;
			this.stage.skewY=180;
		}
		this.stage.update();
		this.flippedVertically=!this.flippedVertically;
	}
	//отразить относительно горизонтальной линии
	flipHorizontal()
	{
		if (this.flippedHorizontally)
		{
			this.stage.y=0;
			this.stage.skewX=0;
		}
		else
		{
			this.stage.y=this.canvas.height;
			this.stage.skewX=180;
		}
		this.stage.update();
		this.flippedHorizontally=!this.flippedHorizontally;
	}
	//изменение размера канваса
	setSize(hight,width)
	{
		this.canvas.height = hight;
		this.canvas.width = width;
	}
	//изменение масштаба
	setScale(scale)
	{
		this.stage.scaleY=scale;
		this.stage.scaleX=scale;
	}
	//начать проигрывание
	play()
	{
		if (this.loaded)
		{
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", this.stage);
			createjs.Ticker.addEventListener("tick", this.boundEventGenerator);	
		}
		
	}
	//пауза
	pause()
	{
		if (this.loaded)
		{
			createjs.Ticker.removeEventListener("tick", this.stage);
			createjs.Ticker.removeEventListener("tick", this.boundEventGenerator);
		}
	}
	//проигрывание с метки
	playFromMark(mark)
	{
		this.exportRoot.instance.gotoAndPlay(mark);
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
		createjs.Ticker.removeEventListener("tick", this.boundEventGenerator);
		createjs.Ticker.removeEventListener("tick", this.stage);
		this.canvas.remove();
	}
	//генератор событий на звершение проигрывание секций и анимации целиком
	eventGenerator()
	{
		this.playTime++;
		if (this.markArray[this.playTime]!=undefined)
		{
			var event = new Event('animation_controller: animation section finished playing', {detail: this.markArray[this.playTime]});
			this.stage.dispatchEvent(event);
		}
		if (this.playTime==this.timeline.stop)
		{
			this.playTime=0;
			var event = new Event('animation_controller: animation finished playing');
			this.stage.dispatchEvent(event);
			
		}

	}
}