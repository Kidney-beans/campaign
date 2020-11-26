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

	$("#enter-login").click(()=>{
		let account = $("#lo-account-input").val()
		let password = $("#lo-password-input").val()
		$("#all-screen-mask").css("display","block")
		$("#loading-state").css("display","block")
		$.ajax({
			type: "POST",
			url: "http://localhost:8099/login/user",
			data: `account=${account}&password=${password}`,
			success: function(res){
				console.log(res)
				if(res.success){
					
					$("#loading-state").css("display","none")
					$("#prompt-block-container").css("display","block")
					$("#prompt-block").attr({"tex":`登录成功！欢迎您,${res.result.name}`})
					setTimeout(()=>{
						$("#prompt-block-container").css("display","none")
						window.location.href=`http://localhost:8099/gate&SSK=${res.result.ssk}`
					},3000)
				}
				else{
					$("#loading-state").css("display","none")
					$("#prompt-block-container").css("display","block")
					$("#prompt-block").attr({"tex":`登录失败! ${res.errorMsg}`})
					setTimeout(()=>{
						$("#prompt-block-container").css("display","none")
						$("#all-screen-mask").css("display","none")
					},3000)
				}
			},
			error:function(result){
				console.log(result)
				$("#loading-state").css("display","none")
				$("#prompt-block-container").css("display","block")
				setTimeout(()=>{
					$("#all-screen-mask").css("display","none")
					$("#prompt-block-container").css("display","none")
				},3000)
			}
		 });
		
	})
	$("#enter-signup").click(()=>{
		let name = $("#si-name-input").val()
		let password = $("#si-password-input").val()
		let repassword = $("#si-re-password-input").val()
		$("#all-screen-mask").css("display","block")
		if(name == '' || password == ''){
			$("#prompt-block").attr({"tex":`信息不可为空!`})
			$("#prompt-block-container").css("display","block")
			setTimeout(()=>{
				$("#prompt-block-container").css("display","none")
				$("#all-screen-mask").css("display","none")
			},3000)
			return
		}
		if(password != repassword){
			$("#prompt-block").attr({"tex":`两次密码输入不一致!`})
			$("#prompt-block-container").css("display","block")
			setTimeout(()=>{
				$("#prompt-block-container").css("display","none")
				$("#all-screen-mask").css("display","none")
			},3000)
			return
		}
		$("#loading-state").css("display","block")

		$.ajax({
			type: "POST",
			url: "http://localhost:8099/sign-up/user",
			data: `name=${name}&password=${password}`,
			success: function(res){
				console.log(res)
				if(res.success){
					
					$("#loading-state").css("display","none")
					$("#prompt-block-container").css("display","block")
					$("#prompt-block").attr({"tex":`注册成功!您的账号是:${res.result.account}`})
					setTimeout(()=>{
						$("#prompt-block-container").css("display","none")
						$("#all-screen-mask").css("display","none")
						$("#lo-account-input").val(res.result.account)
						$("#lo-password-input").val(res.result.password)
						$("#lo-account-mark").text("")
						$("#lo-password-mark").text("")
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
					},3000)
				}
				else{
					$("#loading-state").css("display","none")
					$("#prompt-block-container").css("display","block")
					$("#prompt-block").attr({"tex":`注册失败! ${res.errorMsg}`})
					setTimeout(()=>{
						$("#prompt-block-container").css("display","none")
						$("#all-screen-mask").css("display","none")
					},3000)
				}
			},
			error:function(result){
				console.log(result)
				$("#loading-state").css("display","none")
				$("#prompt-block").attr({"tex":`系统异常!`})
				$("#prompt-block-container").css("display","block")
				setTimeout(()=>{
					$("#all-screen-mask").css("display","none")
					$("#prompt-block-container").css("display","none")
				},3000)
			}
		 });

	})
	for_mark();
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


function for_mark(){
	$("#lo-account-input").blur(function(){
		if($(this).val().length){
			$("#lo-account-mark").text("")
		}
		else{
			$("#lo-account-mark").text("Account")
		}
	})

	$("#lo-password-input").blur(function(){
		if($(this).val().length){
			$("#lo-password-mark").text("")
		}
		else{
			$("#lo-password-mark").text("Password")
		}
	})

	$("#si-name-input").blur(function(){
		if($(this).val().length){
			$("#si-name-mark").text("")
		}
		else{
			$("#si-name-mark").text("Name")
		}
	})

	$("#si-password-input").blur(function(){
		if($(this).val().length){
			$("#si-password-mark").text("")
		}
		else{
			$("#si-password-mark").text("Password")
		}
	})

	$("#si-re-password-input").blur(function(){
		if($(this).val().length){
			$("#si-re-password-mark").text("")
		}
		else{
			$("#si-re-password-mark").text("Re-Password")
		}
	})
}