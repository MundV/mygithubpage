webpackJsonp([1],{127:function(e,t,n){function i(e){n(174)}var s=n(282)(n(130),n(283),i,null,null);e.exports=s.exports},130:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(55),s=n.n(i),a=n(136),r=n.n(a),o=n(139),l=n.n(o),d=n(131),h=n(125),u=n.n(h);t.default={name:"app",data:function(){return{gameIsRunning:!1,message:"Glitchping by Mund",options:{paddles:[{loading:"waiting..."}]},paddles:[],gameMode:"default",render:"",paused:!1}},watch:{gameIsRunning:function(e){var t=this;if(e)this.render=new d.a(this.getOptions(),function(){t.gameIsRunning=!1},function(){t.paused=!0}),this.render.start();else{var n=this.render.game;n.winner.length>1?this.message=n.winner[0]+" and others won!🎉":this.message=n.winner[0]+" won!🎉"}return e},gameMode:function(e){this.getOptionsFromURL("./static/options/"+e+".json")},options:function(e){this.paddles=this.setPaddleOptions(e.paddles)},paused:function(e){e||this.render.unpause()}},methods:{startGame:function(){this.gameIsRunning=!0,this.paused=!1,u.a.enabled&&u.a.request(),document.body.requestPointerLock()},addPlayer:function(){var e=l()({},this.paddles[0]);e.name=r()(" Player "+(this.paddles.length+1)),this.paddles.push(e)},getOptionsFromURL:function(e){var t=this;(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.fetch)(e).then(function(e){return e.json()}).then(function(e){t.options=e}).catch(function(e){console.log(e)})},getOptions:function(){return{paddles:this.getPaddleOptions()}},getPaddleOptions:function(){return this.computePaddleOptions(this.paddles,JSON.parse)},setPaddleOptions:function(e){return this.computePaddleOptions(e,r.a)},computePaddleOptions:function(e,t){var n=[],i=e.map(function(e){return l()({},e)}),a=!0,r=!1,o=void 0;try{for(var d,h=s()(i);!(a=(d=h.next()).done);a=!0){var u=d.value;for(var c in u)u.hasOwnProperty(c)&&(u[c]=t(u[c]));n.push(u)}}catch(e){r=!0,o=e}finally{try{!a&&h.return&&h.return()}finally{if(r)throw o}}return n}},created:function(){this.getOptionsFromURL("./static/options/default.json")}}},131:function(e,t,n){"use strict";var i=n(58),s=n.n(i),a=n(56),r=n.n(a),o=n(57),l=n.n(o),d=n(248),h=(n.n(d),n(175)),u=n.n(h),c=n(132),p=n(125),v=n.n(p),g=n(133),m=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};for(r()(this,e),this.game=new u.a(t),this.stop=i,this.pauseAction=a,this.reRender=!1,this.bots=t.paddles.map(function(e){return!!e.bot&&n.i(c.a)()}),this.multiplier=this.findSaveMultiplier.apply(this,s()(this.game.fieldSize).concat([screen.width,screen.height])),this.renderer=new d.autoDetectRenderer({width:screen.Width,height:screen.Height,backgroundColor:3355443}),this.keys=[],this.actions=["up","down"],this.controller=new g.a(this.game,this.actions,this.bots),this.touchAreas=new d.Container,this.touchAreas.interactive=!0,this.addTouchAreas(),this.target=document.getElementById("canvas");this.target.firstChild;)this.target.removeChild(this.target.firstChild);this.resize=this.resize.bind(this),this.activateKey=this.activateKey.bind(this),this.deactivateKey=this.deactivateKey.bind(this),this.addEventListeners()}return l()(e,[{key:"addEventListeners",value:function(){window.addEventListener("resize",this.resize),window.addEventListener("keyup",this.deactivateKey),window.addEventListener("keydown",this.activateKey),window.addEventListener("contextmenu",this.blockContext)}},{key:"removeEventListeners",value:function(){window.removeEventListener("resize",this.resize),window.removeEventListener("keyup",this.deactivateKey),window.removeEventListener("keydown",this.activateKey),window.removeEventListener("contextmenu",this.blockContext),v.a.off("change",this.pause.bind(this))}},{key:"resize",value:function(){this.multiplier=this.findSaveMultiplier.apply(this,s()(this.game.fieldSize).concat([screen.width,screen.height])),this.addTouchAreas(),this.firstRender(),this.renderer.resize(screen.width,screen.height)}},{key:"activateKey",value:function(e){this.controller.activateKey(e.keyCode)}},{key:"deactivateKey",value:function(e){this.controller.deactivateKey(e.keyCode)}},{key:"blockContext",value:function(e){e.preventDefault()}},{key:"addTouchAreas",value:function(){var e=this;this.touchAreas.removeChildren();for(var t=0;t<this.game.paddles.length;t++)!function(t){for(var n=0;n<e.actions.length;n++)!function(n){var i=new d.Graphics,s=e.mp(e.game.fieldSize[0]/2,e.game.fieldSize[1]/2);i.hitArea=new d.Rectangle(t*s[0],n*s[1],t*s[0]+s[0],n*s[1]+s[1]),i.interactive=!0,e.touchAreas.addChild(i),i.on("touchstart",function(){e.controller.addControl(t,n)}),i.on("touchend",function(){e.controller.removeControl(t,n)}),i.on("touchendoutside",function(){e.controller.removeControl(t,n)})}(n)}(t)}},{key:"findSaveMultiplier",value:function(e,t,n,i){return screen.width>screen.height?{x:n/e,y:i/t}:{x:i/e,y:n/t}}},{key:"mp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.multiplier;return screen.width>screen.height?[e*n.x,t*n.y]:[t*n.y,e*n.x]}},{key:"firstRender",value:function(){this.reRender&&(this.paddles.destroy(),this.ball.destroy(),this.textContainer.destroy(),this.stage.destroy()),this.reRender=!0,this.paddles=new d.Container,this.ball=new d.Graphics,this.textContainer=new d.Container,this.stage=new d.Container,this.renderer.render(this.stage);for(var e=0;e<this.game.paddles.length;e++){var t=this.game.paddles[e],n=new d.Text("",{fontFamily:"sarpanch",fontSize:10*this.multiplier.x,fill:16777215,stroke:16711680}),i=this.mp(t.pos[0],t.pos[1]+100);n.x=i[0],n.y=i[1],this.textContainer.addChild(n);var a=new d.Graphics;a.lineStyle(this.multiplier.x,16711680),a.beginFill(16777215),a.drawRect.apply(a,[0,0].concat(s()(this.mp.apply(this,s()(t.size)))));var r=this.mp.apply(this,s()(t.pos));a.x=r[0],a.y=r[1],a.endFill(),this.paddles.addChild(a)}var o=this.mp.apply(this,s()(this.game.ball.pos));this.ball.lineStyle(this.multiplier.x,16711680),this.ball.beginFill(16777215),this.ball.drawCircle(0,0,this.game.ball.size/2*this.multiplier.x),this.ball.x=o[0],this.ball.y=o[1],this.ball.endFill(),this.stage.addChild(this.ball),this.stage.addChild(this.paddles),this.stage.addChild(this.textContainer),this.stage.addChild(this.touchAreas)}},{key:"start",value:function(){var e=this;v.a.on("change",this.pause.bind(this)),this.target.appendChild(this.renderer.view),this.firstRender();!function t(){if(e.game.ended)e.removeEventListeners(),v.a.exit(),e.stage.destroy(),e.stop();else{e.game.update(e.controller.getController());for(var n=0;n<e.game.paddles.length;n++){var i=e.game.paddles[n],a=e.textContainer.getChildAt(n),r=e.mp(i.pos[0],i.pos[1]+100);a.text=i.points||"",a.x=r[0],a.y=r[1];var o=e.paddles.getChildAt(n),l=e.mp.apply(e,s()(i.pos));o.x=l[0],o.y=l[1]}var d=e.mp.apply(e,s()(e.game.ball.pos));e.ball.x=d[0],e.ball.y=d[1],window.requestAnimationFrame(t),e.renderer.render(e.stage)}}()}},{key:"unpause",value:function(){this.game.paused=!1}},{key:"pause",value:function(){v.a.isFullscreen||this.game.ended||(this.game.paused=!0,this.pauseAction())}}]),e}();t.a=m},132:function(e,t,n){"use strict";function i(){var e="";return function(t,n){if(t.paddles[n].controlsBall)return""!==e&&t.ball.pos[1]>10?t.ball.pos[1]<t.fieldSize[1]-10?e:"up"===e?"down":"up":e=Math.random()>.5?"down":"up";e="";var i=t.ball.pos[1],a=t.paddles[n].pos[1]+t.paddles[n].size[1]/2,r=i-a;return r<0?s(i,a,t.fieldSize[1])<-1*r&&t.paddles[1].controlsBall?"down":"up":s(a,i,t.fieldSize[1])<r&&t.paddles[1].controlsBall?"up":"down"}}function s(e,t,n){return e+(n-t)}t.a=i},133:function(e,t,n){"use strict";var i=n(58),s=n.n(i),a=n(55),r=n.n(a),o=n(56),l=n.n(o),d=n(57),h=n.n(d),u=function(){function e(t,n,i){l()(this,e),this.game=t,this.actions=n,this.bots=i,this.states=new Uint8Array(this.game.paddles.length*this.actions.length),this.controller=null}return h()(e,[{key:"addControl",value:function(e,t){this.bots[e]||(this.states[e*this.actions.length+t]=!0,this.controller=null)}},{key:"removeControl",value:function(e,t){this.states[e*this.actions.length+t]=!1,this.controller=null}},{key:"activateKey",value:function(e){var t=this.lookup(e),n=!0,i=!1,s=void 0;try{for(var a,o=r()(t);!(n=(a=o.next()).done);n=!0){var l=a.value,d=l.paddleId,h=l.actionId;this.addControl(d,h)}}catch(e){i=!0,s=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw s}}}},{key:"deactivateKey",value:function(e){var t=this.lookup(e),n=!0,i=!1,s=void 0;try{for(var a,o=r()(t);!(n=(a=o.next()).done);n=!0){var l=a.value,d=l.paddleId,h=l.actionId;this.removeControl(d,h)}}catch(e){i=!0,s=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw s}}}},{key:"lookup",value:function(e){for(var t=[],n=0;n<this.game.paddles.length;n++){var i=!0,s=!1,a=void 0;try{for(var o,l=r()(this.game.paddles[n].controls);!(i=(o=l.next()).done);i=!0){var d=o.value;d.key==e&&t.push({paddleId:n,actionId:this.actions.indexOf(d.action)})}}catch(e){s=!0,a=e}finally{try{!i&&l.return&&l.return()}finally{if(s)throw a}}}return t}},{key:"getController",value:function(){if(!this.controller){this.controller=[];for(var e=0;e<this.states.length;e++)this.states[e]&&(this.controller.push({paddle:this.game.paddles[parseInt(e/this.actions.length)],action:this.actions[e%this.actions.length]}),console.log(this.controller))}for(var t=[].concat(s()(this.controller)),n=0;n<this.bots.length;n++)this.bots[n]&&t.push({paddle:this.game.paddles[n],action:this.bots[n](this.game,n)});return t}}]),e}();t.a=u},134:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(129),s=n(127),a=n.n(s),r=n(128),o=n.n(r);i.a.use(o.a),i.a.config.productionTip=!1,new i.a({el:"#app",template:"<App/>",components:{App:a.a}})},174:function(e,t){},283:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"startScreen"}},[n("h1",[e._v(e._s(e.message))]),e._v(" "),n("button",{staticClass:"startGame button",on:{click:e.startGame}},[e._v("Play 🕹️")]),e._v(" "),n("button",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#settingScreen",expression:"'#settingScreen'"}],staticClass:"button",attrs:{id:"settingButton"}},[e._v("Settings 🔎")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"settingScreen"}},[n("h1",[e._v("Settings 🔎")]),e._v(" "),n("h2",[e._v("Game Modes 🃏")]),e._v(" "),n("form",{staticClass:"selecter",attrs:{id:"gameModes"}},[n("a",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{id:"twin",type:"radio",name:"gamemode",value:"twin"},domProps:{checked:e._q(e.gameMode,"twin")},on:{change:function(t){e.gameMode="twin"}}}),e._v(" "),n("label",{staticClass:"button",attrs:{for:"twin"}},[e._v("\n          Twin 👯‍\n        ")])]),e._v(" "),n("a",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{type:"radio",id:"default",name:"gamemode",value:"default",checked:""},domProps:{checked:e._q(e.gameMode,"default")},on:{change:function(t){e.gameMode="default"}}}),e._v(" "),n("label",{staticClass:"button",attrs:{for:"default"}},[e._v("\n          Default 😃️\n        ")])])]),e._v(" "),n("h2",[e._v("Advanced Settings 💻")]),e._v(" "),e.paddles[0]?n("div",{staticClass:"wrapper",attrs:{id:"playerSettings"}},[n("table",[n("tr",e._l(e.paddles[0],function(t,i){return n("th",[e._v("\n            "+e._s(i)+"\n          ")])})),e._v(" "),e._l(e.paddles,function(t){return n("tr",e._l(t,function(i,s){return n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t[s],expression:"paddle[key]"}],staticClass:"button",attrs:{type:"text"},domProps:{value:t[s]},on:{input:function(n){n.target.composing||e.$set(t,s,n.target.value)}}})])}))})],2),e._v(" "),n("button",{staticClass:"button",on:{click:e.addPlayer}},[e._v("Add player")])]):e._e()]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.paused,expression:"paused"}],staticClass:"paused"},[n("h1",[e._v("The game is paused!")]),e._v(" "),n("button",{staticClass:"button pauseButton",attrs:{type:"button",name:"button"},on:{click:function(t){e.startGame()}}},[e._v("Unpause")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.gameIsRunning,expression:"gameIsRunning"}],attrs:{id:"canvas"}})])},staticRenderFns:[]}}},[134]);
//# sourceMappingURL=app.ac9f43a035b76c4fee68.js.map