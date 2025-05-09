class Snake {
	constructor( field, skin ) {
		this.H_LEFT = 1;
		this.H_RIGHT = -1;
		this.H_UP = 2;
		this.H_DOWN = -2;
		this.r = '8px'
		
		this.border_style ='#000000 dotted 2px';
		
		this.skin = skin;
		this.field = field;
		this.headPos = new Point(10, 10);
		this.bodyPos = [ new Point(9, 10), new Point(8, 10) ];
		this.trailPos = new Point(8, 10);
	}

		

	getHeadPos() {
		return this.headPos;
	}
	getBodyPos() {
		return this.bodyPos;
	}
	getTrailPos() {
		return this.trailPos;
	}
	setTrailPos( point ) {
		this.trailPos.copy( point );
	}
	getTailPos() {
		return this.bodyPos[ this.bodyPos.length - 1 ];
	}
	getAllBody() {
		let arr = this.getBodyPos().map( e => e);
		arr.push(this.getHeadPos());
		return arr;
	}
	hasBitten (entity) {
		if (this.headPos.equals( entity.getPosition() ) ) {
			return true;
		}
		return false;
	}
	grow() {
		let point = new Point(0, 0);
		point.copy( this.getTrailPos() );
		this.bodyPos.push( point );
	}
	move( x, y) {
		this.setTrailPos( this.getTailPos() );
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
			eye.style.background = "#d8ddca" ;
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
			let div = document.createElement('div');
			let pos = this.bodyPos[i];
			let next = this.bodyPos[ i + 1 ];
			let r = 15;
			div.className = this.skin;
			div.style.gridColumn = pos.getX();
			div.style.gridRow = pos.getY();

			// rounds tail of the snake
			
			if (i == this.bodyPos.length - 1) {
				this.roundBodyPart( div, pos, this.bodyPos[i - 1] );
			// rounds body
			} else if ( i == 0 ) {
				let pos_h = this.getHeading( pos, next );
				let head_h = this.getHeading( this.headPos, pos );
				this.roundCornerIfTurning( div, pos_h, head_h, r );				
			} else {
				let prev = this.bodyPos[ i - 1];
				let pos_h = this.getHeading( pos, next );
				let prev_h = this.getHeading( prev, pos );
				this.roundCornerIfTurning( div, pos_h , prev_h , r);
			}
			board.appendChild(div);
			
		}
	}
	roundCornerIfTurning (el, pos, ref , r)  {
				switch( pos - ref) {
					case this.H_UP - this.H_LEFT :
						el.style.borderRadius = `0px ${r}px 0px 0px`;
						el.style.borderTop = this.border_style;
						el.style.borderRight = this.border_style;
					break;
					case this.H_UP - this.H_RIGHT:
						el.style.borderRadius = `${r}px 0px 0px 0px`;
						el.style.borderTop = this.border_style;
						el.style.borderLeft= this.border_style;
					break;
					case this.H_DOWN - this.H_LEFT:
						el.style.borderRadius = `0px 0px ${r}px 0px`;
						el.style.borderDown = this.border_style;
						el.style.borderRight = this.border_style;
					break;
					case this.H_DOWN - this.H_RIGHT:
						el.style.borderRadius = `0px 0px 0px ${r}px`;
						el.style.borderDown = this.border_style;
						el.style.borderLeft = this.border_style;
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
