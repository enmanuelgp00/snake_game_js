const board = document.getElementById('game-board');
const board_dimension = new Dimension(board);
const presentation = document.getElementById('presentation');
const score_bar = document.getElementById('score');

const snake = new Snake(board, "snake");
const field = new Field( board, snake );
const appleTree = new AppleTree( field , "apple");

let apple = appleTree.drop();


const SPEED_DEFAULT = 1000;
const SPEED_MIN  = 500;
let speed = SPEED_DEFAULT;

let score = 0;

const GAME_PLAY = 0;
const GAME_WIN = 1;
const GAME_OVER = -1;

let gameState = GAME_PLAY;

let direction = new Point( 1, 0 );
let lastDirection = new Point(0, 0);
const left = new Point( -1, 0 );
const up = new Point( 0, -1 );
const right = new Point( 1, 0 );
const down  = new Point( 0, 1 );


let borders = getBorderPoints( board_dimension );
let isGameOver = false;

document.addEventListener('keydown', (event) => { 
	switch ( event.key ) {
		case 'a' :
			if ( !lastDirection.equals( right ) ) {
				direction.copy( left );
			}
			break;
		case 'w' :
			if ( !lastDirection.equals( down ) ) {
				direction.copy( up );
			}
			break;
		case 'd' :
			if ( !lastDirection.equals( left ) ) {
				direction.copy( right );
			}
			break;
		case 's' :
			if ( !lastDirection.equals( up ) ) {
				direction.copy( down );
			}
			break;
	}
 } );

document.body.addEventListener('click', (e) => {
	
	if ( e.clientX < document.body.getBoundingClientRect().width / 2 ) {

		if ( lastDirection.equals( up ) ) {
			direction.copy( left )
		} else if (lastDirection.equals( left )) {
			direction.copy( down );
		} else if (lastDirection.equals( down )) {
			direction.copy( right );
		} else if (lastDirection.equals( right )) {
			direction.copy( up );
		}		
	} else {

		if ( lastDirection.equals( up ) ) {
			direction.copy( right )
		} else if (lastDirection.equals( right )) {
			direction.copy( down );
		} else if (lastDirection.equals( down )) {
			direction.copy( left );
		} else if (lastDirection.equals( left )) {
			direction.copy( up );
		}
	}
});

async function play() {
	setTimeout( () => {
		board.innerHTML = '';
		snake.move(direction.getX(), direction.getY());
		let headPos = snake.getHeadPos();

		if ( snake.hasBite(apple) ) {
			snake.grow();
			apple = appleTree.drop();
			if ( apple == null ) {
				gameState = GAME_WIN;
			}
			console.log("delicious apple");
			if (speed > SPEED_MIN ) {
				speed -= speed * 0.10;	
			}
			
			score_bar.textContent = ++score ;
		}

		borders.forEach( e => {
			if ( snake.hasBite( { getPosition() { return e; } } )) {
				gameState = GAME_OVER;
				console.log("bitten it border");
			}
		});
		
		snake.getBodyPos().forEach( e => {
			if ( snake.hasBite( { getPosition() { return e; } } )) {
				gameState = GAME_OVER;
				console.log("My tail tasted like chicken");
			}
		} );

		switch ( gameState ) { 
			case GAME_WIN:
				board.innerHTML = "YOU WIN!";
				break;

			case GAME_OVER:				
				presentation.style.display = 'flex';
				break;

			default:
				apple.draw();
				snake.draw();
				lastDirection.copy(direction);
				play();
		}
	} , speed );
}

presentation.addEventListener('click', e => {
	play();
	resetGame();
});

function resetGame() {
	presentation.style.display = 'none';
	isGameOver = false;
	let x = Math.floor( board_dimension.getWidth() / 2 );
	let y = Math.floor( board_dimension.getHeight() / 2 );
	snake.setPosition( new Point(x , y));
	snake.setBody( 2 );
	apple = appleTree.drop();
	gameState = GAME_PLAY;
	speed = SPEED_DEFAULT;
	score = 0;
	score_bar.textContent = score;
}

function getBorderPoints( dimension ) {
	let borders = [];
	for ( let x = 0; x <= dimension.getWidth() + 1; x++) {
		if ( x == 0 || x == dimension.getWidth() + 1 ) {
			for ( let y = 1; y <= dimension.getHeight(); y++) {			
				borders.push( new Point(x, y) );
			
			}	
		}
	
	}

	for ( let y = 0; y <= dimension.getWidth() + 1; y++) {
		if ( y == 0 || y == dimension.getWidth() + 1 ) {
			for ( let x = 1; x <= dimension.getHeight(); x++) {			
				borders.push( new Point(x, y) );
				
			}	
		}
	
	}
	return borders;

};