class Snake {
	constructor(field, skin) {
		this.skin = skin;
		this.field = field;
		this.headPos = new Point(10, 10);
		this.bodyPos = [ new Point(9, 10), new Point(8, 10) ]
	}

		

	getHeadPos() {
		return this.headPos;
	}
	getBodyPos() {
		return this.bodyPos;
	}
	
	hasBite (entity) {
		if (this.headPos.equals( entity.getPosition() ) ) {
			return true;
		}
		return false;
	}
	grow() {
		let point = new Point(0, 0);
		point.copy( this.bodyPos[this.bodyPos.length - 1] );
		this.bodyPos.push( point );
	}
	move( x, y) {
		for (let i = this.bodyPos.length - 1; i >= 0; i--) {
			let j = i - 1;
			if ( i == 0) {				
				this.bodyPos[i].copy( this.headPos );
			} else {
				this.bodyPos[i].copy( this.bodyPos[j] );
			}
		}
		this.headPos.move( x, y );
		
	}

	draw() {
		this.drawHead();
		this.drawBody();
	}
	drawHead() {
		let point = this.getHeadPos();
		let div = document.createElement('div');
		div.style.background = "#33aa00"
		div.style.gridColumn = point.getX();
		div.style.gridRow = point.getY();
		board.appendChild(div);
	}
	drawBody() {	
		this.bodyPos.forEach( point => {
			let div = document.createElement('div');
			div.className = this.skin;
			div.style.gridColumn = point.getX();
			div.style.gridRow = point.getY();
			board.appendChild(div);
		} );
	}
	setPosition( point ) {
		this.headPos = point;
	}
}
