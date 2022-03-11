
let inputDir={x:0,y:0};

const foodsound= new Audio('audio\food_G1U6tlb.mp3');

const gameSound= new Audio('audio\Snake Game - Theme Song.mp3');

const gameoverSound= new Audio('audio\TZRM68V-game-over.mp3');

const snakeHissingSound=new Audio('audio\snake-hissing-sound.mp3');

let speed=5;

let score=0;

let lastPaintTime=0;

let snakeArr=[
    {
        x:13,
        y:15
    }
]

food={x:6,
    y:7};


   
//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime
    gameEngine();
    
}

function isCollide(snake){
    //if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }
    }    
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){// if snake bumb into the wall
            return true;
    }

        
    
}
function gameEngine(){
    //Updating snake array &food

    if(isCollide(snakeArr)){
        sound.play();
        gameoverSound.play();
        gameSound.pause();
        sound.onpause();
        inputDir={x:0,y:0};
        alert("game Over: Press any key to play again");
        snakeArr=[{x:13,y:15}];
        gameSound.play();
        
        score=0;

    }

    //if snake eaten the food increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        document.getElementById('scoreBox').innerHTML="Score :"+ score;
        snakeArr.unshift({x:snakeArr[0].x+ inputDir.x,  y:snakeArr[0].y+ inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random())};

    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    //display snake
    document.getElementById('board').innerHTML="";
    // board.innerHtml="";
    snakeArr.forEach((e,index)=>{
        SnakeElement=document.createElement('div');
        SnakeElement.style.gridRowStart=e.y;
        SnakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            SnakeElement.classList.add("head");
        }
        else{
            SnakeElement.classList.add("snake");
        }
        board.appendChild(SnakeElement);
    });
    //Render the snake and food
    //display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food")
        board.appendChild(foodElement);
}

    



// let highscores=localStorage.getItem('highscores');
// if(HighscoreBox===null){
//     highscoresvalue=0;
//     localStorage.setItemtItem('HighscoreBox',JSON.stringify(highscoresvalue));
// }
// else{
//     highscoresvalue=JSON.parse(highscores);
//     document.getElementById('HighscoreBox').innerHTML="High Score: "+ highscores;
// }
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game

    gameSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;        
    
        default:
            break;
    }
})





