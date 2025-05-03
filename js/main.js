const board = document.getElementById('game-board');
const board_dimensions = new Dimension(board);
const presentation = document.getElementById('presentation');
const score_bar = document.getElementById('score');

const snake = new Snake(board, "snake");
const appleTree = new AppleTree(board, "apple");
let apple = appleTree.drop();
let speed = 1000;
let score = 0;

let direction = new Point( 1, 0 );

const left = new Point( -1, 0);
const up = new Point( 0, -1 );
const right = new Point( 1, 0 );
const down = new Point( 0, 1 );

let borders = [];
let isGameOver = false;

document.addEventListener('keydown', (event) => { 
	switch ( event.key ) {
		case 'a' :
			if ( !direction.equals( right ) ) {
				direction.copy( left );
			}
			break;
		case 'w' :
			if ( !direction.equals( down ) ) {
				direction.copy( up );
			}
			break;
		case 'd' :
			if ( !direction.equals( left ) ) {
				direction.copy( right );
			}
			break;
		case 's' :
			if ( !direction.equals( up ) ) {
				direction.copy( down );
			}
			break;
	}
 } );
document.addEventListener('click', (e) => {
	if ( direction.equals( up ) ) {
		direction.copy( left )
	} else if (direction.equals( left )) {
		direction.copy( down );
	} else if (direction.equals( down )) {
		direction.copy( right );
	} else if (direction.equals( right )) {
		direction.copy( up );
	}
});
for ( let x = 0; x <= board_dimensions.getWidth() + 1; x++) {
	if ( x == 0 || x == board_dimensions.getWidth() + 1 ) {
		for ( let y = 1; y <= board_dimensions.getHeight(); y++) {			
			borders.push( new Point(x, y) );
			
		}	
	}
	
}

for ( let y = 0; y <= board_dimensions.getWidth() + 1; y++) {
	if ( y == 0 || y == board_dimensions.getWidth() + 1 ) {
		for ( let x = 1; x <= board_dimensions.getHeight(); x++) {			
			borders.push( new Point(x, y) );
			
		}	
	}
	
}


async function play() {
	setTimeout( () => {
		board.innerHTML = '';
		snake.move(direction.getX(), direction.getY());
		let headPos = snake.getHeadPos();

		if ( snake.hasBite(apple) ) {
			snake.grow();
			apple = appleTree.drop();
			if (speed > 60 ) {
				speed -= speed * 0.10;	
			}
			
			score_bar.textContent = ++score ;
		}

		borders.forEach( e => {
			if ( snake.hasBite( { getPosition() { return e; } } )) {
				isGameOver = true;
			}
		});
		
		snake.getBodyPos().forEach( e => {
			if ( snake.hasBite( { getPosition() { return e; } } )) {
				isGameOver = true;
			}
		} );

		if (!isGameOver) { 
			apple.draw();
			snake.draw();
			play();
		} else {
			presentation.style.display = 'flex';
		}
	} , speed );
}

presentation.addEventListener('click', e => {
	play();
	presentation.style.display = 'none';
	isGameOver = false;
	snake.setPosition( new Point(10 , 10));
});