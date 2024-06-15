window.__require=function t(e,o,n){function i(s,c){if(!o[s]){if(!e[s]){var r=s.split("/");if(r=r[r.length-1],!e[r]){var l="function"==typeof __require&&__require;if(!c&&l)return l(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}s=r}var u=o[s]={exports:{}};e[s][0].call(u.exports,function(t){return i(e[s][1][t]||t)},u,u.exports,t,e,o,n)}return o[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<n.length;s++)i(n[s]);return i}({AcrossTips:[function(t,e,o){"use strict";cc._RF.push(e,"4eddb8V0kVLILjTcqkZqUSx","AcrossTips"),o.__esModule=!0,o.AcrossTips=void 0;var n=cc.Class({extends:cc.Component,statics:{getInstance:function(){return cc.find("Canvas/AcrossTips").getComponent("AcrossTips")}},properties:{tipsPrefab:cc.Prefab},onLoad:function(){this.tipsList=[]},showTips:function(t){var e=this.tipsList.find(function(t){return!1===t.active});void 0===e&&(e=cc.instantiate(this.tipsPrefab),this.tipsList.push(e),this.node.addChild(e)),e.opacity=0,e.x=0,e.y=.5*cc.winSize.height-240,e.active=!0,e.runAction(cc.sequence(cc.spawn(cc.moveBy(.3,cc.v2(0,50)),cc.fadeTo(.4,255)).easing(cc.easeOut(2)),cc.delayTime(1),cc.callFunc(function(){e.active=!1}))),e.getChildByName("text").getComponent(cc.Label).string=t}});o.AcrossTips=n,cc._RF.pop()},{}],DialogBase:[function(t,e,o){"use strict";cc._RF.push(e,"4ccc82N/vxI44TzJSUG8aeO","DialogBase"),o.__esModule=!0,o.DialogBase=void 0;var n=t("OrderManager"),i=cc.Class({extends:cc.Component,properties:{autoMask:!0,hideGaming:!1,canShowInTop:!1},ctor:function(){this.__autoMaskInited=!1,this.__onHideCallList=[]},show:function(){this.node&&(this.node.active||(this.hideGaming&&n.OrderManager.hideGaming(),this.node.active=!0,this._checkAddMask(),this.onShow.apply(this,arguments)))},hide:function(){this.node&&this.node.active&&(this.hideGaming&&n.OrderManager.showGaming(),this.node.active=!1,this.onHide(),this.__onHideCallList.forEach(function(t){return t&&t()}))},onShow:function(){},onHide:function(){},isShowing:function(){return this.node&&this.node.active},setOnHide:function(t){this.canShowInTop||this.__onHideCallList.push(t)},showPopAction:function(t){void 0===t&&(t={})},_checkAddMask:function(){this.__autoMaskInited||(this.__autoMaskInited=!0,this.autoMask&&this._addMaskLayer())},_addMaskLayer:function(){var t=this;cc.loader.loadRes("prefab/AutoMask",function(e,o){o&&t.node.insertChild(cc.instantiate(o),0)})}});o.DialogBase=i,cc._RF.pop()},{OrderManager:"OrderManager"}],DialogManager:[function(t,e,o){"use strict";cc._RF.push(e,"aef02bhk9BP4KxHMmn6qE8s","DialogManager"),o.__esModule=!0,o.DialogManager=void 0;var n=cc.Class({extends:cc.Component,statics:{getInstance:function(){return cc.find("Canvas/DialogManager").getComponent("DialogManager")}},properties:{dialogs:[cc.Prefab]},ctor:function(){this._dialogsMap=new Map,this._isShowing=!1,this._showList=[],this._currentDialog=null},onLoad:function(){var t=this;this.dialogs.forEach(function(e){if(e){var o=cc.instantiate(e);o.active=!1,o.parent=t.node;var n=o.getComponent(e.name);n?(n.setOnHide(function(){if(t._showList.length>0){var e=t._showList.shift(),o=e.name,n=e.args;t._doShow.apply(t,[o].concat(n))}else t._isShowing=!1,t._currentDialog=null}),t._dialogsMap.set(e.name,o)):cc.error(">> %s.js \u4e0d\u5b58\u5728\uff01",e.name)}})},isShowing:function(){return this._isShowing},show:function(t){for(var e=arguments.length,o=new Array(e>1?e-1:0),n=1;n<e;n++)o[n-1]=arguments[n];this._isShowing?this._showList.push({name:t,args:o}):this._doShow.apply(this,[t].concat(o))},clearshow:function(t){for(var e=arguments.length,o=new Array(e>1?e-1:0),n=1;n<e;n++)o[n-1]=arguments[n];this._isShowing?(this._showList=[],this._showList.push({name:t,args:o}),this._currentDialog&&this._currentDialog.hide()):this._doShow.apply(this,[t].concat(o))},insertshow:function(t){for(var e=arguments.length,o=new Array(e>1?e-1:0),n=1;n<e;n++)o[n-1]=arguments[n];this._isShowing?this._showList.splice(0,0,{name:t,args:o}):this._doShow.apply(this,[t].concat(o))},showInTop:function(t){var e=this._dialogsMap.get(t)&&this._dialogsMap.get(t).getComponent(t);if(e){e.node.zIndex=99;for(var o=arguments.length,n=new Array(o>1?o-1:0),i=1;i<o;i++)n[i-1]=arguments[i];e.show.apply(e,n)}else cc.error(">> %s \u672a\u6ce8\u518c\uff01 \u6216 %s.js \u4e0d\u5b58\u5728\uff01",t,t)},_doShow:function(t){this._isShowing=!0;var e=this._dialogsMap.get(t)&&this._dialogsMap.get(t).getComponent(t);if(e){this._currentDialog=e;for(var o=arguments.length,n=new Array(o>1?o-1:0),i=1;i<o;i++)n[i-1]=arguments[i];e.show.apply(e,n)}else cc.error(">> %s \u672a\u6ce8\u518c\uff01 \u6216 %s.js \u4e0d\u5b58\u5728\uff01",t,t)}});o.DialogManager=n,cc._RF.pop()},{}],ISingleton:[function(t,e,o){"use strict";cc._RF.push(e,"404c2/hnA9D1IOjCqHIpG97","ISingleton"),o.__esModule=!0,o.ISingleton=void 0;var n=new WeakMap,i=new WeakMap,a=function(){function t(){if((this instanceof t?this.constructor:void 0)===t)throw new Error("Cannot instantiate the type ISingleton!");if(!n.get(this.constructor))throw new Error("Cannot instantiate the type "+this.constructor.name+"! Please use ${this.constructor.name}.getInstance().")}return t.getInstance=function(){return i.get(this)||(n.set(this,!0),i.set(this,new this),n.set(this,!1)),i.get(this)},t}();o.ISingleton=a,cc._RF.pop()},{}],OrderManager:[function(t,e,o){"use strict";cc._RF.push(e,"d6321Q6BxNMcLoCVHbggs9Z","OrderManager"),o.__esModule=!0,o.OrderManager=void 0,t("store");var n,i,a,s,c,r={init:function(){n||(n=cc.find("Canvas/gaming")),i||(i=cc.find("Canvas/rest")),a||(a=cc.find("Canvas/index")),s||(s=cc.find("Canvas/maskLayer")),c||(c=cc.find("Canvas/bg/bg3/starLayer"))},showGaming:function(){this.init(),n.opacity=255,i.opacity=255,a.opacity=255,s.active=!1,c.active=!0},hideGaming:function(){this.init(),n.opacity=0,i.opacity=0,a.opacity=0,s.active=!0,c.active=!1}};o.OrderManager=r,cc._RF.pop()},{store:"store"}],SFXStars:[function(t,e,o){"use strict";cc._RF.push(e,"160f2CYCkJP673K7wQP+t89","SFXStars"),o.__esModule=!0,o.SFXStars=void 0;var n=cc.Class({name:"SFXStars.ScaleRange",properties:{min:{default:.5,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661f\u8282\u70b9\u7f29\u653e\u8303\u56f4\u8d77\u59cb\u503c"},max:{default:1,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661f\u8282\u70b9\u7f29\u653e\u8303\u56f4\u7ec8\u6b62\u503c"}},setScaleOf:function(t){!t||1===this.min&&1===this.max||(t.scale=this.min+(this.max-this.min)*Math.random())}}),i=cc.Class({name:"SFXStars.FadeRange",properties:{min:{default:10,type:cc.Float,range:[0,255,1],tooltip:"\u661f\u661ffadeTo\u8d77\u59cb\u503c"},max:{default:155,type:cc.Float,range:[0,255,1],tooltip:"\u661f\u661ffadeTo\u7ec8\u6b62\u503c"},time2min:{default:1,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661ffadeTo min\u65f6\u95f4"},time2minDelay:{default:2,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661ffadeTo min\u65f6\u95f4"},time2max:{default:1,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661ffadeTo max\u65f6\u95f4"},time2maxDelay:{default:.5,type:cc.Float,range:[.01,void 0,.01],tooltip:"\u661f\u661ffadeTo max\u65f6\u95f4"}},setFadeOf:function(t,e){if(void 0===e&&(e=.01),t&&(255!==this.min||255!==this.max)){t.x=-1e4,t.y=-1e4,t.opacity=this.min;var o=t.scale;t.runAction(cc.sequence(cc.delayTime(e),cc.callFunc(function(){t.x=t.parent.width*(Math.random()-t.parent.anchorX),t.y=t.parent.height*(Math.random()-t.parent.anchorY),t.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(this.time2max,o),cc.fadeTo(this.time2max,this.max)),cc.delayTime(this.time2maxDelay),cc.spawn(cc.scaleTo(this.time2min,0),cc.fadeTo(this.time2min,this.min)),cc.delayTime(this.time2minDelay),cc.callFunc(function(){t.x=t.parent.width*(Math.random()-t.parent.anchorX),t.y=t.parent.height*(Math.random()-t.parent.anchorY)},this))))},this)))}}}),a=cc.Class({extends:cc.Component,properties:{randomPos:{default:!0,tooltip:"\u662f\u5426\u968f\u673a\u4f4d\u7f6e"},scaleRange:{type:n,default:null,tooltip:"\u662f\u5426\u968f\u673a\u5927\u5c0f\uff1a\u5f53 min === max === 1 \u6216 scaleRange === null \u65f6\uff0c\u968f\u673a\u751f\u6548\uff0c\u4f7f\u7528 stars \u539f\u59cb\u7f29\u653e\u503c\u3002"},fadeRange:{type:i,default:null,tooltip:"\u662f\u5426\u4f7f\u7528fadeTo\u6548\u679c\uff1amin === max === 255 \u6216 fadeRange === null \u65f6\uff0c\u4e0d\u4f7f\u7528fadeTo\u6548\u679c\u3002"}},onLoad:function(){var t=this;this.stars=[],this.node.children.forEach(function(e){return t.stars.push(e)})},reset:function(){var t=this;this.stars.forEach(function(t){return t&&t.stopAllActions()});var e=0;this.stars.forEach(function(o){t.randomPos&&o&&(o.x=t.node.width*(Math.random()-t.node.anchorX),o.y=t.node.height*(Math.random()-t.node.anchorY)),t.scaleRange&&t.scaleRange.setScaleOf(o),t.fadeRange&&(t.fadeRange.setFadeOf(o,e),e+=(t.fadeRange.time2min+t.fadeRange.time2minDelay+t.fadeRange.time2max+t.fadeRange.time2maxDelay)/3+Math.random())})},onEnable:function(){this.reset()},onDisable:function(){this.stars.forEach(function(t){return t&&t.stopAllActions()})}});o.SFXStars=a,cc._RF.pop()},{}],ajax:[function(t,e){"use strict";cc._RF.push(e,"39bff1fy5pDcJ7PyZR2MfJj","ajax");var o=function(t){if(!t)return"";var e=[];for(var o in t)e.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return e.join("&")};e.exports=function(t){var e=t,n=e.type.toLocaleUpperCase(),i="POST"===n,a=!1,s=e.timeout||8e3,c=e.withCredentials,r=new XMLHttpRequest,l=o(e.data),u=e.url;!i&&(u+=(u.indexOf("?")>-1?"&":"?")+l),r.open(n,u,!0);var h=t.headers;if(h)for(var d in h)r.setRequestHeader(d,h[d]);c&&(r.withCredentials=!0),e.dataType&&(r.dataType=e.dataType),i&&r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var p=0;return r.onreadystatechange=function(){if(4==r.readyState){var t=r.status;if(t>=200&&t<300||304==t){var o=r.responseText,n=null;try{n=JSON.parse(o)}catch(i){throw i}e.success&&e.success(n,r)}else e.error&&e.error(r,r.status?"error":"abort",e.url);a=!0,p&&clearTimeout(p)}},r.send(i?l:null),s&&(p=setTimeout(function(){a||(r.onreadystatechange=function(){},r.abort(),e.error&&e.error(r,"timeout",e.url))},s)),r},cc._RF.pop()},{}],baseDialog:[function(t,e){"use strict";var o,n;cc._RF.push(e,"649c7ZjUOZFYrLs16blaOC2","baseDialog"),cc.Class({extends:cc.Component,show:function(t){o&&n||(o=cc.find("Canvas/modal"),n=o.getComponent("modal")),o.on("close",this.close,this),n.show(t)}}),cc._RF.pop()},{}],bg:[function(t,e){"use strict";cc._RF.push(e,"bcc66mc7bdPx6Z8E+uHnJ0r","bg"),t("store").global,cc.Class({extends:cc.Component,properties:{bg1:cc.Node,bg2:cc.Node,bg3:cc.Node,bg3_1:cc.Node,bg3_2:cc.Node,starLayer:cc.Node,bg3SpriteFrame:[cc.SpriteFrame]},onLoad:function(){this.rotationVal=0,this.timer=0,this.isChanging=!1;var t=cc.view.getDesignResolutionSize(),e=cc.view.getFrameSize();e.height/e.width>t.height/t.width&&(this.starLayer.height=this.starLayer.height/t.height*(e.height/e.width)*t.width)},rotateBg:function(){this.bg1.angle=this.rotationVal,this.bg2.angle=this.rotationVal,this.rotationVal++,this.rotationVal%=360},update:function(t){if(this.timer>.2)return this.timer=0,void this.rotateBg();this.timer+=t}}),cc._RF.pop()},{store:"store"}],bubbles:[function(t,e){"use strict";cc._RF.push(e,"ddad6tqvgNHeaqJwqcUY7iA","bubbles"),cc.Class({extends:cc.Component,properties:{bubble:{default:null,type:cc.Node},adBubble:{default:null,type:cc.Node}},getBlock:function(){return cc.instantiate(this.bubble)}}),cc._RF.pop()},{}],bubble:[function(t,e){"use strict";cc._RF.push(e,"f8bafM3MYhCWrReyJY1/DDH","bubble");var o=t("store").global,n=t("explodes"),i=new cc.Event.EventCustom("peng",!0),a=Date.now();cc.Class({extends:cc.Component,properties:{explodes:{default:null,type:n},gift:{default:null,type:cc.Node},giftSpriteFrames:[cc.SpriteFrame],bubbleSpr:cc.Node,bubbleSpriteFrames:[cc.SpriteFrame]},onLoad:function(){this.isColor=!1;var t=this.node.getComponent(cc.RigidBody),e=this.node.getComponent(cc.PhysicsCircleCollider).radius=60+60*Math.random(),o=this.node.width;this.curScale=2*e/o,this.node.width=this.node.height=2*e,this.bubbleSpr.width=this.bubbleSpr.height=this.node.width,t.linearVelocity=cc.v2(100*Math.random()-50,100*Math.random()-50),this.node.on(cc.Node.EventType.TOUCH_START,function(){Date.now()-a>100&&(a=Date.now(),this.onPeng({x:this.node.x,y:this.node.y}),this.node.dispatchEvent(i))},this),this.showStatus()},showStatus:function(){if(o.colorBubbleCntArr_id.length>0){var t=o.colorBubbleCntArr_id[0];o.colorBubbleCntArr_cnt[0]--,o.colorBubbleCntArr_cnt[0]<=0&&(o.colorBubbleCntArr_id.splice(0,1),o.colorBubbleCntArr_cnt.splice(0,1)),t>=3&&t<=5&&(this.isColor=!0),(t<1||t>this.bubbleSpriteFrames.length)&&(t=this.bubbleSpriteFrames.length),2===t&&(this.bubbleSpr.opacity=30.6),this.bubbleSpr.getComponent(cc.Sprite).spriteFrame=this.bubbleSpriteFrames[t-1]}},onPeng:function(t){this.isColor&&o.colorBubbleScore++,this.explodes.emit(t,this.curScale),this.gift.active?this.explodes.emitAd(t,this.curScale):this.isColor?this.explodes.emitColor(t,this.curScale):this.explodes.emit(t,this.curScale),this.node.destroy()},onBeginContact:function(){},update:function(){}}),cc._RF.pop()},{explodes:"explodes",store:"store"}],config:[function(t,e,o){"use strict";cc._RF.push(e,"2a3b3JkILtFja0oZ4PHD6Tx","config"),o.__esModule=!0,o.config=void 0;var n={};o.config=n,n.VERSION_STRING="1.3.6",cc._RF.pop()},{}],countUpLabel:[function(t,e){"use strict";cc._RF.push(e,"4ac27U9Wf1JSLrJ5lpyKibc","countUpLabel");var o=function(t,e,o,n,i,a){var s=this;if(s.version=function(){return"1.9.3"},s.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:function(t,e,o,n){return o*(1-Math.pow(2,-10*t/n))*1024/1023+e},formattingFn:function(t){var e,o,n,i,a,c,r=t<0;if(t=Math.abs(t).toFixed(s.decimals),o=(e=(t+="").split("."))[0],n=e.length>1?s.options.decimal+e[1]:"",s.options.useGrouping){for(i="",a=0,c=o.length;a<c;++a)0!==a&&a%3==0&&(i=s.options.separator+i),i=o[c-a-1]+i;o=i}return s.options.numerals.length&&(o=o.replace(/[0-9]/g,function(t){return s.options.numerals[+t]}),n=n.replace(/[0-9]/g,function(t){return s.options.numerals[+t]})),(r?"-":"")+s.options.prefix+o+n+s.options.suffix},prefix:"",suffix:"",numerals:[]},a&&"object"==typeof a)for(var c in s.options)a.hasOwnProperty(c)&&null!==a[c]&&(s.options[c]=a[c]);""===s.options.separator?s.options.useGrouping=!1:s.options.separator=""+s.options.separator;for(var r=0,l=["webkit","moz","ms","o"],u=0;u<l.length&&!window.requestAnimationFrame;++u)window.requestAnimationFrame=window[l[u]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[l[u]+"CancelAnimationFrame"]||window[l[u]+"CancelRequestAnimationFrame"];function h(t){return"number"==typeof t&&!isNaN(t)}window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var e=(new Date).getTime(),o=Math.max(0,16-(e-r)),n=window.setTimeout(function(){t(e+o)},o);return r=e+o,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),s.initialize=function(){return!(!s.initialized&&(s.error="",s.target=t,s.target?(s.startVal=Number(e),s.endVal=Number(o),h(s.startVal)&&h(s.endVal)?(s.decimals=Math.max(0,n||0),s.dec=Math.pow(10,s.decimals),s.duration=1e3*Number(i)||2e3,s.countDown=s.startVal>s.endVal,s.frameVal=s.startVal,s.initialized=!0,0):(s.error="[CountUp] startVal ("+e+") or endVal ("+o+") is not a number",1)):(s.error="[CountUp] target is null or undefined",1)))},s.printValue=function(t){var e=s.options.formattingFn(t);this.target.string=e,this.target.getComponent("countUpLabel").setString(e),this.target._forceUpdateRenderData},s.count=function(t){s.startTime||(s.startTime=t),s.timestamp=t;var e=t-s.startTime;s.remaining=s.duration-e,s.options.useEasing?s.countDown?s.frameVal=s.startVal-s.options.easingFn(e,0,s.startVal-s.endVal,s.duration):s.frameVal=s.options.easingFn(e,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(e/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(e/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Math.round(s.frameVal*s.dec)/s.dec,s.printValue(s.frameVal),e<s.duration?s.rAF=requestAnimationFrame(s.count):s.callback&&s.callback()},s.start=function(t){s.initialize()&&(s.callback=t,s.rAF=requestAnimationFrame(s.count))},s.stop=function(){s.paused||(s.paused=!0,cancelAnimationFrame(s.rAF))},s.pauseResume=function(){s.paused?(s.paused=!1,delete s.startTime,s.duration=s.remaining,s.startVal=s.frameVal,requestAnimationFrame(s.count)):(s.paused=!0,cancelAnimationFrame(s.rAF))},s.reset=function(){s.paused=!1,delete s.startTime,s.initialized=!1,s.initialize()&&(cancelAnimationFrame(s.rAF),s.printValue(s.startVal))},s.update=function(t){s.initialize()&&(h(t=Number(t))?(s.error="",t!==s.frameVal&&(cancelAnimationFrame(s.rAF),s.paused=!1,delete s.startTime,s.startVal=s.frameVal,s.endVal=t,s.countDown=s.startVal>s.endVal,s.rAF=requestAnimationFrame(s.count))):s.error="[CountUp] update() - new endVal is not a number: "+t)},s.initialize()&&s.printValue(s.startVal)};cc.Class({extends:cc.Label,editor:!1,properties:{_change:null,_first:!0},onDestroy:function(){this._change&&this._change.stop(),this.node.stopAllActions()},setString:function(t){if(t==this.string)return this.string=t,void(this._first=!1);this._change&&this._change.stop(),this.node.stopAllActions(),this._first||!this.node.activeInHierarchy?(this.string=t,this._first=!1):(this._change=new o(this,parseInt(this.string),parseInt(t),0,2,{useEasing:!0,useGrouping:!0,separator:"",decimal:"."}),this._change.start())}}),cc._RF.pop()},{}],dataClearManager:[function(t,e){"use strict";cc._RF.push(e,"858c5yBasFIa6QpS485uRkL","dataClearManager");var o=t("tool"),n=t("store").global;function i(){Date.now()>n.updateTime&&(n.updateTime>0&&cc.systemEvent.emit("trackEvent","tapBubbleNum",{bubblenum:n.score}),cc.systemEvent.emit("acrossDay"),n.score=0,n.lastScore=0,n.updateTime=o.tool.getTodayEndTime())}console.log("dataClearManager",n),i(),setInterval(i,1e3),cc._RF.pop()},{store:"store",tool:"tool"}],debounce:[function(t,e){"use strict";cc._RF.push(e,"3426bYkIKhDWq05oqiUsJFq","debounce"),e.exports=function(t,e){var o,n,i,a,s=[];return function(){i=this,a=arguments,n||(n=setTimeout(function(){clearTimeout(o),o=setTimeout(function(){for(var e=0,o=a.length;e<o;e++)s.push(a[e]);t.apply(i,s),s=[]},e),n=null},32))}},cc._RF.pop()},{}],dialogRank:[function(t,e){"use strict";cc._RF.push(e,"bf4c77XpTlCfZY7FPl/FO44","dialogRank");var o=t("tool"),n=t("DialogBase"),i=t("DialogManager"),a=t("store"),s=a.global;cc.Class({extends:n.DialogBase,properties:{rankCell:cc.Prefab,topCell:{default:null,type:cc.Node},groupContent:{default:null,type:cc.Node},friendContent:{default:null,type:cc.Sprite},groupsRank:{default:null,type:cc.Node},globalRank:{default:null,type:cc.Node},friendsRank:{default:null,type:cc.Node},crown:[cc.SpriteFrame],tabNode:cc.Node,tabBtns:[cc.Node],tabTexts:[cc.Node],closeBtn:{default:null,type:cc.Node},allGroupNames:[cc.Label],allScores:[cc.Label],allRankNums:[cc.Label]},onLoad:function(){var t=this,e=this;this.closeBtn.on("click",function(){cc.systemEvent.emit("dialogRankCloseBtnClick"),t.hide()}),this.groupContentY=this.groupContent.y;for(var o=function(e){t.tabBtns[e]&&t.tabBtns[e].on("click",function(){this.onTabMenuSwitch(e)},t)},n=0,i=this.tabBtns.length;n<i;n++)o(n);s.groupsData=[],this.groupCellList=[],this.top1GroupInfo=[],this.tex=new cc.Texture2D,this.designSize=cc.view.getDesignResolutionSize(),this.frameSize=cc.view.getFrameSize();var c=this.friendContent.node;this.displayPos=c.convertToWorldSpaceAR(cc.v2(c.width/2,c.height/2)),this.displayPos=cc.v2(this.displayPos.x-360,this.displayPos.y-640),cc.systemEvent.on("updateGroupName",function(e){s.groupsData.length>0&&s.groupsData.map(function(t){t._id===e._id&&(t.name=e.name)}),t.userGroup&&t.userGroup.name&&e._id===t.userGroup._id&&(t.userGroup.name=e.name),t.showGroupRank()},this),cc.systemEvent.on("getGroupInfo",function(o){t.userGroup&&t.userGroup._id&&o._id===t.userGroup._id&&(t.userGroup.name=o.name,t.userGroup.score=o.score),s.groupsData.length>0&&s.groupsData[0]._id===o._id&&(t.top1GroupInfo=[],o.users&&o.users.length>0&&o.users.map(function(t){e.top1GroupInfo.push(t)})),t.showGroupRank()}),a.bind("groupid",function(t){this.userGroup&&this.userGroup._id&&(this.userGroup._id=t)},this)},refreshDialogRank:function(){this.curRankType=-1,this.onTabMenuSwitch(0,!1),this.bInitGroupRank=!1,this.bInitGlobalRank=!1,this.bInitFriendRank=!1,this.friendsRank.x=-9999,this.groupsRank.x=-9999,this.globalRank.x=-9999,this.curRankType=-1},onShow:function(){this.refreshDialogRank()},onHide:function(){this.onTabMenuSwitch(0,!1)},updateRankListShow:function(){0===this.curRankType?this.bInitGroupRank||(this.bInitGroupRank=!0,this.showGroupRank()):1===this.curRankType?this.bInitGlobalRank||(this.bInitGlobalRank=!0,this.showGlobalRank()):2===this.curRankType&&(this.bInitFriendRank||(this.bInitFriendRank=!0))},showGlobalRank:function(){var t=this;this.globalRank.getComponent("globalRank").init({requestFail:function(){t.hide()},reConnectFun:function(){t.curRankType=-1,i.DialogManager.getInstance().show("dialogRank",{entrance:"noChange"}),t.onTabMenuSwitch(1),t.showGlobalRank()}})},showGroupRank:function(){var t=this;this.showGroupMyInfo(),this.groupCellList.map(function(t){return t.x=-9999});var e=s.groupsData.length;if(0!==e){var n=0;0===this.groupCellList.length&&this.groupCellList.push(this.topCell),this.topCell.x=6,n+=this.topCell.height,this.topCell.getComponent("rankTopCell").init(this.top1GroupInfo,s.groupsData[0]);for(var i=["","",""],a=["","",""],c=["","",""],r=function(e){var r=null;void 0===t.groupCellList[e]?(r=cc.instantiate(t.rankCell),t.groupCellList.push(r),r.parent=t.groupContent,r.x=0,r.y=t.topCell.y-t.topCell.height/2-(e-.5)*r.height):r=t.groupCellList[e],r.x=0,n+=r.height;var l=r.getComponent("rankCell"),u=t;l.init(s.groupsData[e],e,function(t){u.checkGroupMember(t)});var h="\n\n\n\n";15!==e&&31!==e&&49!==e||(h="\n\n\n");var d,p=o.tool.trimString(s.groupsData[e].name,11)+h,g=s.groupsData[e].score+h,f=e+1+h;i[d=e<16?0:e>=16&&e<32?1:2]+=p,a[d]+=g,c[d]+=f},l=1;l<e&&l<50;l++)r(l);for(var u=0;u<=2;u++)this.allGroupNames[u].string=i[u],this.allScores[u].string=a[u],this.allRankNums[u].string=c[u];this.groupContent.height=n}else this.topCell.x=-9999},showGroupMyInfo:function(){for(var t=s.groupsData.length,e=0;e<t&&e<50;e++)""!==s.groupid&&(s.groupsData[e]._id,s.groupid)},onTabMenuSwitch:function(t,e){if(void 0===e&&(e=!0),this.curRankType!==t){this.curRankType=t;for(var o=0,n=this.tabTexts.length;o<n;o++){var i=this.tabTexts[o];i&&(i.color=o===t?new cc.Color(31,42,173):new cc.Color(255,255,255))}this.tabNode.x=167*(t-1),this.groupsRank.x=0===t?0:-9999,this.globalRank.x=1===t?0:-9999,this.friendsRank.x=2===t?0:-9999,0===t&&(this.groupContent.y=this.groupContentY),e&&this.updateRankListShow()}}}),cc._RF.pop()},{DialogBase:"DialogBase",DialogManager:"DialogManager",store:"store",tool:"tool"}],dialogTips:[function(t,e){"use strict";cc._RF.push(e,"18cb1xMJq1I0o419hWRl20s","dialogTips");var o=t("DialogBase");t("store").global,cc.Class({extends:o.DialogBase,properties:{title:cc.Label,content:cc.RichText,btnTxt:cc.Label,btn:cc.Node},onLoad:function(){var t=this;this.btn.on("click",function(){t.hide()})},onShow:function(t){t.title&&(this.title.string=t.title),t.content&&(this.content.string=t.content),t.btnTxt&&(this.btnTxt.string=t.btnTxt)}}),cc._RF.pop()},{DialogBase:"DialogBase",store:"store"}],explodes:[function(t,e){"use strict";cc._RF.push(e,"f7a14ausR1FQIzNwqaZhYhN","explodes");var o=[],n=0,i=[],a=0,s=[],c=0;cc.Class({extends:cc.Component,properties:{stage:{default:null,type:cc.Node},normal:{default:null,type:cc.Prefab},adExplode:{default:null,type:cc.Prefab},colorExplode:{default:null,type:cc.Prefab}},onLoad:function(){for(var t=0;t<10;t++){var e=cc.instantiate(this.normal);e.x=2e3,e.y=2e3,o.push(e),this.stage.addChild(e)}for(var n=0;n<2;n++){var a=cc.instantiate(this.adExplode);a.x=2e3,a.y=2e3,i.push(a),this.stage.addChild(a)}for(var c=0;c<10;c++){var r=cc.instantiate(this.colorExplode);r.x=2e3,r.y=2e3,s.push(r),this.stage.addChild(r)}},emit:function(t,e){10===n&&(n=0),this.showExplode(o[n],t,e),n++},emitAd:function(t,e){2===a&&(a=0),this.showExplode(i[a],t,e),a++},emitColor:function(t,e){10===c&&(c=0),this.showExplode(s[c],t,e),c++},showExplode:function(t,e,o){t.x=e.x,t.y=e.y,t.scaleX=t.scaleY=o,t.getComponent("explode").emit()}}),cc._RF.pop()},{}],explode:[function(t,e){"use strict";cc._RF.push(e,"542c2vPTDNC7q/oErj8DfoE","explode"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.particle=this.node.getComponent(cc.ParticleSystem)},emit:function(){this.particle.resetSystem()},hide:function(){this.particle.stopSystem()}}),cc._RF.pop()},{}],gaming:[function(t,e){"use strict";cc._RF.push(e,"f34ea8+v8xH2JL1Q3J62iQt","gaming");var o=t("store"),n=o.global,i=t("bubbles");cc.Class({extends:cc.Component,properties:{score:{default:null,type:cc.Label},bubbles:{default:null,type:i},scoreNode:{default:null,type:cc.Node},fadeRankNode:{default:null,type:cc.Node}},onLoad:function(){window.Telegram.WebApp.ready(),console.log(">>>>tg",window.Telegram.WebApp.initData),n.bubbleCntForRest=0,console.log(cc.loader.md5Pipe),console.log(n),cc.director.getPhysicsManager().enabled=!0,this.node.on("peng",this.onPeng,this),o.bind("score",function(t){this.score.setString(t)},this),this.showBubbles(!1),this.rest=cc.find("Canvas/rest").getComponent("rest")},onEnable:function(){cc.systemEvent.emit("collectionChange")},onPeng:function(){var t=this;o.global.score++,n.historyScore++,n.bubbleCntForRest<n.dstBubbleCntForRest-12&&(n.bubbleCntForAward++,this.showBubble(!0)),n.bubbleCntForRest++,n.bubbleCntForRest>=n.dstBubbleCntForRest&&setTimeout(function(){t.rest.show()},2e3)},showBubbles:function(t){for(var e=0;e<12;e++)this.showBubble(t)},showBubble:function(t){var e=this.bubbles.getBlock();e.x=this.node.width*Math.random();var o=this.scoreNode.parent.convertToWorldSpaceAR(cc.v2(this.scoreNode.x,this.scoreNode.y)).y,n=this.fadeRankNode.parent.convertToNodeSpaceAR(cc.v2(this.fadeRankNode.x,this.fadeRankNode.y)).y;if(e.y=(o-n)*Math.random()+n,t){e.scaleX=e.scaleY=.01;var i=cc.sequence(cc.scaleTo(.4,1.1,1.1),cc.scaleTo(.2,1,1),cc.scaleTo(.05,1.01,1.01),cc.scaleTo(.05,1,1));e.runAction(i)}this.node.addChild(e)}}),cc._RF.pop()},{bubbles:"bubbles",store:"store"}],globalCell:[function(t,e){"use strict";cc._RF.push(e,"bc1da9nDYVKyK+yWDB1YYDA","globalCell"),t("tool"),t("store"),cc.Class({extends:cc.Component,properties:{crown:[cc.SpriteFrame],headIcon:cc.Sprite,rankTxt:cc.Label,rankIma:cc.Sprite,memberName:cc.Label,score:cc.Label},onLoad:function(){},init:function(t,e){this.rankIma.node.active=e<3,e<3&&(this.rankIma.spriteFrame=this.crown[e])}}),cc._RF.pop()},{store:"store",tool:"tool"}],globalData:[function(t,e){"use strict";cc._RF.push(e,"be94bbRsfBCRor42Hb2lPD3","globalData"),e.exports={nickName:"",avatarUrl:"",historyScore:0,lastHistoryScore:0,score:0,lastScore:0,colorBubbleScore:0,updateTime:0,groupid:"",groupids:[],getLimitAwardCnt:0,bubbleCntForAward:0,dstBubbleCntForRest:100,colorBubbleCntArr:[],colorBubbleCntArr_id:[],colorBubbleCntArr_cnt:[]},cc._RF.pop()},{}],globalRank:[function(t,e){"use strict";cc._RF.push(e,"87f15xUlC1NlIbfFvqtmz+C","globalRank");var o=t("tool"),n=t("store").global;function i(t){return t}cc.Class({extends:cc.Component,properties:{globalCell:cc.Prefab,globalContent:cc.Node,globalView:cc.Node,crown:[cc.SpriteFrame],myGlobalRankIma:cc.Sprite,myGlobalRank:cc.Label,myNickName:cc.Label,myGlobalScore:cc.Label,headIcon:cc.Sprite,bottomTips:cc.Node,allNickName:[cc.Label],allScores:[cc.Label],allRankNums:[cc.Label]},onLoad:function(){this.globalCellList=[]},init:function(t){this.node.x=-9999;var e=this;i({name:"getGlobalRank",data:{},success:function(t){t&&t.result&&t.result.globalUsers&&e.showInfo(t.result)},fail:function(){t&&t.requestFail&&t.requestFail()},reConnectFun:function(){t&&t.reConnectFun&&t.reConnectFun()}})},showInfo:function(t){this.node.x=0,0===t.user.length?this.myGlobalScore.string="0":this.myGlobalScore.string=o.tool.formatNum(n.historyScore),this.myGlobalRank.string="\u672a\u4e0a\u699c",this.myGlobalRankIma.node.active=!1,this.myNickName.string=o.tool.trimString(n.nickName,8),this.globalCellList.map(function(t){return t.x=-9999});var e=t.globalUsers.length;if(0!==e){for(var i=-1,a=0,s=["","",""],c=["","",""],r=["","",""],l=0;l<e&&l<50;l++){var u=null;if(void 0===this.globalCellList[l]){if(u=cc.instantiate(this.globalCell),this.globalCellList.push(u),u.parent=this.globalContent,u.x=0,u.y=-(l+.5)*u.height,0===l){var h=u.getChildByName("line");h&&(h.active=!1)}}else u=this.globalCellList[l];u.x=0,a+=u.height,u.getComponent("globalCell").init(t.globalUsers[l],l),t.user.length>0&&t.globalUsers[l]._id===t.user[0]._id&&(i=l+1);var d="\n\n\n\n";15!==l&&31!==l&&49!==l||(d="\n\n\n");var p,g=o.tool.trimString(t.globalUsers[l].nickName,8)+d,f=o.tool.formatNum(t.globalUsers[l].historyScore)+d,m=l+1+d;s[p=l<16?0:l>=16&&l<32?1:2]+=g,c[p]+=f,r[p]+=m}for(var b=0;b<=2;b++)this.allNickName[b].string=s[b],this.allScores[b].string=c[b],this.allRankNums[b].string=r[b];a>this.globalView.height?(this.bottomTips.active=!0,this.bottomTips.y=-(a+this.bottomTips.height/2-10),a+=this.bottomTips.height):this.bottomTips.active=!1,this.globalContent.height=a,this.myGlobalRankIma.node.active=i>=1&&i<=3,this.myGlobalRank.node.active=!this.myGlobalRankIma.node.active,-1===i?(this.myGlobalRank.string="\u672a\u4e0a\u699c",this.myGlobalRank.fontSize=44,this.myGlobalRank.lineHeight=50,this.myGlobalRank.node.x=-238):i>=1&&i<=3?this.myGlobalRankIma.spriteFrame=this.crown[i-1]:(this.myGlobalRank.string=i,this.myGlobalRank.fontSize=62,this.myGlobalRank.lineHeight=70,this.myGlobalRank.node.x=-231)}}}),cc._RF.pop()},{store:"store",tool:"tool"}],index:[function(t,e){"use strict";cc._RF.push(e,"be197V9FYBCiYtWH+7C3xS9","index");var o=t("DialogManager");t("store").global,cc.Class({extends:cc.Component,properties:{rankBtn:{default:null,type:cc.Node}},onLoad:function(){this.rankBtn.on("click",function(){cc.systemEvent.emit("trackEvent","popRank"),o.DialogManager.getInstance().show("dialogRank")})}}),cc._RF.pop()},{DialogManager:"DialogManager",store:"store"}],modal:[function(t,e){"use strict";cc._RF.push(e,"325daFdYNZE4qge3snRTbPT","modal"),cc.Class({extends:cc.Component,properties:{close:{default:null,type:cc.Node},title:{default:null,type:cc.Label},gaming:{default:null,type:cc.Node},index:{default:null,type:cc.Node}},show:function(t){this.node.active=!0,this.title.string=t||""},onClose:function(){this.node.active=!1,this.node.emit("close")}}),cc._RF.pop()},{}],observer:[function(t,e){"use strict";cc._RF.push(e,"b0b84cIkgVGjo36PlbdD4CK","observer"),e.exports={watch:function t(e,o,n){if(e&&"object"==typeof e){Object.defineProperty(e,"_observeProps",{enumerable:!1,value:{}});var i=function(i){var a=e._observeProps[i]=e[i],s=typeof a,c=n?n+"."+i:i;Object.defineProperty(e,i,{set:function(e){var n=typeof e;if(n!==s)throw new Error("observer\uff1a\u4e0d\u80fd\u66f4\u6539\u76d1\u542c\u6570\u636e\u7684\u503c\u7c7b\u578b "+s+" -> "+n);"number"===s?e<=Number.MAX_VALUE?this._observeProps[i]=e:(cc.error(">> Number\u6ea2\u51fa\uff01key = "+i),this._observeProps[i]=Number.MAX_VALUE):this._observeProps[i]=e,t(e,o,c),o(c,e)},get:function(){return this._observeProps[i]}}),"object"===s&&t(a,o,c)};for(var a in e)i(a)}}},cc._RF.pop()},{}],"physics-bound":[function(t,e){"use strict";cc._RF.push(e,"8bb59G9YJZM663ZrZZZSww8","physics-bound"),cc.Class({extends:cc.Component,properties:{size:cc.size(0,0),score:cc.Node,fadeRank:cc.Node,mouseJoint:!0},onLoad:function(){var t=this.size.width||this.node.width,e=(this.size.height||this.node.height,new cc.Node);e.addComponent(cc.RigidBody).type=cc.RigidBodyType.Static,this.mouseJoint&&(e.addComponent(cc.MouseJoint).mouseRegion=this.node);var o=this.score.parent.convertToWorldSpaceAR(cc.v2(this.score.x,this.score.y)).y,n=this.fadeRank.parent.convertToNodeSpaceAR(cc.v2(this.fadeRank.x,this.fadeRank.y)).y;this._addBound(e,360,o,t,20),this._addBound(e,360,n,t,20),this._addBound(e,360-t/2,(o-n)/2+n,20,o-n),this._addBound(e,360+t/2,(o-n)/2+n,20,o-n),e.parent=this.node},_addBound:function(t,e,o,n,i){var a=t.addComponent(cc.PhysicsBoxCollider);a.offset.x=e,a.offset.y=o,a.size.width=n,a.size.height=i,a.friction=0,a.restitution=1}}),cc._RF.pop()},{}],rankCell:[function(t,e){"use strict";cc._RF.push(e,"5be83BEQl9IaKYYqhl/t1t8","rankCell"),cc.Class({extends:cc.Component,properties:{crown:[cc.SpriteFrame],rankTxt:cc.Label,rankIma:cc.Sprite,groupName:cc.Label,score:cc.Label},onLoad:function(){this.cb=null,this.groupid=null,this.node.on("click",function(){this.cb&&this.cb(this.groupid)},this)},init:function(t,e,o){this.groupid=t._id,this.cb=o,this.rankIma.node.active=e<3,e<3&&(this.rankIma.spriteFrame=this.crown[e])}}),cc._RF.pop()},{}],rankTopCell:[function(t,e){"use strict";cc._RF.push(e,"a2537cnriVMkIU4KIqr3yCg","rankTopCell");var o=t("tool");cc.Class({extends:cc.Component,properties:{topGroupHead:cc.Prefab,groupMembers:cc.Node,groupName:cc.Label,groupScore:cc.Label,topHead:cc.Sprite,topName:cc.Label,topScore:cc.Label},onLoad:function(){this.headList=[];var t=17;this.headPos={1:[{x:0,y:0}],2:[{x:-t,y:0},{x:t,y:0}],3:[{x:0,y:t},{x:-t,y:-t},{x:t,y:-t}],4:[{x:-t,y:t},{x:t,y:t},{x:-t,y:-t},{x:t,y:-t}],5:[{x:-t,y:t},{x:t,y:t},{x:-34,y:-t},{x:0,y:-t},{x:34,y:-t}],6:[{x:-34,y:t},{x:0,y:t},{x:34,y:t},{x:-34,y:-t},{x:0,y:-t},{x:34,y:-t}],7:[{x:0,y:34},{x:-34,y:0},{x:0,y:0},{x:34,y:0},{x:-34,y:-34},{x:0,y:-34},{x:34,y:-34}],8:[{x:-t,y:34},{x:t,y:34},{x:-34,y:0},{x:0,y:0},{x:34,y:0},{x:-34,y:-34},{x:0,y:-34},{x:34,y:-34}],9:[{x:-34,y:34},{x:0,y:34},{x:34,y:34},{x:-34,y:0},{x:0,y:0},{x:34,y:0},{x:-34,y:-34},{x:0,y:-34},{x:34,y:-34}]};for(var e=1;e<=9;e++){var o=1/3-.01,n=1;1===e?(o=1.01,n=3):e>=2&&e<=4&&(o=.49,n=1.5);for(var i=0;i<this.headPos[e].length;i++)this.headPos[e][i].scale=o,this.headPos[e][i].posScale=n}},init:function(t,e){this.headList.map(function(t){return t.active=!1}),this.groupName.string=o.tool.trimString(e.name,8),this.groupScore.string=e.score;for(var n=t.length,i=0;i<n&&i<9;i++){var a=null;void 0===this.headList[i]?(a=cc.instantiate(this.topGroupHead),this.headList.push(a),a.parent=this.groupMembers):a=this.headList[i],a.active=!0}n=n>9?9:n;for(var s=this.headPos[n],c=0;c<n;c++)this.headList[c]&&(this.headList[c].x=s[c].x*s[c].posScale,this.headList[c].y=s[c].y*s[c].posScale,this.headList[c].scale=s[c].scale);t.sort(function(t,e){return void 0===e.score?-1:void 0===t.score?1:e.score-t.score}),this.topName.string=o.tool.trimString(t[0].nickName,8),this.topScore.string=t[0].score}}),cc._RF.pop()},{tool:"tool"}],rest:[function(t,e){"use strict";cc._RF.push(e,"dd2552IdC1FF7qW93ka+81k","rest");var o=t("store").global;cc.Class({extends:cc.Component,properties:{timeTxt:{default:null,type:cc.Label}},onLoad:function(){this.gaming=cc.find("Canvas/gaming").getComponent("gaming")},onEnable:function(){cc.systemEvent.emit("trackEvent","adShow",{entrance:"\u4f11\u606f\u4e00\u4e0b"}),this.timer=10,this.schedule(this.updateTimeTxt,1),this.updateTimeTxt()},onVideoAdBtn:function(){this.unschedule(this.updateTimeTxt),cc.systemEvent.emit("trackEvent","adPlay",{entrance:"\u4f11\u606f\u4e00\u4e0b"})},updateTimeTxt:function(){this.timer>=0&&(this.timeTxt.string="\u8fd8\u6709"+Math.floor(this.timer)+"\u79d2",this.timer-=1,this.timer<0&&this.getAward())},getAward:function(){this.unschedule(this.updateTimeTxt),this.close(),this.gaming.showBubbles(!0),o.bubbleCntForRest=0,o.dstBubbleCntForRest=100},show:function(){this.node.active=!0},close:function(){this.node.active=!1}}),cc._RF.pop()},{store:"store"}],store:[function(t,e){"use strict";cc._RF.push(e,"aa2df0C+LtJcI6QvCk1WE7k","store");var o,n=t("observer"),i=t("debounce"),a=t("globalData");(o=cc.sys.localStorage.getItem("global"))&&((a=Object.assign(a,JSON.parse(o))).colorBubbleCntArr_id instanceof Array||u("colorBubbleCntArr_id"),a.colorBubbleCntArr_cnt instanceof Array||u("colorBubbleCntArr_cnt"),a.colorBubbleCntArr=[],a.groupsData=[]),n.watch(a,function(t,e){s.forEach(function(o){o.prop===t&&o.cb.call(o.target,e)}),l()});var s=[];function c(t,e){for(var o=e.split("."),n=0,i=o.length;n<i;n++)t=t[o[n]];return t}function r(){cc.sys.localStorage.setItem("global",JSON.stringify(a)),cc.log("update2Cloud")}var l=i(function(){r()},500);function u(t){var e=[];if(console.log(t+" before: ",a[t]),a[t]instanceof Object)for(var o in a[t])e.push(a[t][o]);a[t]=e,console.log(t+" after: ",a[t])}var h={global:a,bind:function(t,e,o){s.push({prop:t,cb:e,target:o}),e.call(o,c(a,t))},unbind:function(t,e){for(var o,n=s.length-1;n>=0;n--)(o=s[n]).prop===t&&(e&&o.cb,s.splice(n,1))},save:function(){r()}};e.exports=h,cc._RF.pop()},{debounce:"debounce",globalData:"globalData",observer:"observer"}],switch:[function(t,e){"use strict";cc._RF.push(e,"68957mHMBFO14x9W1EKA82a","switch"),cc.Class({extends:cc.Component,properties:{btn:{default:null,type:cc.Node},onNode:{default:null,type:cc.Node},offNode:{default:null,type:cc.Node}},onLoad:function(){this.node.on("click",function(){this.isOn=!this.isOn,this.isOn?(this.on(),this.node.emit("switch",{isOn:this.isOn})):(this.off(),this.node.emit("switch",{isOn:this.isOn}))},this)},on:function(){this.isOn=!0,this.onNode.active=!0,this.offNode.active=!1,this.btn.runAction(cc.moveTo(.1,18,-1))},setOn:function(){this.isOn=!0,this.onNode.active=!0,this.offNode.active=!1,this.btn.x=18,this.btn.y=-1},off:function(){this.isOn=!1,this.onNode.active=!1,this.offNode.active=!0,this.btn.runAction(cc.moveTo(.1,-18,-1))},start:function(){}}),cc._RF.pop()},{}],tool:[function(t,e,o){"use strict";cc._RF.push(e,"09d6284LdVKaaYJ/ubJ9J1X","tool"),o.__esModule=!0,o.tool=void 0;var n,i,a,s,c,r,l={};o.tool=l,l.getTodayEndTime=function(){var t=new Date,e=t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate(),o=new Date(new Date(e).getTime()+864e5-1).getTime();return null===o?0:o},n=/[^\x00-\xff]/g,l.sizeof=function(t){return t.replace(n,"ci").length},a=0,s="",c=0,r=0,l.cutString=function(t,e){for(a=0,s="",c=0,r=t.length;c<r&&(i=t.charCodeAt(c),!((a+=i<=127?1:2)>e));c++)s+=t.substr(c,1);return s},l.trimString=function(t,e){return void 0===t&&(t=""),this.sizeof(t)>2*e?this.cutString(t,2*e-1)+"...":t},l.toFixed=function(t,e){return parseFloat(t.toFixed(e))},l.toFixedStr=function(t,e){return Number.parseFloat(t).toFixed(e)},l.formatNum=function(t,e){return void 0===e&&(e=3),"number"!=typeof t||Number.isNaN(t)?(cc.error(t+" is not number!!!"),""):t>=1e5?this.toFixed(t/1e4,e)+"\u4e07":t},cc._RF.pop()},{}],"use_v2.0.x_cc.Toggle_event":[function(t,e){"use strict";cc._RF.push(e,"30709B7asZA1r+hKhLGY+Dp","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["config","baseDialog","dialogRank","dialogTips","modal","AcrossTips","bg","countUpLabel","globalRank","index","rankTopCell","rest","switch","bubbles","explodes","OrderManager","dataClearManager","ISingleton","SFXStars","ajax","debounce","globalData","observer","store","gaming","physics-bound","tool","use_v2.0.x_cc.Toggle_event","bubble","DialogBase","DialogManager","explode","globalCell","rankCell"]);