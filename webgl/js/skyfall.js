var SKY = SKY || {};

SKY.CLIENT = true;

SKY.App = ( function ()
{

	return {

		start : function()
		{
			//SKY.GLManager.start();
			new SKY.GameManager();
		}

	}

} )();