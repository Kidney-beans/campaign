let state=0;
let getState = ()=>{
	if(state < 0){
		return (state % 5 + 5 )% 5
	}
	else {
		return state
	}
}
let autoRotate = true
let mouseLock = false //鼠标锁，留着备用
let baseUrl = 'http://localhost:8098/main/';
let links = {
	'日记':'http://localhost:8098/main/diary',
	'音乐':'http://localhost:8098/main/music',
	'日程':'http://localhost:8098/main/plan',
	'相册':'http://localhost:8098/main/photos',
	'社交':'http://localhost:8098/main/relation'
};
let titles = [
	'音乐',
	'日程',
	'日记',
	'相册',
	'社交'
]
$(function(){

	//获取当前窗口高度
	console.log($(window).height());
	//获取当前窗口宽度
	console.log($(window).width());
	var h =$(window).height()/2-130;
	var w =$(window).width()/2-130;
	console.log(h);
	let inter = setInterval(()=>{
		commonRotate()
	},4000)

	$(window).blur(()=>{
		autoRotate = false
	})

	$(window).focus(()=>{
		autoRotate = true
	})

	$("[func],[to]").mouseenter(()=>{
		autoRotate = false
	
	})
	$("[func],[to]").mouseleave(()=>{
		autoRotate = true
	})

	$("#leftbtn").click(function(){

		state--
		$('#btn-link').text(titles[(getState()) % 5])
		$("#wrap").css({
			"transform":" rotateY(" +(state)*72 + "deg)"
		})
	})
	$("#rightbn").click(function(){
		state++
		$('#btn-link').text(titles[(getState()) % 5])
		$("#wrap").css({
			"transform":" rotateY(" +(state)*72 + "deg)"
		})
	})
	$("#gotobtn").mouseenter(function(e){
		let btn = this
		let x = e.clientX
		let y = e.clientY
		let gotobtn = $("#gotobtn")
		let btnLeft = gotobtn[0].offsetLeft
		let btnTop = gotobtn[0].offsetTop
		let div = $("<div></div>")
		div.addClass("ripple")
		div.css({
			"position":"absolute",
			"top":y-btnTop-400 + "px",
			"left":x-btnLeft-400 + "px"
		})
		div.appendTo(btn);
		setTimeout(()=>{
			div.remove()
		},2500);
	}).click(function(){
		let link = links[$(this).text()]
		window.open(link)
	})

	$('[linkto]').click(function(){
		let linkto = $(this).attr('linkto');
		window.open(baseUrl + linkto)
	})

	$("body").click(function(e){
		let event = e;
		let x = e.clientX;
		let y = e.clientY;
		let span1 = $('<span class="click-ripple" style="border: 7px solid #03a9f4"></span>')
		let span2 = $('<span class="click-ripple" style="border: 7px solid #d43f8d;animation-delay: 0.1s;"></span>')
		span1.css({
			'left':x-100 + 'px',
			'top':y-100 + 'px'
		}).appendTo($('body'))
		span2.css({
			'left':x-100 + 'px',
			'top':y-100 + 'px'
		}).appendTo($('body'))
		setTimeout(()=>{
			span1.remove()
			setTimeout(()=>{
				span2.remove()
			})
		},1000)
	})
})

function commonRotate(){
	if(!autoRotate){
		return
	}
	$('#btn-link').text(titles[(getState()+1) % 5])
	$("#wrap").css({
		"transform":" rotateY(" +(state+1)*72 + "deg)"
	})
	mouseLock = true
	setInterval(()=>{
		mouseLock = false
	},2000)
	state++
                 
				 
}
