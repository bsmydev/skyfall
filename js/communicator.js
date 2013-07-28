SKY.Communicator = function()
{
	var socket = io.connect( 'http://' + window.document.location.hostname + ':8080' );
		self = this;

	socket.on( 'connected', function ( socket )
	{
		console.log( 'connected' );
	} );

	socket.on( 'update', this.onUpdate.bind( this ) );
};

SKY.Communicator.prototype.onUpdate = function( update )
{
	SKY.GLManager.handleUpdate( update );
};