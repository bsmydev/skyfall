SKY.Controls = ( function()
{
	var UP_KEY = 38, DOWN_KEY = 40, LEFT_KEY = 37, RIGHT_KEY = 39;

	return {

		UP : false,
		DOWN : false,
		LEFT : false,
		RIGHT : false,

		enable : function()
		{
			var self = this;

			document.onkeydown = function( event )
			{
				var key = event.keyCode;

				event.preventDefault();
				event.stopPropagation();

				switch( key )
				{
					case UP_KEY    : self.UP = true; break;
					case DOWN_KEY  : self.DOWN = true; break;
					case LEFT_KEY  : self.LEFT = true; break;
					case RIGHT_KEY : self.RIGHT = true; break;
				}

			};

			document.onkeyup = function( event )
			{
				var key = event.keyCode;

				event.preventDefault();
				event.stopPropagation();

				switch( key )
				{
					case UP_KEY    : self.UP = false; break;
					case DOWN_KEY  : self.DOWN = false; break;
					case LEFT_KEY  : self.LEFT = false; break;
					case RIGHT_KEY : self.RIGHT = false; break;
				}

			};
		},

		disable : function()
		{
			document.onkeydown = function( event ){};
			document.onkeyup = function( event ){};
		}

	}

} )();