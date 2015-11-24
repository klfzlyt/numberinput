(function($) {
	$.fn.tabnumber = function(setting, o) {
		if (typeof setting == "string") {
			$.fn.tabnumber.methods[setting].call(this, o);
		}
		if (typeof setting == 'object') {
			var param = $.extend({
				render_To: this,
				input_width: 300,
				activeclass: "tabnumber_activeclass",
			}, setting);

			var container = param.render_To;

		}
	};
	$.fn.tabnumber.methods = {};
	$.extend($.fn.tabnumber.methods, {
		add_Item: function(setting) {
			var THIs = this;
			
			var container = $('<div class="Item"></div>').bind('mouseenter', function(e) {
				console.log("testsets");

			}).bind('mouseleave', function(e) {


			});
			var numberinput = $('<div></div>').appendTo(container);
			var hover_container=$('<div style="margin-left: 20px;"></div>').appendTo(container);
			
			container.appendTo(THIs);
			
			var numberinput_1=$.fn.numberinput.number_input({
				render_To: numberinput,
				number_of_input: 16,
			});
		
			$('<input style="width:100px"/>').appendTo(hover_container).slider({
				showTip: true,
				rule: [1, '|', 5, '|', 10, '|', 15, '|', 20],
				max: 20,
				min: 1,
				onChange: function(old, newvalue) {					
						numberinput_1.numberinput.set_number_of_container.call(numberinput_1,old);
				}
			});

		},
		remove_Item: function(setting) {


		}
	});
})(jQuery)