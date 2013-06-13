// ローカルストレージが使えない場合は警告表示して終了
if (null == window.localStorage) {
	alert("LocalStorage must be enabled for changing options.");
	return;
}

// ローカルストレージに保存するときのキー
var strageKey = "mysppppp";
var strageAWidthKey = "awidth";
var strageArticleWidthKey = "articlewidth";
// ターゲットUL
var target = "#nav_sub li ul";
// keylogger
var keylogger = "";
// リサイズ対象要素
var a = "#a";
var article = "article";

// ローカルストレージから取得
var myData = window.localStorage.getItem(strageKey);
if (null != myData && "undefined" != myData) {
	// 存在すれば既存のasideを削除
	// TODO : 新たにメニューに追加された時に気付かないよ！！
	$("aside").empty();
	// ローカルストレージに保存してあるメニューで上書き
	$("aside").append(myData);
} else {
	// 存在しなければ、一番上にマイメニュー追加
	$("#nav_sub li:first").before("<li class='menutitle'><p><strong>★ My menu ★</strong>&nbsp;&nbsp;<a id='menuhide' href='javascript:void(0)'>Hide →→</a></p><ul style='display: block;'><p id='draghere'><font color='red'>drag here</font></p></ul></li><a id='managemenusave' href='javascript:void(0)'>Save</a><br />");
}

// ULをソート可能にする
$(target).sortable({
	connectWith: target,
	update: function(event, ui) {
//		var updateArray = $(target).sortable("toArray").join(",");
//		alert(updateArray)
//		window.localStorage.setItem(key, $("#" + key).val());
//		jQuery . cookie( 'jquery-ui-sortable', updateArray, { expires: 1 } );
    }
});

// ローカルストレージから幅を取得
var myAWidth = window.localStorage.getItem(strageAWidthKey);
var myArticleWidth = window.localStorage.getItem(strageArticleWidthKey);
if (null != myAWidth && "undefined" != myAWidth
	&& null != myArticleWidth && "undefined" != myArticleWidth) {
	// 存在すれば画面の幅を上書き
	$(a).width(myAWidth);
	$(article).width(myArticleWidth);
}

// #aをリサイズ可能にする
$(a).css({
	"border": "2px",
	"border-style": "none solid",
	"border-color": "#D3D3D3",
	"padding": "5px"
});
$(a).resizable({
	handles: "w, e",
	alsoResize: "article",
	stop: function(event, ui) {
		window.localStorage.removeItem(strageAWidthKey);
		window.localStorage.setItem(strageAWidthKey, $(a).width());
		myAWidth = $(a).width();
		window.localStorage.removeItem(strageArticleWidthKey);
		window.localStorage.setItem(strageArticleWidthKey, $(article).width());
		myArticleWidth = $(article).width()
	}
});

// ULの文字をなぞっても選択状態にならないようにするおまじない
$( "#nav_sub li ul" ).disableSelection();

$(function() {
	
	// 保存ボタンが押下されたときに現在のasideをローカルストレージに保存
	// TODO : 重そう..
	$("#managemenusave").click(function() {
		window.localStorage.removeItem(strageKey);
		window.localStorage.setItem(strageKey, $("aside").html());
		alert("保存しましま！")
	})
	if (null != myData && "undefined" != myData) {
		$("li.menutitle > p").click(function(){
			$(this).next("ul").toggle("bounce");
		})
	}
	// 初回、My Menuエリアの「drag here」にドラッグされたら要素を削除
	$("#draghere").droppable({
	    drop: function(ev, ui) {
	    	$(this).remove();
	    },
	    over: function(ev, ui) {
	    	$(this).remove();
	    }
	})
	// 「Hide」を押されたら、asideを隠して、articleのwidthを100%にする
	$("#menuhide").click(function() {
		$("aside")
			.animate({ width: "hide" }, "normal")
			.promise().done(function () {
				$(article).width("100%");
			});
	});
	// 右上の画像を押されたら、メニューの表示/非表示を切り替える
	$("#pots").click(function() {
		if ($("aside").is(":visible")) {
			$("aside")
				.animate({ width: "hide" }, "normal")
				.promise().done(function () {
					$(article).width("100%");
				});
		} else {
			if (null != myArticleWidth && "undefined" != myArticleWidth) {
				$(article).width(myArticleWidth);
			} else {
				$(article).width("720px");
			}
			$("aside").animate({ width: 'show' }, 'normal' )
		}
	});

/*
	// keylogger処理
	$(window).keydown(function(e){
		console.log(e.keyCode)
		if ("27" == e.keyCode) {
			keylogger = "";
			return;
		}
		keylogger += e.keyCode;
		console.log("keylogger:" + keylogger)
		// 「zz」が押されたら...！
		if ("9090" == keylogger) {
			alert("おめでとう")
		}
	});
*/
})
