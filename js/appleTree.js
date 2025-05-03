class AppleTree {
	constructor ( field, color ) {
		this.field = field;
		this.fd = new Dimension(field);
		this.color = color;
	}
	
	drop() {
		let x = Math.floor(Math.random() * this.fd.getWidth()) + 1;
		let y = Math.floor(Math.random() * this.fd.getHeight()) + 1;

		return new Apple(this.color, this.field, new Point( x, y ));
	}
}