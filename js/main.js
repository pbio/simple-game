//person prototype
function person(parent, name, x,y, color) {
    this.name = name;
    this.pos =new vector(x,y);
    
    parent.appendChild(this.create());
    this.color=color;
    if (!this.color) this.color="blue";
    
    document.getElementById(this.name).appendChild(this.clothes());
    document.getElementById(this.name).appendChild(this.hair());
}
//create person method
person.prototype.create = function () {
    return createDiv("human", this.pos, this.name);
};
//clothes method
person.prototype.clothes = function () {
	var temp=createDiv("shirt");
	temp.style.backgroundColor=this.color;
	return temp;
};
//hair method
person.prototype.hair = function () {
	return createDiv("hair");
};

//function to help create a div
function createDiv(className, pos, idName) {
	var elt= document.createElement("div");
	elt.className= className;
	if (idName) elt.id=idName;
	if (pos) {
		elt.style.bottom = pos.y+"px";
		elt.style.left= pos.x+"px";
		}
	
	return elt;
}
//vector object used for position
vector = function(x, y, dir){
	this.x=x;
	this.y=y;
	if (dir) this.dir=dir;
};	



//create the level
function level(parent, envType) {
	this.parent=parent;
	if (envType=="city"){ 
		this.groundColor="gray";
		this.cloudNumber=2;
	}else if (envType=="field"){
	 	this.groundColor="green";
	 	this.cloudNumber=4;
	}else if (envType=="ocean") {
		this.groundColor="blue";
		this.cloudNumber=0;
	}else {
		this.groundColor="brown";
		this.cloudNumber=10;
	}
	parent.appendChild(this.createGround());
	parent.appendChild(this.createSun());
	this.createCloud();
	parent.appendChild(this.selectedPlayerBox());
	window.setInterval(this.moveCloud, 100);
	//window.setInterval(this.moveCloud, 100);
	this.userControl();
}
level.prototype.selectedPlayerBox= function(){
	var tempDiv =createDiv("selected");
	tempDiv.textContent="Select Player";
	return tempDiv;
};

level.prototype.createSun= function(){
	return createDiv("sun");	
};

level.prototype.createGround= function(){
	var temp= createDiv("ground");
	temp.style.backgroundColor=this.groundColor;
	return temp;
};

level.prototype.createCloud= function(){
	for (var i=0; i<this.cloudNumber; i++){
		var dir;
		if (Math.random()>.5) dir="right";
		else dir="left";
		var pos=new vector(Math.random()*800, Math.random()*300+300, dir);
		var temp=createDiv("cloud", pos);
		temp.title=pos.dir; 
		this.parent.appendChild(temp);
	}
};

level.prototype.moveCloud=function(){
	var elementCloud=document.getElementsByClassName("cloud");
	var length= elementCloud.length;
	for (var i=0; i<length; i++) {
		var currentPos= parseInt(elementCloud[i].style.left);
		//change direction if on edges
		if (currentPos<=0) elementCloud[i].title="right"
		else if (currentPos>=1000) elementCloud[i].title="left";
			
		//move
		if (elementCloud[i].title=="right") currentPos+=5;
		else currentPos-=5;
		//if (currentPos) alert(currentPos);
		document.getElementsByClassName("cloud")[i].style.left=currentPos+"px";
	}
};

//prints which human is selected 
//unable to make a prototype method used by a prototype method
function selectHuman(index) {
	
	var tempDir=document.getElementsByClassName("selected")[0];
	var tempId=document.getElementsByClassName("human")[index].id;
	//if (tempId) alert(tempId);
	tempDir.textContent= tempId;
	//document.body.appendChild(tempDir);
}

level.prototype.userControl = function(){
	function selectHuman(index) {
	
		var tempDir=document.getElementsByClassName("selected")[0];
		var tempId=document.getElementsByClassName("human")[index].id;
		//if (tempId) alert(tempId);
		tempDir.textContent= tempId;
		//document.body.appendChild(tempDir);
	}
	function arrows(){
		addEventListener("keydown", function(event){
			var id=document.getElementsByClassName("selected")[0].textContent;
			var focusElement=document.getElementById(id);
			if (!focusElement) return;
		
			if (event.keyCode==38){
				focusElement.style.bottom=(parseInt(focusElement.style.bottom)+20)+"px";
			}
			else if (event.keyCode==40){
				focusElement.style.bottom=(parseInt(focusElement.style.bottom)-20)+"px";
			}
			else if (event.keyCode==39){
				focusElement.style.left=(parseInt(focusElement.style.left)+20)+"px";
			}
			else if (event.keyCode==37){
				focusElement.style.left=(parseInt(focusElement.style.left)-20)+"px";
			}
		});
	}
	//event Listener to select a character. 
	var allHumans=document.getElementsByClassName("human");
	for (var i=0; i<allHumans.length; i++){
		if (i==0) allHumans[i].addEventListener("click", function(){selectHuman(0);});
		if (i==1) allHumans[i].addEventListener("click", function(){selectHuman(1);});
		if (i==2) allHumans[i].addEventListener("click", function(){selectHuman(2);});
	}
	arrows();
};




	