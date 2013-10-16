SKY.Controls = ( function()
{
	var UP_KEY = 38,
		DOWN_KEY = 40,
		LEFT_KEY = 37,
		RIGHT_KEY = 39,
		SPACE_KEY = 32,
		ALT_KEY = 18,
		MAJ_KEY = 16,
		ESC_KEY = 27;

	return {

		UP : false,
		DOWN : false,
		LEFT : false,
		RIGHT : false,
		SPACE : false,
		ALT : false,
		MAJ : false,

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
					case SPACE_KEY : self.SPACE = true; break;
					case ALT_KEY   : self.ALT = true; break;
					case MAJ_KEY   : self.MAJ = true; break;
					case ESC_KEY   : SKY.GLManager.pause(); break;

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
					case SPACE_KEY : self.SPACE = false; break;
					case ALT_KEY   : self.ALT = false; break;
					case MAJ_KEY   : self.MAJ = false; break;
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