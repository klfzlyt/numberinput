function append_slingber() {
	var t = $('#tt');
	var node = t.tree('getSelected');
	t.tree('append', {
		parent: (node ? $(node.target).parents('li').eq(1).children('div').first() : null),
		data: [{
			text: '新条目',
			rule: []
		}]
	});
}

function append() {
	var t = $('#tt');
	var node = t.tree('getSelected');
	t.tree('append', {
		parent: (node ? node.target : null),
		data: [{
			text: '新条目',
			rule: []
		}]
	});
}

function removeit() {
	var node = $('#tt').tree('getSelected');
	$('#tt').tree('remove', node.target);
}

function collapse() {
	var node = $('#tt').tree('getSelected');
	$('#tt').tree('collapse', node.target);
}

function expand() {
	var node = $('#tt').tree('getSelected');
	$('#tt').tree('expand', node.target);
}
(function($) {


	var json_str = $.ajax({
		url: "./json/data2.json",
		async: false
	}).responseText;

	var json_ob_arr = JSON.parse(json_str);
	$('#tt').tree({
		data: json_ob_arr,
		animate: true,
		dnd: false,
		lines: true,
		tabs: $('#table_tab'),
		input_number: $('#test1234'),
		onContextMenu: function(e, node) {
			e.preventDefault();
			$(this).tree('select', node.target);
			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		},
		formatter: function(node) {
			var s = node.text;
			if (node.children) { //这里可能要做一些兼容性处理
				s += ' <span style=\'color:blue\'>(' + node.children.length + ')</span>';
			}
			return s;
		},
		onDblClick: function(node) {
			$(this).tree('beginEdit', node.target);
		},
		onSelect: function(node) {
			var ob = $(this);
			var $tab_main = $.ajax({
				url: "./tabcontent.html",
				async: false
			}).responseText;
			$tab_main = $tab_main.replace('none', 'block');
			var tab = ob.data('tree').options.tabs;
			var input_number = ob.data('tree').options.input_number;
			tab.tabs('close_all');
			input_number.tabnumber('clear_all');
			var noderule = node.rule;
			var rule_input_number = [];
			tab.tabs({
				fit: true,
				onSelect: function(title, index12) {
					input_number.tabnumber('set_active', {
						index: index12
					});
				},
				onupdate_content: function(setting) {
					var changed_object = this;
					console.log("index: " + setting.index + " selecttype:" + setting.data.type + " datavaule: " + setting.data.value);
				}
			});
			for (var i = 0; i < noderule.length; i++) {
				rule_input_number.push(noderule[i].data.length);
				tab.tabs('add_content', {
					content: $tab_main,
					data: noderule[i]
				});
			}
			input_number.tabnumber({
				rules: rule_input_number,
				width: 400,
				onclick: function(e) {
					tab.tabs('select', e);
				},
				onupdate: function(e) {
					console.log("index: " + e.index + " value: " + e.value);
				}
			});


			//step1 :save


			//step2: change



			//alert(node.text)
		},
		onAfterEdit: function(node) {

			alert(node.text);
		}
	});


	$.extend($.fn.tree.methods, {
		selectedchanged: function($jq, param) {

			var callback = param;
			var preselect;
			var nowselect;
			preselect = nowselect;
			norwselect = $jq.tree('getSelected');
			callback(preselect, nowselect);
		},
		getparents: function(ob, param) {


		},
		get_json_str: function(ob, param) {
			var tab = ob.tree('data').options.tabs;
			var input_number = ob.tree('data').options.input_number;

		}


	});
})(jQuery)