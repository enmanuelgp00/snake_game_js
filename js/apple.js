class Apple {
	constructor ( color, field, point ) {
		this.point = point;
		this.field = field;
		this.color = color;
		this.isIncreasing = true;
		this.scale = 1.0;
		this.SCALE_RATE = 0.1;
		this.MAX_SCALE = 1.2;
		this.MIN_SCALE = 0.9;
	}
	getPosition() {
		return this.point;
	}
	draw() {
		let apple = document.createElement('div');
		let leaf = document.createElement('div');
		leaf.style.width = '8px';
		leaf.style.height = '8px';
		leaf.style.background = '#0f0';
		leaf.style.border = '#000 dotted 1px';
		leaf.style.borderRadius = '5px 0px 5px 0px';
		leaf.style.position = 'absolute';
		leaf.style.left = '50%'
		leaf.style.top = '-2px'

		let reflect = document.createElement('div');
		reflect.style.width = '6px';
		reflect.style.height = '6px';
		reflect.style.borderRadius = '3px';
		reflect.style.background = '#fda' ;

		apple.className = this.color;
		apple.style.gridColumn = this.point.getX();
		apple.style.gridRow = this.point.getY();
		apple.style.position = 'relative';
		apple.appendChild(reflect);
		apple.appendChild(leaf);
		apple.style.scale = this.scale;
		this.updateScale();
		this.field.appendChild(apple);
	}
	updateScale () {
		if ( this.isIncreasing ) {
			if ( this.scale >= this.MAX_SCALE - this.SCALE_RATE ) {
				this.isIncreasing = false;
			}
			this.scale += this.SCALE_RATE;
			
		} else {
			if ( this.scale <= this.MIN_SCALE + this.SCALE_RATE ) {
				this.isIncreasing = true;
			}
			this.scale -= this.SCALE_RATE;
		}
	}
}