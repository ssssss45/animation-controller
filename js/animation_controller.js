class animation_controller
{
	constructor(params)
	{
		this.hight = params.hight || 200 ;
		this.width = params.width || 200;
		this.scale = params.scale || 1;
		this.container = params.container;
		this.images = this.images||{};
		var container = document.getElementById(this.container);
		console.log(container);
		//создание stage
		this.canvas = document.createElement("canvas");
		this.canvas.height=this.hight;
		this.canvas.width=this.width;
		this.canvas.style="position: absolute;";
		container.appendChild(this.canvas);
		this.marks = params.marks;
		console.log(params.manifest);
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", this.handleFileLoad.bind(this));
		loader.addEventListener("complete", this.handleComplete.bind(this));
		loader.loadManifest(params.manifest);
		this.flippedVertically=false;
		this.flippedHorizontally=false;
	}
	handleFileLoad(evt)
	{
		if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	}

	handleComplete() 
	{
		var exportRoot;
		eval("exportRoot = new "+this.marks+"()");
		this.stage = new createjs.Stage(this.canvas);
		this.stage.addChild(exportRoot);
		this.stage.update();
		createjs.Ticker.setFPS(25);
		createjs.Ticker.addEventListener("tick", this.stage);
		this.width=this.canvas.width;
		this.hight=this.canvas.hight;
		this.stage.scaleX=this.scale;
		this.stage.scaleY=this.scale;
	}

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
		this.flippedVertically=!this.flippedVertically;
	}

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
		this.flippedHorizontally=!this.flippedHorizontally;
	}
}