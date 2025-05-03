class AppleTree {
	constructor ( field, color ) {
		this.field = field;
		this.color = color;
	}

	drop() {
		let map = field.getAvailableArea();
		if ( map.length > 0 ) {		
			return new Apple(this.color, this.field.getElement() , map[ Math.floor(Math.random() * map.length ) ] );
		} else {
			return null;
		}
	}
}