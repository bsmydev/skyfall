var SKY = SKY || {};

SKY.App = ( function ()
{

	return {

		start : function()
		{
			SKY.Home = new SKY.Home();
			SKY.GLManager.start();
		},

		started : function(){

			

		}

	};

} )();