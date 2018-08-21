webpackJsonp([1],{124:function(e,t,n){function i(e){n(173)}var s=n(281)(n(127),n(282),i,null,null);e.exports=s.exports},127:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(55),s=n.n(i),a=n(132),r=n.n(a),o=n(137),d=n.n(o),l=n(128),h=n(122),u=n.n(h);t.default={name:"app",data:function(){return{gameIsRunning:!1,message:"Glitchping by Mund",options:{paddles:[{loading:"waiting..."}]},paddles:[],gameMode:"default",render:"",paused:!1}},watch:{gameIsRunning:function(e){var t=this;if(e)this.render=new l.a(this.getOptions(),function(){t.gameIsRunning=!1},function(){t.paused=!0}),this.render.start();else{var n=this.render.game;n.winner.length>1?this.message=n.winner[0]+" and others won!🎉":this.message=n.winner[0]+" won!🎉"}return e},gameMode:function(e){this.getOptionsFromURL("./static/options/"+e+".json")},options:function(e){this.paddles=this.setPaddleOptions(e.paddles)},paused:function(e){e||this.render.unpause()}},methods:{startGame:function(){this.gameIsRunning=!0,this.paused=!1,u.a.enabled&&u.a.request()},unpause:function(){this.paused=!1,u.a.enabled&&u.a.request()},addPlayer:function(){var e=d()({},this.paddles[0]);e.name=r()(" Player "+(this.paddles.length+1)),this.paddles.push(e)},getOptionsFromURL:function(e){var t=this;(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.fetch)(e).then(function(e){return e.json()}).then(function(e){t.options=e}).catch(function(e){console.log(e)})},getOptions:function(){return{paddles:this.getPaddleOptions()}},getPaddleOptions:function(){return this.computePaddleOptions(this.paddles,JSON.parse)},setPaddleOptions:function(e){return this.computePaddleOptions(e,r.a)},computePaddleOptions:function(e,t){var n=[],i=e.map(function(e){return d()({},e)}),a=!0,r=!1,o=void 0;try{for(var l,h=s()(i);!(a=(l=h.next()).done);a=!0){var u=l.value;for(var c in u)u.hasOwnProperty(c)&&(u[c]=t(u[c]));n.push(u)}}catch(e){r=!0,o=e}finally{try{!a&&h.return&&h.return()}finally{if(r)throw o}}return n}},created:function(){this.getOptionsFromURL("./static/options/default.json")}}},128:function(e,t,n){"use strict";var i=n(55),s=n.n(i),a=n(138),r=n.n(a),o=n(135),d=n.n(o),l=n(136),h=n.n(l),u=n(247),c=(n.n(u),n(174)),p=n.n(c),v=n(129),g=n(122),m=n.n(g),f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};for(d()(this,e),this.game=new p.a(t),this.stop=i,this.pauseAction=s,this.reRender=!1,this.bots=t.paddles.map(function(e){return!!e.bot&&n.i(v.a)()}),this.multiplier=this.findSaveMultiplier.apply(this,r()(this.game.fieldSize).concat([screen.width,screen.height])),this.renderer=new u.autoDetectRenderer({width:screen.Width,height:screen.Height,backgroundColor:3355443}),this.touches=new Uint8Array(4),this.keys=[],this.actions=["up","down"],this.touchAreas=new u.Container,this.touchAreas.interactive=!0,this.addTouchAreas(),this.target=document.getElementById("canvas");this.target.firstChild;)this.target.removeChild(this.target.firstChild);this.resize=this.resize.bind(this),this.activateKey=this.activateKey.bind(this),this.deactivateKey=this.deactivateKey.bind(this),this.addEventListeners()}return h()(e,[{key:"addEventListeners",value:function(){window.addEventListener("resize",this.resize),window.addEventListener("keyup",this.deactivateKey),window.addEventListener("keydown",this.activateKey)}},{key:"removeEventListeners",value:function(){window.removeEventListener("resize",this.resize),window.removeEventListener("keyup",this.deactivateKey),window.removeEventListener("keydown",this.activateKey),m.a.off("change",this.pause.bind(this))}},{key:"resize",value:function(){this.multiplier=this.findSaveMultiplier.apply(this,r()(this.game.fieldSize).concat([screen.width,screen.height])),this.addTouchAreas(),this.firstRender(),this.renderer.resize(screen.width,screen.height)}},{key:"activateKey",value:function(e){this.keys[e.keyCode]=!0}},{key:"deactivateKey",value:function(e){this.keys[e.keyCode]=!1}},{key:"addTouchAreas",value:function(){var e=this;this.touchAreas.removeChildren();for(var t=0;t<this.game.paddles.length;t++)for(var n=0;n<this.actions.length;n++)!function(n){var i=screen.width>screen.height?2*t+n:2*n+t,s=new u.Graphics,a=e.mp(e.game.fieldSize[0]/2,e.game.fieldSize[1]/2);s.hitArea=new u.Rectangle(t*a[0],n*a[1],t*a[0]+a[0],n*a[1]+a[1]),s.interactive=!0,e.touchAreas.addChild(s),s.on("touchstart",function(){e.touches[i]=!0}),s.on("touchend",function(){e.touches[i]=!1}),s.on("touchendoutside",function(){e.touches[i]=!1})}(n)}},{key:"findSaveMultiplier",value:function(e,t,n,i){return screen.width>screen.height?{x:n/e,y:i/t}:{x:i/e,y:n/t}}},{key:"mp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.multiplier;return screen.width>screen.height?[e*n.x,t*n.y]:[t*n.y,e*n.x]}},{key:"createController",value:function(){var e=[],t=!0,n=!1,i=void 0;try{for(var a,r=s()(this.game.paddles);!(t=(a=r.next()).done);t=!0){var o=a.value;if(!o.bot){var d=!0,l=!1,h=void 0;try{for(var u,c=s()(o.controls);!(d=(u=c.next()).done);d=!0){var p=u.value;this.keys[p.key.toString()]&&e.push({paddle:o,action:p.action})}}catch(e){l=!0,h=e}finally{try{!d&&c.return&&c.return()}finally{if(l)throw h}}}}}catch(e){n=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(n)throw i}}for(var v=0;v<this.game.paddles.length;v++)if(this.bots[v])e.push({paddle:this.game.paddles[v],action:this.bots[v](this.game,v)});else for(var g=0;g<this.actions.length;g++)this.touches[2*v+g]&&e.push({paddle:this.game.paddles[v],action:this.actions[g]});this.controller=e}},{key:"firstRender",value:function(){this.reRender&&(this.paddles.destroy(),this.ball.destroy(),this.textContainer.destroy(),this.stage.destroy()),this.reRender=!0,this.paddles=new u.Container,this.ball=new u.Graphics,this.textContainer=new u.Container,this.stage=new u.Container,this.renderer.render(this.stage);for(var e=0;e<this.game.paddles.length;e++){var t=this.game.paddles[e],n=new u.Text("",{fontFamily:"sarpanch",fontSize:10*this.multiplier.x,fill:16777215,stroke:16711680}),i=this.mp(t.pos[0],t.pos[1]+100);n.x=i[0],n.y=i[1],this.textContainer.addChild(n);var s=new u.Graphics;s.lineStyle(this.multiplier.x,16711680),s.beginFill(16777215),s.drawRect.apply(s,[0,0].concat(r()(this.mp.apply(this,r()(t.size)))));var a=this.mp.apply(this,r()(t.pos));s.x=a[0],s.y=a[1],s.endFill(),this.paddles.addChild(s)}var o=this.mp.apply(this,r()(this.game.ball.pos));this.ball.lineStyle(this.multiplier.x,16711680),this.ball.beginFill(16777215),this.ball.drawCircle(0,0,this.game.ball.size/2*this.multiplier.x),this.ball.x=o[0],this.ball.y=o[1],this.ball.endFill(),this.stage.addChild(this.ball),this.stage.addChild(this.paddles),this.stage.addChild(this.textContainer),this.stage.addChild(this.touchAreas)}},{key:"start",value:function(){var e=this;m.a.on("change",this.pause.bind(this)),this.target.appendChild(this.renderer.view),this.firstRender();!function t(){if(e.game.ended)e.removeEventListeners(),m.a.exit(),e.stage.destroy(),e.stop();else{e.createController(),e.game.update(e.controller);for(var n=0;n<e.game.paddles.length;n++){var i=e.game.paddles[n],s=e.textContainer.getChildAt(n),a=e.mp(i.pos[0],i.pos[1]+100);s.text=i.points||"",s.x=a[0],s.y=a[1];var o=e.paddles.getChildAt(n),d=e.mp.apply(e,r()(i.pos));o.x=d[0],o.y=d[1]}var l=e.mp.apply(e,r()(e.game.ball.pos));e.ball.x=l[0],e.ball.y=l[1],window.requestAnimationFrame(t),e.renderer.render(e.stage)}}()}},{key:"unpause",value:function(){this.game.paused=!1}},{key:"pause",value:function(){m.a.isFullscreen||(this.game.paused=!0,this.pauseAction())}}]),e}();t.a=f},129:function(e,t,n){"use strict";function i(){var e="";return function(t,n){if(t.paddles[n].controlsBall)return""!==e&&t.ball.pos[1]>10?t.ball.pos[1]<t.fieldSize[1]-10?e:"up"===e?"down":"up":e=Math.random()>.5?"down":"up";e="";var i=t.ball.pos[1],a=t.paddles[n].pos[1]+t.paddles[n].size[1]/2,r=i-a;return r<0?s(i,a,t.fieldSize[1])<-1*r&&t.paddles[1].controlsBall?"down":"up":s(a,i,t.fieldSize[1])<r&&t.paddles[1].controlsBall?"up":"down"}}function s(e,t,n){return e+(n-t)}t.a=i},130:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(126),s=n(124),a=n.n(s),r=n(125),o=n.n(r);i.a.use(o.a),i.a.config.productionTip=!1,new i.a({el:"#app",template:"<App/>",components:{App:a.a}})},173:function(e,t){},282:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"startScreen"}},[n("h1",[e._v(e._s(e.message))]),e._v(" "),n("button",{staticClass:"startGame button",on:{click:e.startGame}},[e._v("Play 🕹️")]),e._v(" "),n("button",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#settingScreen",expression:"'#settingScreen'"}],staticClass:"button",attrs:{id:"settingButton"}},[e._v("Settings 🔎")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"settingScreen"}},[n("h1",[e._v("Settings 🔎")]),e._v(" "),n("h2",[e._v("Game Modes 🃏")]),e._v(" "),n("form",{staticClass:"selecter",attrs:{id:"gameModes"}},[n("a",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{id:"twin",type:"radio",name:"gamemode",value:"twin"},domProps:{checked:e._q(e.gameMode,"twin")},on:{change:function(t){e.gameMode="twin"}}}),e._v(" "),n("label",{staticClass:"button",attrs:{for:"twin"}},[e._v("\n          Twin 👯‍\n        ")])]),e._v(" "),n("a",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{type:"radio",id:"default",name:"gamemode",value:"default",checked:""},domProps:{checked:e._q(e.gameMode,"default")},on:{change:function(t){e.gameMode="default"}}}),e._v(" "),n("label",{staticClass:"button",attrs:{for:"default"}},[e._v("\n          Default 😃️\n        ")])])]),e._v(" "),n("h2",[e._v("Advanced Settings 💻")]),e._v(" "),e.paddles[0]?n("div",{staticClass:"wrapper",attrs:{id:"playerSettings"}},[n("table",[n("tr",e._l(e.paddles[0],function(t,i){return n("th",[e._v("\n            "+e._s(i)+"\n          ")])})),e._v(" "),e._l(e.paddles,function(t){return n("tr",e._l(t,function(i,s){return n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t[s],expression:"paddle[key]"}],staticClass:"button",attrs:{type:"text"},domProps:{value:t[s]},on:{input:function(n){n.target.composing||e.$set(t,s,n.target.value)}}})])}))})],2),e._v(" "),n("button",{staticClass:"button",on:{click:e.addPlayer}},[e._v("Add player")])]):e._e()]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.paused,expression:"paused"}],staticClass:"paused"},[n("h1",[e._v("The game is paused!")]),e._v(" "),n("button",{staticClass:"button pauseButton",attrs:{type:"button",name:"button"},on:{click:function(t){e.unpause()}}},[e._v("Unpause")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.gameIsRunning,expression:"gameIsRunning"}],attrs:{id:"canvas"}})])},staticRenderFns:[]}}},[130]);
//# sourceMappingURL=app.ae2965372ccdd9b8154a.js.map