class Snake {
	constructor( field, skin ) {
		this.H_LEFT = -1;
		this.H_RIGHT = 1;
		this.H_UP = -2;
		this.H_DOWN = 2;
		this.r = '8px'
		
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
	getAllBody() {
		let arr = this.getBodyPos().map( e => e);
		arr.push(this.getHeadPos());
		return arr;
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
		let head = document.createElement('div');
		let eyes = [ document.createElement('div'), document.createElement('div') ];
		eyes.forEach( eye => {
			eye.style.background = "#fff" ;
			eye.style.width = "4px";
			eye.style.height = "3px";
			eye.style.borderRadius = "2px"
			eye.style.margin = '2px'
			head.appendChild(eye);
		} );

		head.className = this.skin;
		head.id = 'snake_head';
		head.style.gridColumn = point.getX();
		head.style.gridRow = point.getY();
		this.roundBodyPart(head, this.headPos, this.bodyPos[0], () => { 
					head.style.flexDirection = 'column' ;
		 } );
		board.appendChild(head);
	}

	drawBody() {
		for ( let i = 0; i < this.bodyPos.length ; i++) {
			let point = this.bodyPos[i];
			let div = document.createElement('div');
			let r = 15;
			div.className = this.skin;
			div.style.gridColumn = point.getX();
			div.style.gridRow = point.getY();

			// rounds tail of the snake
			
			if (i == this.bodyPos.length - 1) {
				if ( this.bodyPos[i].equals(this.bodyPos[ this.bodyPos.length - 2]) ) {
					if ( i - 2 < 0) {
						this.roundBodyPart( div, point, this.headPos );
					} else {
						this.roundBodyPart( div, point, this.bodyPos[i - 2] );				
					}
				} else {
					this.roundBodyPart( div, point, this.bodyPos[i - 1] );
				}
			} else if ( i == this.bodyPos.length - 2 && this.bodyPos[i].equals(this.bodyPos[ this.bodyPos.length - 1])) {
				if ( i == 0) {
					this.roundBodyPart( div, point, this.headPos );
				} else {
					this.roundBodyPart( div, point, this.bodyPos[i - 1] );
					
				}
			// rounds body
			} else if ( i == 0 ) {
				let a = this.getHeading( this.bodyPos[i], this.bodyPos[i + 1] );
				let b = this.getHeading( this.headPos, this.bodyPos[i] );
				this.roundCornerIfTurning( div, a, b, r );				
			} else {
				let a = this.getHeading( this.bodyPos[i], this.bodyPos[i + 1] );
				let b = this.getHeading( this.bodyPos[i - 1], this.bodyPos[i] );
				this.roundCornerIfTurning( div, a, b, r);
			}
			board.appendChild(div);
			
		}
	}
	roundCornerIfTurning (el, pos, ref , r)  {
				switch( pos - ref) {
					case this.H_UP - this.H_LEFT :
						el.style.borderRadius = `0px ${r}px 0px 0px`;
					break;
					case this.H_UP - this.H_RIGHT :
						el.style.borderRadius = `${r}px 0px 0px 0px`;
					break;
					case this.H_DOWN - this.H_LEFT :
						el.style.borderRadius = `0px 0px ${r}px 0px`;
					break;
					case this.H_DOWN - this.H_RIGHT :
						el.style.borderRadius = `0px 0px 0px ${r}px`;
					break;
				}
	}
	roundBodyPart( elm, pos, ref, f ) {
		let r = this.r
		switch(this.getHeading( pos, ref )) {
			case this.H_LEFT :
				elm.style.borderRadius = `${r} 0px 0px ${r}`;
				if ( f != null ) f();
				return "left";
			break;
			case this.H_RIGHT : 
				elm.style.borderRadius = `0px ${r} ${r} 0px`;
				if ( f != null ) f();
				return "right";
			break;
			case this.H_DOWN : 
				elm.style.borderRadius = `0px 0px ${r} ${r}`;
				return "down";
			break;
			case this.H_UP : 
				elm.style.borderRadius = `${r} ${r} 0px 0px`;
				return "up";
			break;
		}
	}

	setPosition( point ) {
		this.headPos = point;
	}
	setBody( size ) {
		this.bodyPos = [];
		let head = this.headPos;
		for ( let i = 0; i < size; i++) {
			this.bodyPos.push( new Point( head.getX() , head.getY() ));
		}
	}
	getHeading( point, ref ) {
		let x = point.getX() - ref.getX();
		let y = point.getY() - ref.getY();
		let direction = new Point( x, y );
		
		if ( x > 0) {
			return this.H_RIGHT;
		} else if ( x < 0 ) {
			return this.H_LEFT;
		} else if ( y > 0 ) {
			return this.H_DOWN;
		} else if ( y < 0 ) {
			return this.H_UP;
		}
	}
}
