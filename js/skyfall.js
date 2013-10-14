var SKY = SKY || {};

SKY.App = ( function ()
{

	return {

		start : function()
		{
			SKY.GLManager.start();
		},

		started : function(){

			$( '#home' ).hide();

		}

	};

} )();