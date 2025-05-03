class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	getX() {
		return this.x;
	}
	setX( x ) {
		this.x = x;
	}
	getY() {
		return this.y;
	}

	setY( y ) {
		this.y = y;
	}
	copy(point) {
		this.setX( point.getX() );
		this.setY( point.getY() );
	}
	equals( point ) {
		if ( this.getX() == point.getX() ) {
			if ( this.getY() == point.getY() ) {
				return true;
			}
		} 
		return false;
	}
	move( x, y) {
		this.setX( this.getX() + x);
		this.setY( this.getY() + y);
	}
}