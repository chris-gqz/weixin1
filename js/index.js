function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function fnLoad(){
	var iTime= new Date().getTime();
	var oW=document.getElementById("welcome");
	var arr=[''];
	var bImgLoad=true;
	var bTime=false; 
    var oTimer=0;
    bind(oW,'transitionend',end)
    bind(oW,'webkitTransitionEnd',end)
   oTimer=setInterval(function(){
		if (new Date().getTime()-iTime>4000) {
			bTime=true;
		}
		if (bImgLoad&&bTime) {
			clearInterval(oTimer);
			oW.style.opacity=0;
	    }
	},1000)
    function end(){
    	oW.classList.remove('pageShow');
    			fnTab();
    }	
}
function fnTab(){
	var oTab=document.getElementById("tabPic");
	var oList=document.getElementById("piclist");
	var aNav=oTab.getElementsByTagName('nav')[0].children;
	var iNow=0;
	var iX=0;
	var iW=document.documentElement.clientWidth;
	var oTimer=0;
    var iStartTouchX=0;
    var iStartX=0;
    auto();
    if (!window.BfnScore) {
        fnScore();	
        window.BfnScore=true;
    }
    function auto(){
    		oTimer=setInterval(function(){
		iNow++;
		iNow=iNow%aNav.length;
		tab();
	},2000);
    }
	oTab.addEventListener('touchstart',fnstart,false);
	oTab.addEventListener('touchmove',fnMove,false);
	oTab.addEventListener('touchend',fnEnd,false);
	function fnstart(ev){
		oList.style.transition='none';
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
		function fnMove(ev){
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.wibkitTransform=oList.style.transform="translateX("+iX+"px)"
	}
		function fnEnd(){
			iNow=iX/iW;
		    iNow=  -Math.round(iNow);
		    if (iNow<0) {
		    	iNow=0;
		    }
		    if (iNow>aNav.length-1) {
		    	iNow=aNav.length-1;
		    }
		    iNow=iNow%aNav.length;
		    tab();
		    auto();
		}
	function tab(){
		iX= -iNow*iW;
		oList.style.transition='0.5s';
		oList.style.transform=oList.style.webkitTransform="translateX("+iX+"px)";
		for (var i=0;i<aNav.length;i++) {
			aNav[i].classList.remove('active');
		}
		aNav[iNow].classList.add('active'); 
	}
}
function fnScore(){
	var oScore=document.getElementById("score");
	var aLi=oScore.getElementsByTagName('li');
	var arr=['好失望','没有想象那么差','很一般','良好','棒极了']
	for (var i=0;i<aLi.length;i++) {
		fn(aLi[i]);
	}
	function fn(oLi){
		var aNav=oLi.getElementsByTagName('a');
		var oInput=oLi.getElementsByTagName('input')[0];
		for (var i=0;i<aNav.length;i++) {
			aNav[i].index=i;
			aNav[i].addEventListener('touchstart',function(){
				for (var i=0;i<aNav.length;i++) {
					if (i<=this.index) {
						aNav[i].classList.add('active')
					} else{
						aNav[i].classList.remove('active');
					}
				}
				oInput.value=arr[this.index];
			},false)
		}
	}
	if (!window.BfnIndex) {
		fnIndex();
		window.BfnIndex=true;
	}
	fnIndex();
choosetag();
}
function fnInfo(oInfo,sInfo){
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform='scale(1)';
	oInfo.style.opacity=1;
	setTimeout(function(){
		oInfo.style.WebkitTransform='scale(0)';
		oInfo.style.opacity=0;
	},1000);
}
function fnIndex (){
	var oIndex=document.getElementById("index");
	var oBtn=oIndex.getElementsByClassName('btn')[0];
	var oInfo=oIndex.getElementsByClassName("info")[0];
	var bScore=false;
	oBtn.addEventListener('touchend',fnEnd,false);
	function fnEnd(){
	bScore=fnScoreChecked();
	 if (bScore) {
           if (bTag()) {
        fnIndexOut();
           }else{
           	fnInfo(oInfo,'給景区添加标签');
           }
	 } else{
	        fnInfo(oInfo,'給景区评分');
	 }
	}
	function fnScoreChecked(){
		var oScore=document.getElementById("score");
		var aInput=oScore.getElementsByTagName('input');
		for (var i=0;i<aInput.length;i++) {
			if (aInput[i].value==0) {
				return false;
			}
		}
		return true;
	}
	function bTag(){
		var oTag=document.getElementById("indexTag");
		var aSpan=oTag.getElementsByTagName('span');
		for (var i=0;i<aSpan.length;i++) {
			if (aSpan[i].className=='active') {
				return true;
			}
		}
		return false;
	}
}
function choosetag(){
	var oSection=document.getElementById("indexTag");
	var aSpan=oSection.getElementsByTagName('span');
	for (var i=0;i<aSpan.length;i++) {
		aSpan[i].addEventListener('touchstart',function(){
			for (var i=0;i<aSpan.length;i++) {
				aSpan[i].classList.remove('active');
			}
			this.classList.add('active');
		},false);
	}
}
function fnIndexOut(){
	var oIndex=document.getElementById("index");
	var oMask=document.getElementById("mask");
	var oNew=document.getElementById("new");
	oMask.classList.add('pageShow');
	oNew.classList.add('pageShow');
	if (!window.BfnNew) {
		fnNew();	
		window.BfnNew=true;
	}

	setTimeout(function(){
		oMask.style.opacity=1;
		oIndex.style.webkitFilter=oIndex.style.filter='blur(5px)';
	},14)
		setTimeout(function(){
			
		oMask.style.opacity=0;
		oIndex.style.webkitFilter=oIndex.style.filter='blur(0px)';
		oNew.style.opacity=1;
		oMask.classList.remove('pageShow');
	},3000)
}

function fnNew(){
	var oNews=document.getElementById("new");
	var aInput=oNews.getElementsByTagName('input');
	var oInfo=oNews.getElementsByClassName('info')[0];
	aInput[0].onchange=function(){
      if (this.files[0].type.split('/')[0]=='video') {
      	fnNewOut();
      	this.value='';
      } else{
      	fnInfo(oInfo,'请上传视频')
      }		
	}
		aInput[1].onchange=function(){
      if (this.files[0].type.split('/')[0]=='image') {
      	fnNewOut();
      	this.value='';
      } else{
      	fnInfo(oInfo,'请上传图片')
      }		
	}
}
function fnNewOut(){
	var oNew=document.getElementById("new");
	var  oForm=document.getElementById("form");
	oForm.classList.add('pageShow');
	oNew.style.cssText='';
	oNew.classList.remove('pageShow');
	if (!window.BformIn) {
		formIn();	
		window.BformIn=true;
	}
}
function formIn(){
	var oForm=document.getElementById("form");
	var oOver=document.getElementById("over")
	var aFormTag=document.getElementById("formTag").getElementsByTagName('label');
	var bOff=false; 
	var oBtn=oForm.getElementsByClassName('btn')[0];
	for (var i=0;i<aFormTag.length;i++) {
		aFormTag[i].addEventListener('touchend',function(){
			bOff=true; 
			oBtn.classList.add('submit');
		},false);
	}
	oBtn.addEventListener('touchend',function(){
		if (bOff) {
			for (var i=0;i<aFormTag.length;i++) {
				aFormTag[i].getElementsByTagName('input')[0].checked=false;
			}
			bOff=false;
		    oOver.classList.add('pageShow');
		    oForm.classList.remove('pageShow');
		    oBtn.classList.remove('submit');
		    if (!window.Bover) {
		    over();
		    window.Bover=true;	
		    }

		}
	},false);
}
function over(){
	var oOver=document.getElementById("over");
	var oBtn=oOver.getElementsByClassName('btn')[0];
	oBtn.addEventListener('touchend',function(){
	oOver.classList.remove('pageShow');		
	},false);
}
