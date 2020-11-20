let current_mode = 'login'

let switch_mode = (mo)=>{
	if(!mo || mo != 'login' && mo != 'signup'){
		current_mode = (current_mode == 'login'?'signup':'login')
	}
	else{
		current_mode = mo
	}
}

$(function () {
	let offy = $("#water-surface").offset().top
	let count = 40;
	let inter = setInterval(()=>{
		if(count < 0){
			clearInterval(inter)
		}
		let randomx = Math.floor(Math.random() * 100)
		let randomy = Math.floor(Math.random() * 100)
		let color = Math.floor(Math.random() * 10)
		let delay = Math.random().toFixed(2)
		console.log(randomx, randomy, color)
		let star = $('<div class="star"></div>').css({
			'left': randomx + '%',
			'top': randomy + '%',
			'background-color': ((color % 2 == 0) ? '#0250c5' : '#d43f8d'),
			'animation-delay': delay + 's',
			'box-shadow': '0px 0px 10px 2px ' + ((color % 2 == 0) ? '#0250c5' : '#d43f8d')
		})
		star.appendTo($('#top-bar'))
		count--;
	},100)

	$("#water-surface").click(function (e) {
		let event = e;
		let x = e.clientX;
		let y = e.clientY;

		let span1 = $('<span class="click-ripple" style="border: 7px solid #d43f8d"></span>')
		let span2 = $('<span class="click-ripple" style="border: 7px solid #d43f8d;animation-delay: 0.1s;"></span>')
		span1.css({
			'left': x - 100 + 'px',
			'top': y - 100 - offy + 'px'
		}).appendTo($("#water-surface"))
		span2.css({
			'left': x - 100 + 'px',
			'top': y - 100 - offy + 'px'
		}).appendTo($("#water-surface"))
		setTimeout(() => {
			span1.remove()
			setTimeout(() => {
				span2.remove()
			}, 1000)
		}, 1000)
	})

	$('#to-re').click(() => {
		$('.login-block').css({
			'animation': 'to-re 3s'
		})
		setTimeout(()=>{
			$('#login-main').css({
				'display':'none'
			})
			$('#signup-main').css({
				'display':'block'
			})
			switch_mode('signup')
		},300)
	})

	$('#to-lo').click(() => {
		$('.login-block').css({
			'animation': 'to-lo 3s'
		})
		setTimeout(()=>{
			$('#signup-main').css({
				'display':'none'
			})
			$('#login-main').css({
				'display':'block'
			})
			switch_mode('login')
		},300)
	})
	setInterval(() => {
		let randx = Math.floor(Math.random() * 100)
		let randy = Math.floor(Math.random() * 100)
		let span1 = $('<span class="click-ripple" style="border: 7px solid #03a9f4"></span>')
		let span2 = $('<span class="click-ripple" style="border: 7px solid #03a9f4;animation-delay: 0.1s;"></span>')
		span1.css({
			'left': randx + '%',
			'top': randy + '%'
		}).appendTo($("#water-surface"))
		span2.css({
			'left': randx + '%',
			'top': randy + '%'
		}).appendTo($("#water-surface"))
		setTimeout(() => {
			span1.remove()
			setTimeout(() => {
				span2.remove()
			}, 1000)
		}, 1000)
	}, 500);
})
