const board = document.getElementById('game-board');
const board_dimension = new Dimension(board);
const presentation = document.getElementById('presentation');
const scoreView = document.getElementById('score');
const highScoreView = document.getElementById('high_score');

const snake = new Snake(board, "snake");

const field = new Field( board, snake );
const APPLE_COUNT = 10;

const SPEED_DEFAULT = 1000;
const SPEED_MIN  = 400;
let speed = SPEED_DEFAULT;

let score = 0;
highScoreView.textContent = getHighScore();

const GAME_PLAY = 0;
const GAME_WIN = 1;
const GAME_OVER = -1;
let gameState = GAME_PLAY;

const D_UP = new Point( 0, -1 );
const D_DOWN  = new Point( 0, 1 );
const D_LEFT = new Point( -1, 0 );
const D_RIGHT = new Point( 1, 0 );

let direction = new Point( 1, 0 );
let lastDirection = new Point(0, 0);


let borders = getBorderPoints( board_dimension );
let isGameOver = false;

document.addEventListener('keydown', (event) => { 
	switch ( event.key ) {
		case 'a' :
			if ( !lastDirection.equals( D_RIGHT ) ) {
				direction.copy( D_LEFT );
			}
			break;
		case 'w' :
			if ( !lastDirection.equals( D_DOWN ) ) {
				direction.copy( D_UP );
			}
			break;
		case 'd' :
			if ( !lastDirection.equals( D_LEFT ) ) {
				direction.copy( D_RIGHT );
			}
			break;
		case 's' :
			if ( !lastDirection.equals( D_UP ) ) {
				direction.copy( D_DOWN );
			}
			break;
	}
 } );

document.body.addEventListener('click', (e) => {
	
	if ( e.clientX < document.body.getBoundingClientRect().width / 2 ) {

		if ( lastDirection.equals( D_UP ) ) {
			direction.copy( D_LEFT )
		} else if (lastDirection.equals( D_LEFT )) {
			direction.copy( D_DOWN );
		} else if (lastDirection.equals( D_DOWN )) {
			direction.copy( D_RIGHT );
		} else if (lastDirection.equals( D_RIGHT )) {
			direction.copy( D_UP );
		}		
	} else {

		if ( lastDirection.equals( D_UP ) ) {
			direction.copy( D_RIGHT )
		} else if (lastDirection.equals( D_RIGHT )) {
			direction.copy( D_DOWN );
		} else if (lastDirection.equals( D_DOWN )) {
			direction.copy( D_LEFT );
		} else if (lastDirection.equals( D_LEFT )) {
			direction.copy( D_UP );
		}
	}
});

async function play() {
	setTimeout( () => {
		board.innerHTML = '';
		snake.move(direction.getX(), direction.getY());	

		checkGameState();

		switch ( gameState ) { 
			case GAME_WIN:
				board.innerHTML = "YOU WIN!";
				break;

			case GAME_OVER:
				audioLose();			
				presentation.style.display = 'flex';
				getHighScore();
				break;

			default:
				apples.forEach( apple => {
					if (apple != null ) apple.draw() ;
				});
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
	field.clearApplesPos();
	apples = field.appleTree.drop( APPLE_COUNT );
	gameState = GAME_PLAY;
	speed = SPEED_DEFAULT;
	highScoreView.textContent = getHighScore();
	score = 0;
	scoreView.textContent = score;
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

function checkGameState() {
	let headPos = snake.getHeadPos();
	
	if (  apples.length == 0 ) {
		console.log( "WIN")
		gameState = GAME_WIN;
		return undefined;
	}  
	
	for ( let i = 0 ; i < apples.length; i++ ) {
			if ( snake.hasBitten(apples[i]) ) {			
				snake.grow();
				audioEat();
				field.assimilatedApple( apples[i].getPosition() );
				
				
				apples = apples.filter( a => a !== apples[i] );				
				let newapple = field.appleTree.drop( 1 )[0];
				if ( newapple != undefined ) apples.push( newapple );
				
				console.log("Delicious apple");
				handleSpeedUp();					
				
			}
	}	
	
	borders.forEach( e => {
		if ( snake.hasBitten( { getPosition() { return e; } } )) {
			gameState = GAME_OVER;
			console.log("I\'ve hit my head against that wall");
		}
	});
	
	snake.getBodyPos().forEach( e => {
		if ( snake.hasBitten( { getPosition() { return e; } } )) {
			gameState = GAME_OVER;
			console.log("I\'ve bitten my tail");
		}
	} );
}

function handleSpeedUp() {
	if (speed > SPEED_MIN ) {
		speed -= speed * 0.10;	
	}
	scoreView.textContent = ++score ;
}

function getHighScore() {
	const HIGH_SCORE = "HIGH_SCORE";
	let hs =  localStorage.getItem(HIGH_SCORE);
	if ( hs == null || hs < score ) {
		hs = score;
	}
	localStorage.setItem(HIGH_SCORE, hs);
	return hs;
}

function audioEat() {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	oscillator.type = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'
	oscillator.frequency.value = 440;
	gainNode.gain.value = 0.3;
	oscillator.start();
	oscillator.stop(audioContext.currentTime + 0.2 );
}

function audioLose() {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	oscillator.type = 'sine'; 
	oscillator.frequency.value = 349.91;
	gainNode.gain.value = 0.3;
	oscillator.start();
	oscillator.stop(audioContext.currentTime + 0.2 );
}
