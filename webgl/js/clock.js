SKY.Clock = ( function ()
{
	var start = 0,
		current = 0,
		ellapsed = 0,
		baseSpeed = 0.05,
		speed = 1;

	return {

		start : function()
		{
			start = ( new Date() ).getTime();
			current = start;
		},

		tick : function()
		{
			var time = ( new Date() ).getTime();
			ellapsed = time - current;
			current = time;
		},

		current : function()
		{
			return current;
		},

		ellapsed : function()
		{
			return ellapsed;
		},

		setSpeed : function( newSpeed )
		{
			speed = newSpeed;
		},

		speed : function()
		{
			return ellapsed * baseSpeed * speed;
		}

	}

} )();