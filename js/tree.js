	function append_slingber() {
				var t = $('#tt');
				var node = t.tree('getSelected');
				t.tree('append', {
					parent: (node ? $(node.target).parents('li').eq(1).children('div').first() : null),
					data: [{
						text: '新条目'
					}]
				});
			}

			function append() {
				var t = $('#tt');
				var node = t.tree('getSelected');
				t.tree('append', {
					parent: (node ? node.target : null),
					data: [{
						text: '新条目'
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
(function($){
	
	
	
	
	$.extend($.fn.tree.methods,{
		selectedchanged:function($jq,param){
		
			var callback=param;
			var preselect;
			var nowselect;
			preselect=nowselect;
			norwselect=$jq.tree('getSelected');
			callback(preselect,nowselect);		
		}		
	});	
})(jQuery)
