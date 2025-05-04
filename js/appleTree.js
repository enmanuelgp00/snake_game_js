class AppleTree {
	constructor ( field ) {
		this.field = field;
	}

	drop( count ) {
		let apples = [];
		let map = field.getAvailableArea();
		for ( let i = 0; i < count; i++) {
			if ( map.length > 0 ) {
				let j = Math.floor(Math.random() * map.length );
				let pos = map[ j ];
				field.addApplePos( pos );
				apples.push( new Apple('apple' , this.field.getElement() , pos ) );
			}	
		}
		return apples;
	}
}
