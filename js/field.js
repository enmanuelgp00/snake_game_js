class Field {
	constructor ( elm, snake ) {
		this.elm = elm;
		this.dimension = new Dimension(elm);
		this.snake = snake;		
		this.applesPos = [];
		this.appleTree = new AppleTree(this); 
		
	}
	getElement() {
		return this.elm;
	}
	getAvailableArea() {
		let area = [];
		let ocupatedArea = this.snake.getAllBody().map( e => e);

		for ( let apple of this.applesPos) {
			ocupatedArea.push( apple );
		}
		
		for ( let x = 1; x <= this.dimension.getWidth(); x++ ) {
			for ( let y = 1; y <= this.dimension.getHeight(); y++ ) {
				let p = new Point( x , y );
				let isAvailable = true;
				for ( let ocupated of ocupatedArea) {
					if ( ocupated.equals(p)) {
						isAvailable = false;
						break;
					}		
				}			
				if (isAvailable) {
					area.push(p);
				}
			}
		}		
		return area;	
	}
	addApplePos( point ) {
		this.applesPos.push(point);
	}
	getApplesPos() {
		return this.applesPos;
	}
	assimilatedApple( point ) {
		this.applesPos = this.applesPos.filter( pos => pos !== point );
	}
}
