
window.onload = function (){
    let hiscore = parseInt(localStorage.getItem('snakeHiscore')) ? parseInt(localStorage.getItem('snakeHiscore')) : 0;
    const tileWidth = 16;
    const tileTotal = 32;
    let appleX = appleY = 15;
    let score = 0;
    let isActive = false;
    let gameInterval;
    let speed = 1;
    let speedX = speedY = 0;
    let positionX = Math.floor(Math.random() * ( (tileTotal - 10) - 10) + 10);
    let positionY = Math.floor(Math.random() * ( (tileTotal - 10) - 10) + 10);
    let direction = '';
    let tail = 4;
    const trail = []

    const board = document.getElementById('board');
    const context = board.getContext("2d");
    
    document.addEventListener("keydown", keyPush);

    context.fillStyle = "#5E9150";
    context.fillRect(0, 0, board.width, board.height)
    context.font = '24px monospace';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText('Press any key to start!', 256, 256);

    function init(){
        isActive = true;
        positionX = Math.floor(Math.random() * ( (tileTotal - 10) - 10) + 10);
        positionY = Math.floor(Math.random() * ( (tileTotal - 10) - 10) + 10);
        tail = 4;
        score = 0;
        direction = '';
        gameInterval = setInterval(game, 100);
    }

    function game(){
        positionX += speedX;
        positionY += speedY;
        
        context.fillStyle = "#5E9150";
        context.fillRect(0, 0, board.width, board.height);
        
        context.fillStyle = "#D11616";
        context.fillRect(appleX * tileWidth, appleY * tileWidth, tileWidth, tileWidth);
        
        context.fillStyle = "black";
        for (let index = 0; index < trail.length; index++) {
            context.fillRect(trail[index].x * tileWidth, trail[index].y * tileWidth, tileWidth, tileWidth)
            if (trail[index].x == positionX && trail[index].y == positionY){
                gameOver();
            }
            
        }
        context.fillStyle = 'white';
        context.font = '16px monospace';
        context.textAlign = 'start';
        context.fillText(`Score: ${score}`, 16, 32);
        context.textAlign = 'end';
        context.fillText(`HiScore: ${hiscore}`, 496, 32);

        trail.push({x: positionX, y: positionY});
        
        while( trail.length > tail){
            trail.shift();
        }
        
        if ( appleX == positionX && appleY == positionY){
            tail++;
            score++;
            appleX = Math.floor(Math.random() * tileTotal);
            appleY = Math.floor(Math.random() * tileTotal);
        }

        if ( positionX < 0 || positionX > tileTotal -1 || positionY < 0 || positionY > tileTotal -1) {
            gameOver();
        }
        
    }

    function keyPush(event){
        if (!isActive){
            init();
        }

        switch(event.key){
            case "w":
            case "ArrowUp":
                if ( direction != 'down'){
                    direction = 'up';
                    speedX = 0;
                    speedY = -speed;
                }
                break;
            case "s":
            case "ArrowDown":
                if ( direction != 'up'){
                    direction = 'down';
                    speedX = 0;
                    speedY = speed;
                }
                break;
            case "a":
            case "ArrowLeft":
                if ( direction != 'right' ){
                    direction = 'left';
                    speedX = -speed;
                    speedY = 0;
                }
                break;
            case "d":
            case "ArrowRight":
                if( direction != 'left'){
                    direction = 'right';
                    speedX = speed;
                    speedY = 0;
                }
                break;
            default:
                break;
        }
    }

    function gameOver(){
        clearInterval(gameInterval);
        if (score > hiscore){
            hiscore = score
            localStorage.setItem('snakeHiscore', hiscore);    
        }
        isActive = false;
        context.font = '36px monospace';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Game Over!', 256, 256);
        context.font = '20px monospace';
        context.fillText('Press any key to restart!', 256, 300);
    }
}
