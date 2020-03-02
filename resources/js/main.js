$(document).ready(() => {

	$('#filter').hide();

	$('.login-button').click(() => {
		$('#login-form').slideToggle();
	});

	const disabledAddBtn = () => {
		$('#addBtn')
			.attr('disabled', 'disabled')
			.addClass('my-disabled')
	};


	$('#myInput').keyup((e) => {
		let $input = $('#myInput');

		if ($input.val() === '') {
			disabledAddBtn();
		} else {
			$('#addBtn')
				.removeAttr('disabled')
				.removeClass('my-disabled')
		}

		if ($('#myInput').val().length > 0 && e.keyCode === 13) {
			addNewTodo();
			disabledAddBtn();
		}
	});

	$('#addBtn').on('click', () => {
		if ($('#myInput').val().length > 0) {
			addNewTodo();
			disabledAddBtn();
		}
	});

	const addNewTodo = () => {

		let $input = $('#myInput');
		let $li = $('<li/>');
		$li.addClass('list-group-item');
		let $label = $('<label/>');
		let $editInput = $('<input/>');
		$editInput.hide();
		$li.append($editInput);
		$label
			.text($input.val())
			.addClass('mb-0')
			.dblclick(() => {
				$label.hide();
				$editInput.show()
					.val($label.text())
					.on('keyup', (e) => {
						if (e.keyCode === 13 && $editInput.val().length > 0) {
							$label.text(e.target.value);
							$editInput.hide();
							$label.show();
						} if (e.keyCode === 27 || e.keyCode === 13 && $editInput.val().length === 0) {
							$label.val();
							$editInput.hide();
							$label.show();
						}
					})
					.on('blur', (e) => {
						$label.text(e.target.value);
						$editInput.hide();
						$label.show();
					})
			});

		$li.append($label);
		$li.append($('<span/>')
			.text('x')
			.addClass('close')
			.click(() => {
				$li.remove();
				toggleFilter();
			}))
			.appendTo($('#myList'))
			.on('click', 'label', () => {
				$label.toggleClass('done')
			})
		$input.val('')

		toggleFilter();

	};

	const toggleFilter = () => {
		if ($('#myList li').length > 0) {
			$('#filter').show();
		} else {
			$('#filter').hide();
		}
	}


	$('#allTodo').click(() => {
		$('#allTodo').addClass('active');
		$('#doneTodo').removeClass('active');
		$('#undoneTodo').removeClass('active');
		$('li').show();
	});

	$('#doneTodo').click(() => {
		$('#doneTodo').addClass('active');
		$('#allTodo').removeClass('active');
		$('#undoneTodo').removeClass('active');
		$('li').hide();
		$('label.done').parent().show();
	});

	$('#undoneTodo').click(() => {
		$('#doneTodo').removeClass('active');
		$('#allTodo').removeClass('active');
		$('#undoneTodo').addClass('active');
		$('li').hide();
		$('li label').not('.done').parent().show();
	})


});



















