class Apple {
	constructor ( color, field, point ) {
		this.point = point;
		this.field = field;
		this.color = color;
	}
	getPosition() {
		return this.point;
	}
	draw() {
		let apple = document.createElement('div');
		
		let reflect = document.createElement('div');
		reflect.style.width = '6px';
		reflect.style.height = '6px';
		reflect.style.borderRadius = '3px';
		reflect.style.background = '#fda' ;

		apple.className = this.color;
		apple.style.gridColumn = this.point.getX();
		apple.style.gridRow = this.point.getY();
		apple.appendChild(reflect);
		this.field.appendChild(apple);
	}
}