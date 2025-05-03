class Dimension {
	constructor (board) {
		this.board = board;
	}
	getWidth() {
		return getComputedStyle(this.board).gridTemplateColumns.split(' ').length;
	}
	getHeight() {
		return getComputedStyle(this.board).gridTemplateRows.split(' ').length;	
	}
}