(function($) {
	$.extend({

		number_input: function(setting) {
			//default setting
			var param = $.extend({
				render_To: "document",
				inputsize: {
					width: 29,
					height: 7
				},
				activeCssName: "active",
				containerCSSName: "digital_Container",
				digitalCssName: "digital",
				centactiveCssName: "centeractive",
				number_of_input: 6,
				validator: function(charcode) {
					return true;
				}
			}, setting);

			/*
			 * 设置输入域(input/textarea)光标的位置
			 * @param {HTMLInputElement/HTMLTextAreaElement} elem
			 * @param {Number} index
			 */
			function setCursorPosition(elem, index) {
				var val = elem.value
				var len = val.length

				// 超过文本长度直接返回
				if (len < index) return
				setTimeout(function() {
					elem.focus()
					if (elem.setSelectionRange) { // 标准浏览器
						elem.setSelectionRange(index, index)
					} else { // IE9-
						var range = elem.createTextRange()
						range.moveStart("character", -len)
						range.moveEnd("character", -len)
						range.moveStart("character", index)
						range.moveEnd("character", 0)
						range.select()
					}
				}, 10)
			}
			var numberindex = 0;
			var collec;
			var container = $(param.render_To);
			var number_arr = [];
			var char_arr = [];
			for (var i = 0; i < param.number_of_input; ++i) {
				char_arr.push('_');
			}
			container.addClass(param.containerCSSName);
			var $input = $('<input type="text" tabindex="" id="payPassword_rsainput" name="payPassword_rsainput" class="" oncontextmenu="return true" onpaste="return false" oncopy="return true" oncut="return false" autocomplete="off" value="" maxlength="' + param.number_of_input + '" minlength="' + param.number_of_input + '" style="margin-left: -999px">')
				.appendTo(container);
			$input.val(char_arr.join(""));
			var number_container = $('<div></div>').appendTo(container);
			container.css('width', (param.inputsize.width + 1) * param.number_of_input + 'px');
			$input.bind("keydown", function(e) {

				//e.preventDefault();
				if (e.which == 8) {
					$input.blur();
					number_arr[numberindex].text("");
					//char_arr.splice(numberindex, 1);
					if (char_arr[numberindex] == '_') {
						numberindex--;
						if (numberindex <= 0) numberindex = 0;
						for (var i = 0; i < collec.length; i++) {
							$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
						}
						if (char_arr[numberindex] == '_')
							$(collec[numberindex]).addClass(param.centactiveCssName);
						else
							$(collec[numberindex]).addClass(param.activeCssName);
						$input.val(char_arr.join(""));
						setCursorPosition($input.get(0), numberindex);
						return;
					}
					char_arr[numberindex] = '_';
					$input.val(char_arr.join(""));
					setCursorPosition($input.get(0), numberindex);
					for (var i = 0; i < collec.length; i++) {
						$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
					}
					if (char_arr[numberindex] == '_')
						number_arr[numberindex].parent('.' + param.digitalCssName).addClass(param.centactiveCssName);
					else
						number_arr[numberindex].parent('.' + param.digitalCssName).addClass(param.activeCssName);
					//numberindex--;
					if (numberindex <= 0) numberindex = 0;
				}
				console.log(e.which);
				if (e.which == 37) {
					numberindex--;
					if (numberindex <= 0) numberindex = 0;
					for (var i = 0; i < collec.length; i++) {
						$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
					}
					if (char_arr[numberindex] == '_')
						$(collec[numberindex]).addClass(param.centactiveCssName);
					else
						$(collec[numberindex]).addClass(param.activeCssName);
				}
				if (e.which == 39) {
					numberindex++;
					if (numberindex >= param.number_of_input) numberindex = param.number_of_input - 1;
					for (var i = 0; i < collec.length; i++) {
						$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
					}
					if (char_arr[numberindex] == '_')
						$(collec[numberindex]).addClass(param.centactiveCssName);
					else
						$(collec[numberindex]).addClass(param.activeCssName);
				}




			}).bind('keypress', function(e) {

				if (!param.validator(e.which)) return;
				if (char_arr[numberindex] != '_') {
					numberindex++;
					setCursorPosition($input.get(0), numberindex);
					if (numberindex >= param.number_of_input) numberindex = param.number_of_input - 1;
					for (var i = 0; i < collec.length; i++) {
						$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
					}
					if (char_arr[numberindex] == '_')
						$(collec[numberindex]).addClass(param.centactiveCssName);
					else
						$(collec[numberindex]).addClass(param.activeCssName);
					return ;
				}
				number_arr[numberindex].text(String.fromCharCode(e.which));
				$input.blur();
				char_arr[numberindex] = String.fromCharCode(e.which);
				$input.val(char_arr.join(""));

				numberindex++;
				setCursorPosition($input.get(0), numberindex);
				if (numberindex >= param.number_of_input) numberindex = param.number_of_input - 1;
				for (var i = 0; i < collec.length; i++) {
					$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
				}
				if (char_arr[numberindex] == '_')
					$(collec[numberindex]).addClass(param.centactiveCssName);
				else
					$(collec[numberindex]).addClass(param.activeCssName);


			});




			for (var i = 0; i < param.number_of_input; i++) {
				var sliderbar = $('<div><b></b></div>')
					.attr('class', param.digitalCssName)
					.css('width', param.inputsize.width + 'px')
					.appendTo(number_container);
				number_arr.push($(sliderbar.children('b')[0]));
				sliderbar
					.bind("click", function() {
						//console.log("click");

						$input.focus();

						collec = number_container.children("." + param.digitalCssName);
						for (var i = 0; i < collec.length; i++) {
							if (collec[i] != this) {
								$(collec[i]).removeClass(param.activeCssName).removeClass(param.centactiveCssName);
							} else {
								numberindex = i;
								setCursorPosition($input.get(0), numberindex + 1);
							}
						}
						for (var i = 0; i < collec.length; i++) {
							$(collec[i]).removeClass(param.centactiveCssName).removeClass(param.activeCssName);
						}
						if (char_arr[numberindex] == '_')
							$(collec[numberindex]).addClass(param.centactiveCssName);
						else
							$(collec[numberindex]).addClass(param.activeCssName);

					});

			}




		}

	});
})(jQuery);