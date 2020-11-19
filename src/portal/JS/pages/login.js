let current_mode = 'login'

let switch_mode = (mo)=>{
	if(!mo || mo != 'login' && mo != 'signup'){
		current_mode = (current_mode == 'login'?'signup':'login')
	}
	else{
		current_mode = mo
	}
}

let login_content = `<div class="title-container">
Login
</div>
<div class="inputs-container">
<div class="username form-item">
  <input type="text" class="input" id="username-input" />
  <span class="small-mark">Accout</span>
</div>
<div class="password form-item">
  <input type="password" class="input" id="password-input" />
  <span class="small-mark">Password</span>
</div>
<!-- <div class="verify form-item"></div> -->
</div>
<div class="btn-container">
<div class="btn-item left-btn">
  <div class="optical-btn">
	<div class="button">Login</div>
  </div>
</div>
<div class="btn-item right-btn">
  <div class="optical-btn">
	<div class="button" style="color:white" id="to-re">Register</div>
  </div>
</div>
</div>`

let register_content = `
<div class="title-container">
	Signup
</div>
<div class="inputs-container">
	<div class="username form-item">
	<input type="text" class="input" id="username-input" />
	<span class="small-mark">Accout</span>
	</div>
	<div class="password form-item">
	<input type="password" class="input" id="password-input" />
	<span class="small-mark">Password</span>
	</div>
	<div class="re-password form-item">
	<input type="password" class="input" id="re-password-input" />
	<span class="small-mark">Re-Password</span>
	</div>
	<!-- <div class="verify form-item"></div> -->
</div>
<div class="btn-container">
	<div class="btn-item left-btn">
	<div class="optical-btn">
		<div class="button">Login</div>
	</div>
	</div>
	<div class="btn-item right-btn">
	<div class="optical-btn">
		<div class="button" style="color:white" id="to-re">Register</div>
	</div>
	</div>
</div>`

$(function () {
	let offy = $("#water-surface").offset().top
	for (let i = 0; i < 30; ++i) {
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
	}

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
			'animation': 'to-re 3s forwards'
		})
		setTimeout(()=>{
			$('.login-block-main').html(register_content)
			
		},1200)
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