class Field {
	constructor ( elm, snake ) {
		this.elm = elm;
		this.dimension = new Dimension(elm);
		this.snake = snake;
	}
	getElement() {
		return this.elm;
	}
	getAvailableArea() {
		let area = [];
		let snakeBody = this.snake.getAllBody();
		for ( let x = 1; x <= this.dimension.getWidth(); x++ ) {
			for ( let y = 1; y <= this.dimension.getHeight(); y++ ) {
				let p = new Point( x , y );
				let isAvailable = true;
				for ( let point of snakeBody ) {
					if ( point.equals(p)) {
						isAvailable = false;
					}		
				}			
				if (isAvailable) area.push(p);
			}
		}
		return area;	
	}
}