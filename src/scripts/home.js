/*
*
*	HOME SCREEN
*
*/

SKY.Home = function(){
	
	this.el = $( '#home' );

};

SKY.Home.prototype.toggle = function( bool ){

	this.el.toggle( bool );

};

SKY.Home.prototype.message = function( text ){

	this.el.find( '.message' ).html( text );

};