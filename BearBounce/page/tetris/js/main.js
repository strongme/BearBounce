var ctx, ctxDebug;// 2D画布  
var NUM_COL = 10, NUM_ROWS = 20, NUM_BLOCKS = 16;
var screenWidth, screenHeight;// 画布尺寸
var blockWidth, blockHeight;
var curTetris, nextTetris, demoTetris;
var fallDownCount = 0;     
var gameEngine;
var backGround = new Image();
var boomImages =  new Array(10);
var soundLineComplete = new Audio("./sound/LineComplete.wav");

//$(function(){
function Exploder() {
    this.explodeImgInx = -1;
    this.lastExplodeTime = null;
    this.clearedRows = new Array();
    this.curRow = 0;
    this.alive = false;
}

Exploder.prototype.addRow = function(row) {
    this.clearedRows.push(row);
    if (this.alive == false) {
        this.alive = true;
        this.explodeImgInx = 0;
        this.curRow = 0;
        this.lastExplodeTime = new Date().getTime();
    }
}

Exploder.prototype.stop = function() {
    this.alive = false;
    this.clearedRows = [];
    addjustDemoTetris();
}

Exploder.prototype.animateBooms = function(ctx) {
    if (!this.alive) 
        return;
 
    var i = 0, j = 0, k = 0;
    var top = 0, row = 0;
    // 爆炸开始，清空所有FullLine
    if (0 == this.explodeImgInx) {
        for (i = 0; i < this.clearedRows.length; i++) {
            row =  this.clearedRows[i];
            for (j = 0; j < NUM_COL; j++)
                gameEngine.panelMatrix[row * NUM_COL + j] = 0;
        }
    }
    // 逐行显示爆炸效果
    var inx = this.explodeImgInx;
    for (i = 0; i < this.clearedRows.length; i++) {
        top = this.clearedRows[i] * blockHeight;
        for (j = 0; j < NUM_COL; j++)
            ctx.drawImage(boomImages[inx], j * blockWidth, top, blockWidth, blockHeight);
    }
    // 根据时间调整爆炸效果图索引，如果已经是最后一张，那么调整panelMatrix，爆炸结束
    var interval = (new Date().getTime() - this.lastExplodeTime);
    if (interval > 100) {
        this.lastExplodeTime = new Date().getTime();
        ++this.explodeImgInx;
        if (this.explodeImgInx >= boomImages.length) {
             for (i = 0; i < this.clearedRows.length; i++) {
                row =  this.clearedRows[i];
                for (j = row; j > 0; j--) {
                    for (k = 0; k < NUM_COL; k++)
                        gameEngine.panelMatrix[j * NUM_COL + k] = gameEngine.panelMatrix[(j-1) * NUM_COL + k];
                }
                for (k = 0; k < NUM_COL; k++)
                    gameEngine.panelMatrix[k] = 0;
            }
            this.stop();
        }
    }
}

function GameEngine() {
    this.panelMatrix = new Array(NUM_COL * NUM_ROWS);
    for (var i = 0; i < this.panelMatrix.length; i++)
        this.panelMatrix[i] = 0;
    this.exploder = new Exploder();
    this.offsetX = 0;
    this.offsetY = 0;
    this.gameBoardWidth = screenWidth;
    this.gameBoardHeight = screenHeight;
    blockWidth = this.gameBoardWidth / NUM_COL;
    blockHeight = this.gameBoardHeight / NUM_ROWS;
}

GameEngine.prototype.drawBackground = function(ctx) {
    var ptrn = ctx.createPattern(backGround, 'repeat');  
    ctx.fillStyle = ptrn;
    var delta = 12;
    ctx.fillRect(this.offsetX, this.offsetY, this.gameBoardWidth, this.gameBoardHeight);
  
    var color = '#FD0';
    //var color = 'rgba(0, 220, 123, 0.5)';
    for (var i = 0; i < this.panelMatrix.length; i++) {
        if (this.panelMatrix[i] > 0) {
            var left = (i % NUM_COL) * blockWidth;
            var top = parseInt(i / NUM_COL) * blockHeight;
            drawBlock(ctx, left, top, color);
       }
    }
}

GameEngine.prototype.placeTetris = function(ctx, tetris) {
    var start = tetris.direction * NUM_BLOCKS;
    for (var i = 0; i < NUM_BLOCKS; i++) {
        if (tetris.blocks[start + i] > 0) {
            var col = tetris.col + i % 4;
            var row = tetris.row + parseInt(i / 4);
            var inx = row * NUM_COL + col;
            this.panelMatrix[inx] = 1;
        }
   	}
   	this.clearLines(ctx);
}

function addjustDemoTetris() {
    if (demoTetris) {
        demoTetris.row = curTetris.row;
        demoTetris.col = curTetris.col;
        demoTetris.direction = curTetris.direction;
        while(fallDown(demoTetris) > 0);
    }
}

GameEngine.prototype.getDemoTetris = function(tetris) {
    var demoTetris = objClone(tetris, Tetris);
    demoTetris.color = 'rgba(8, 12, 9, 0.1)';
    while(fallDown(demoTetris) > 0);
    return demoTetris;
}

GameEngine.prototype.clearLines = function(ctx) {
    var i, j, num = 0, score = 0;
    var bFullLine;
    for (i = 0; i < NUM_ROWS; i++) {
        bFullLine = 1;
        for (j = 0; j < NUM_COL; j++) {
            if (this.panelMatrix[i * NUM_COL + j] < 1) {
                bFullLine = 0;
                break;
            }
        }
        if (bFullLine == 1) {
            this.clearLine(i);
            num++;
        }
    }
    if (num > 0)
        document.getElementById("Score").value = parseInt(document.getElementById("Score").value) + (2 * num - 1);
}

GameEngine.prototype.clearLine = function(row) {
    soundLineComplete.play();
    this.exploder.addRow(row);
}

// 调试输出
function log(message) {
     document.getElementById('debugOutput').innerHTML += message;
     //ctxDebug.fillText(message, 10, 10);
}

var getRandomColor1 = function() {  
    return 'rgb(' + Math.floor(Math.random() * 0xFF) + ',' 
        + Math.floor(Math.random() * 0xFF) + ',' + Math.floor(Math.random() * 0xFF) + ')';  
}  

var getRandomColor = function() {  
    return 'rgba(' + Math.floor(Math.random() * 0xFF) + ',' 
        + Math.floor(Math.random() * 0xFF) + ',' + Math.floor(Math.random() * 0xFF) + ',' + 0.6 + ')';  
}  

var getRandomColor3 = function(){  
    return '#'+(Math.random()*0xffffff<<0).toString(16);  
}  

function loadImages() {
    backGround.src = './images/wallpaper.png';
    // Boom
    for (var i = 0; i < boomImages.length; i++) {
    boomImages[i] = new Image();
    boomImages[i].src = "images/boom_" + (i+1) + ".ico";
    }
}

/*  
function initGames() {
     for (var i = 0; i < panelMatrix.length; i++)
        panelMatrix[i] = 0;
     curTetris = getRandomTetris();
     nextTetris = getRandomTetris();
     setInterval(gameLoop, 10);
}*/

function Tetris() {   
    this.row = 1;
    this.col = 1;
    this.direction = 0;
    this.blocks = null;
    
    function Paint(ctx){
         ctx.fillStyle = this.color;
         ctx.fillRect(this.left, this.top, this.left + blockWidth, this.top + blockWidth);
    }
}
function LongTetris(){
    this.blocks = new Array(0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
                            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0);
}
LongTetris.prototype = new Tetris();

function SquareTetris(){
    this.blocks = new Array(0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0);
}
SquareTetris.prototype = new Tetris();

function ZTetris(){
    this.blocks = new Array(0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0);
}
ZTetris.prototype = new Tetris();
    
function RevertZTetris(){
    this.blocks = new Array(0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0,
                            0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0);
}
RevertZTetris.prototype = new Tetris();

function LTetris(){
    this.blocks = new Array(0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0,
                            0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0);
}
LTetris.prototype = new Tetris();

function RevertLTetris(){
    this.blocks = new Array(0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0);
}
RevertLTetris.prototype = new Tetris();

function TTetris(){
    this.blocks = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 
                            0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0);
}
TTetris.prototype = new Tetris();

function CrossTetris(){
    this.blocks = new Array(0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
                            0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0);
}
CrossTetris.prototype = new Tetris();

function ConcaveTetris(){
    this.blocks = new Array(0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0,
                            0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0);
}
ConcaveTetris.prototype = new Tetris();

function objClone(obj, creator){ 
    var result = new   creator(); 
    for (var i in obj) 
        result[i] = obj[i] 
    return result;
} 

function getRandomTetris()
{
    var NUM_TETRIS = 7;
    if (document.getElementById("ComplexTetris").checked)
        NUM_TETRIS = 9;
    var inx = Math.floor(Math.random() * NUM_TETRIS);
    if (inx >= NUM_TETRIS)
        inx = NUM_TETRIS - 1;
     
    var tetris = null;
    //inx = 8;
    switch(inx) {
    case 0:
        tetris = new LongTetris;
    	break;
    case 1:
        tetris = new SquareTetris;
    	break;
    case 2:
        tetris = new ZTetris;
    	break;
    case 3:
        tetris = new RevertZTetris;
    	break;
    case 4:
        tetris = new LTetris;
    	break;
    case 5:
        tetris = new RevertLTetris;
    	break;
    case 6:
        tetris = new TTetris;
    	break;
    case 7:
        tetris = new CrossTetris;
    	break;
    case 8:
        tetris = new ConcaveTetris;
    	break;
    default:
        break;
    }
    tetris.row = 1;
    tetris.col = 2;
    tetris.direction = Math.floor(Math.random() * 4);
    tetris.color = getRandomColor();
    return tetris;
}

function drawBlock(ctx, left, top, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(left, top, blockWidth, blockHeight);
    
    ctx.lineWidth = 1;
   
    ctx.beginPath();
    ctx.moveTo(left, top + blockHeight);
    ctx.lineTo(left, top);
    ctx.lineTo(left + blockHeight, top);
    ctx.strokeStyle = 'gray'
    ctx.stroke();
      
    ctx.beginPath();
    ctx.moveTo(left + blockHeight, top);
    ctx.lineTo(left + blockHeight, top + blockHeight);
    ctx.lineTo(left, top + blockHeight);
    ctx.strokeStyle = 'black';  
    ctx.shadowColor = 'black';  
    ctx.shadowBlur = 20;  
    ctx.stroke();
    ctx.restore();
}

function drawTetris(ctx, tetris) {
    var left, top;
    var start = tetris.direction * NUM_BLOCKS;
    for (var i = 0; i < NUM_BLOCKS; i++) {
        if (tetris.blocks[start + i] > 0) {
            left = (tetris.col + i % 4) * blockWidth;
            top = (tetris.row + parseInt(i / 4)) * blockHeight;
            drawBlock(ctx, left, top, tetris.color);
       }
    }
    // 绘制边框
    //left = tetris.col * blockWidth;
    //top = tetris.row * blockHeight;
    //ctx.strokeStyle = "green";
    //ctx.strokeRect(left, top, blockWidth * 4, blockHeight * 4);
}

function showNextTetris(tetris) {
    ctxDebug.clearRect(0, 0, 200, 200);
    drawTetris(ctxDebug, tetris);
}

function gameLoop() {   
    ctx.save();
    
    var ret = 1;
    if (!gameEngine.exploder.alive) {
        if (++fallDownCount % 30 == 0)
            ret = fallDown(curTetris);  
    }
    
    gameEngine.drawBackground(ctx);
    //ctx.globalCompositeOperation = 'source-in';
    showNextTetris(nextTetris);
    drawTetris(ctx, curTetris);
    if (!gameEngine.exploder.alive && demoTetris && document.getElementById("DownDemo").checked)
        drawTetris(ctx, demoTetris); 
    gameEngine.exploder.animateBooms(ctx);
     
    if (!ret) {
        gameEngine.placeTetris(ctx, curTetris);
        curTetris = nextTetris;
        curTetris.row = 0;
        curTetris.col = 4;
        nextTetris = getRandomTetris();
        demoTetris = gameEngine.getDemoTetris(curTetris);
    }
    ctx.restore();
}   

function AddEventHandlers()   
{   
    /*
	$("#panel").mousemove(function(e){   
		curTetris.left = e.pageX;
		curTetris.top = e.pageY;   
	});*/
}  

function onKeyDown(e) {
    e = e || window.event; 
    var keycode = e.which ? e.which : e.keyCode; 
    switch(keycode) {
    case 37:
        moveLeft(curTetris);
    	break;
    case 38:
        rotateTetris(curTetris);
    	break;
     case 39:
        moveRight(curTetris); 
    	break;
    case 40:
	    while(fallDown(curTetris) > 0);
    	break;
    default:
        break;
    }
}

function checkIntersect(tetris, key) {
    var direction = tetris.direction
    if (1 == key)
        var direction = ++direction % 4; 
     
    var start = direction * NUM_BLOCKS;
    for (var i = 0; i < NUM_BLOCKS; i++) {
        if (tetris.blocks[start + i] > 0) {
            var col = tetris.col + parseInt(i % 4);
            var row = tetris.row + parseInt(i / 4);
            switch(key) {
            default:
                break;
             case 0: // Left
                col--; 
    	        break;
    	     case 1: // Up
    	        break;
    	     case 2: //Right
                col++; 
    	        break;
    	     case 3: // Down
                row++;
    	        break;
            }
            if (col < 0 || col >= NUM_COL || row >= NUM_ROWS)
                return 0;
            var inx = row * NUM_COL + col;
            if (gameEngine.panelMatrix[inx] > 0)
                return 0;
       }
    }
    return 1;
}

function moveLeft(teris) {
    if (checkIntersect(teris, 0) > 0) {
        teris.col--;
        addjustDemoTetris();
        return 1;
    } 
}

function rotateTetris(teris) {
    if (checkIntersect(teris, 1) > 0) {
        teris.direction = ++teris.direction % 4;
        addjustDemoTetris();
        return 1;
    }
    return 0;
}

function moveRight(teris) {
    if (checkIntersect(teris, 2) > 0) {
        teris.col++;
        addjustDemoTetris();
        return 1;
    }
    return 0;
}

function fallDown(teris) {
    if (checkIntersect(teris, 3) > 0) {
        teris.row++;
        return 1;
    }
    //placeTetris(tetris);
    return 0;
}
 // 初始化   
$(window).ready(function(){            
    ctx = document.getElementById('panel').getContext('2d');
    ctxDebug = document.getElementById('next').getContext('2d');
    
    screenWidth = parseInt($("#panel").attr("width")); 
    screenHeight = parseInt($("#panel").attr("height"));
    loadImages();
    AddEventHandlers();
    gameEngine = new GameEngine();
    curTetris = getRandomTetris();
    curTetris.col = 4;
    nextTetris = getRandomTetris();
    demoTetris = gameEngine.getDemoTetris(curTetris);
    setInterval(gameLoop, 10);

    document.onkeydown=onKeyDown;
});
//});