//(c) Copyright 2015 lyt. All Rights Reserved. 2015-11-26
(function($) {
	$.extend($.fn.tabs.methods, {
		//默认为选中tab，可传入想选中的tab的index
		get_content: function(ob, setting) {
			var default_index = ob.tabs('getTabIndex', ob.tabs('getSelected'));
			var param = $.extend({
				index: default_index
			}, setting);
			var $content = ob.tabs('getTab', param.index);
			return $content;
		},
		add_content: function(ob, setting) {
			var param = $.extend({
				content: '',
				index: 0,
				title: "tab" + index,
				closable: false,
				selected: true,
				iconCls: null
			}, setting);
			//string_html得带script
			var string_html = param.content;
			string_html = string_html.replace(/id="(\w+)"|id='(\w+)'/g, 'id="$1_' + param.index + '"');
			string_html = string_html.replace(/#([0-9A-Za-z_]+)/g, '#$1_' + param.index);
			var tab_index = param.index;
			ob.tabs('add', {
				id: param.index,
				title: param.title,
				selected: param.selected,
				closable: param.closable,
				iconCls: param.iconCls,
				content: string_html
			});
			//加一个js 动态的
		},
		get_length: function(ob, setting) {
			return ob.tabs('tabs').length;
		},
		get_rule: function(ob, setting) {
			var length = $.fn.tabs.methods['get_length'].call(ob,ob,setting);
			var param = $.extend({
				index: length - 1,
				comboxid: '#cc'
			}, setting);
			var $contet = $.fn.tabs.methods['get_content'].call(ob,ob, param);
			var combvalue = $(param.comboxid + '_' + param.index).combo('getValue');
			if (combvalue == '01') {
				 
			}
			if (combvalue == '02') {
			 
			}
			if (combvalue == '03') {
			 
			}
			if (combvalue == '04') {
			 
			}


		}
	});
})(jQuery)