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
