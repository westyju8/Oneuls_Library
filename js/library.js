$(document).ready(function(){//시작

	//윈도우 크기 변경시 새로고침 됨.
	/*$(window).resize(function(){
		location.reload();//새로고침(경로를 새로 불러온다)
	});	*/

	///////////////    상단메뉴     ///////////////////
	//내비게이션(하위메뉴보이기)
	$("#menu li>a").mouseenter(function(){
		$("#menu li>a").removeAttr("class").next().fadeOut();// class 찌꺼기 삭제
		$(this).addClass("act").next().fadeIn();
	});
	$("#menu li>a").mouseleave(function(){
		$("#menu li>a").Attr("class").next().fadeIn();// class 찌꺼기 삭제
		$(this).removeClass("act").next().fadeOut();
	});



	///////////    상단 배너 슬라이드    //////////////
	//<a>의 부모의 부모 넓이 구하기
	const $banWidth =  $("#banner").width();
	//console.log( $banWidth );
	//이미지 하나의 넓이 구하기
	let $img = Math.round(($banWidth-60)/3);
	//해당 넓이를 <a>의 넓이값으로 부여하기
	$("#slide>a").css("width",$img);
	//해당 넓이에 오른쪽 외부여백(30)포함한 넓이 구하기
	$img += 30; //해당값에 30을 더한값이 다시 해당값이 됨.
	//console.log( $img );
	// 배너슬라이드 넓이 구하기
	const $slide = $img * 5;
	//console.log( $slide );
	//값 부여하고 + 왼쪽 이동
	$("#slide").css({"width": $slide , "left": $img * (-1)});

	// 슬라이드

	setInterval(slide , 2900);
  function slide(){
		$("#slide").stop().animate({left: $img * (-2)},"1000",function(){
				$("#slide").append(  $("#slide>a").first()  );
				$("#slide").css("left",$img*(-1));
				$("#slide>a").eq(2).addClass("act").siblings().removeAttr("class");
    });
  }


	/*배너 슬라이드 왼쪽 화살표 (오른쪽이동) */
	$("#bannerArrLeft").click(function(){
		$("#slide").stop().animate({left:0},"1000",function(){
			$("#slide").prepend(  $("#slide>a").last()  );
				$("#slide").css("left", $img*(-1));//이미지+여백만큼 왼쪽이동
				$("#slide>a").eq(2).addClass("act").siblings().removeAttr("class");
		});
	});
	/*배너 슬라이드 오른쪽 화살표 (왼쪽이동) */
	$("#bannerArrRight").click(function(){
		$("#slide").stop().animate({left: $img * (-2)},"1000",function(){
				$("#slide").append(  $("#slide>a").first()  );
				$("#slide").css("left",$img*(-1));
				$("#slide>a").eq(2).addClass("act").siblings().removeAttr("class");
		});
	});
	///////////    중앙 신간도서 슬라이드    //////////////
	//.divAll 높이 알아내기
	const $newbookHeight = $(".divAll").height();
	//console.log($newbookHeight);
	//부모인 #newBook에 높이 적용하기
	$("#slideBookParent").css({"height": $newbookHeight+50});
	//#newBook 슬라이드 보여지는 부분 넓이 구하기
	const $newBookArea = $("#slideBookParent").width();
	//#newBook 슬라이드 1개 div 넓이값 부여하기
	$(".divAll").css("width",$newBookArea);
	//#slideBook 영역을 (div 1개 넓이 만큼)왼쪽으로 이동
	$("#slideBook").css("left",$newBookArea*(-1));
	//console.log("왼쪽좌표는 "+ $("#slideBook").position().left ); //-219

	/*****휴대폰화면*****/
	if($(window).width()<=767){

		//양쪽버튼사이 중앙넓이 알아내기
		const mobileSectionWidth = $("#slideBookParent").width();
		//그 값을 도서1개 섹션 넓이에 부여하기
		$(".slideSection").css("width", mobileSectionWidth);
		//console.log("도서1개 섹션 넓이는 "+ mobileSectionWidth );  //219
		//도서5개 들어있는 div의 넓이 설정하기
		let mobileDivWidth =  mobileSectionWidth  * 5;
		$(".divAll").css("width", mobileDivWidth);
		//console.log("도서5개 들어있는 div넓이는 "+ mobileDivWidth );
		//전체슬라이드영역을 (div 1개) 넓이만큼 왼쪽으로 이동
		$("#slideBook").css("left", (mobileDivWidth) * (-1));//-219
		//$("#slideBook").css("left", 0)
		//console.log("슬라이드 왼쪽좌표는 " + $("#slideBook").position().left  );
		//전체슬라이드영역 넓이 설정하기
		$("#slideBook").css("width", $(".divAll").width()*3);
		//console.log("전체슬라이드넓이는 " + $("#slideBook").width());
	}


	//신간도서 슬라이드 왼쪽 화살표 (오른쪽이동)
	$("#bookBtnLeft").click(function(){
		$("#bookBtnLeft").prop("disabled",true);//비활성화
		if($(window).width()<=767){//휴대폰에서
			let $left = $("#slideBook").position().left;
			//console.log("모바일에서 X좌표는 " + $left );
			let pos = $(".slideSection").width();//219	(섹션 1개 넓이)
			$left = pos + $left;//예_ -219+219=0

			$("#slideBook").stop().animate({left:$left},"slow",function(){
				if($("#slideBook").position().left== 0){
					$("#slideBook").prepend( $(".divAll").last());
					$("#slideBook").prepend( $(".divAll").last());
					$("#slideBook").css("left",$(".divAll").width()*(-2));
				}
				$("#bookBtnLeft").prop("disabled",false);
			});

		}else{//PC에서
			let posPC= $("#slideBook").position().left;
			$("#slideBook").stop().animate({left:  0 },"slow", function(){
				$("#slideBook").prepend( $(".divAll").last()  );
				$("#slideBook").css("left", posPC );
				$("#bookBtnLeft").prop("disabled",false);
			});
		}
	});
	//신간도서 슬라이드 오른쪽 화살표 (왼쪽이동)
	$("#bookBtnRight").click(function(){
		$("#bookBtnRight").prop("disabled",true);//비활성화
				if($(window).width()<=767){
			let $left = $("#slideBook").position().left;
			//console.log("모바일에서 X좌표는 " + $left );
			let pos = $(".slideSection").width();//219 (섹션 1개 넓이)
			$left = $left - pos ;   //예_  (-219) - (219)= -438
			//console.log($left);
			$("#slideBook").stop().animate({left:$left},"slow",function(){
				if($("#slideBook").position().left== pos * (-14)){
					$("#slideBook").append( $(".divAll").first());
					$("#slideBook").append( $(".divAll").first());
					$("#slideBook").css("left", pos * (-4));
				}
				$("#bookBtnRight").prop("disabled",false);
			});
		}else{//PC화면
			$("#bookBtnRight").prop("disabled",true);
			$("#slideBook").stop().animate({left:$newBookArea*(-2)},1000,function(){
				$(this).append( $(this).children().first() );
				$(this).css("left",$newBookArea*(-1));
				$("#bookBtnRight").prop("disabled",false);
			});
		}
	});


	/////////////////////      베스트셀러         /////////////////////////
	// $("#iconPlus").click(function(){
	// 	$("#popImg").fadeIn();
	// });
	// $("#popImg button").click(function(){
	// 	$("#popImg").fadeOut();
	// });
	//
	// if($(window).width()<=767){
	//
	// }

	$("#iconPlus,#imgArea>a").click(function(){
		$("#popImg").fadeIn();
		$("body").css("overflow","hidden");
	});
	//팝업 큰이미지 닫기
	$("#popImg button,#popImg").click(function(){
		$("#popImg").fadeOut();
		$("body").css("overflow","auto");
	});


});//끝
