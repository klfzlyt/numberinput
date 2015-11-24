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
				onclick:function(e){}
			}, setting);
			
			
			$.extend(this.tabnumber.callbacks,{"onclick":param.onclick});
			
			

		}
	};
	$.fn.tabnumber.callbacks={};
	$.fn.tabnumber.methods = {};
	$.extend($.fn.tabnumber.methods, {
		add_Item: function(setting) {
			var param = $.extend({
				activeclassName:'ttttt'
			}, setting);
			
			var THIs = this;
			
			var container = $('<div class="Item" style="float:left"></div>')
			.bind('mouseenter', function(e) {
				//console.log("testsets");
					hover_container.show();
			})
			.bind('mouseleave', function(e) {
					hover_container.hide();

			}).bind('click',function(e){
				///callback
					e.preventDefault();
						e.stopPropagation();
						var childrens=THIs.children("div.Item").removeClass(param.activeclassName);
						$(this).addClass(param.activeclassName);								
						for (var i = 0; i < childrens.length; i++) {
							if($(childrens[i]).hasClass(param.activeclassName)){
								//THIS & this
								THIs.tabnumber.callbacks.onclick.call(this,i);
							}
						}
			});
			var numberinput = $('<div></div>').appendTo(container);
			var hover_container=$('<div style="margin-left: 20px;"></div>').appendTo(container).hide();
			
			container.appendTo(THIs);
			
			var numberinput_1=$.fn.numberinput.number_input({
				render_To: numberinput,
				number_of_input: 1,
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
				var THIS=this;
				var childrens=THIS.children("div.Item");
				var param = $.extend({
				index: childrens.length-1,
			}, setting);
			var index=param.index;
			if(index>=0)
			$(childrens[index]).remove();
		},
		set_active:function(setting){
			var THIS=this;
			var param=$.extend({
				index:0,
				activeclassName:'ttttt'
			},setting);
			var childrens=THIS.children("div.Item").removeClass(param.activeclassName);
			$(childrens[param.index]).addClass(param.activeclassName);		
		},
		get_selected:function(setting){
			var param = $.extend({
				activeclassName:'ttttt'
			}, setting);
			var children=THIS.children("div.Item");
			for (var i = 0; i < children.length; i++) {
				if($(children[i]).hasClass(param.activeclassName))return i;
			}
		}
		
	});
})(jQuery)