webpackJsonp([1,2],[,,,function(t,e,s){"use strict";var a=s(5),i=s(215),n=s(195),o=s.n(n),c=s(196),r=s.n(c),l=s(192),u=s.n(l),d=s(198),m=s.n(d),h=s(197),f=s.n(h),v=s(194),p=s.n(v),_=s(193),g=s.n(_),C=s(191),w=s.n(C);a.default.use(i.a),e.a=new i.a({routes:[{path:"/",name:"index",component:o.a},{path:"/newsDetail/:id",name:"newsDetail",component:r.a},{path:"/comment/:id",name:"comment",component:u.a},{path:"/writeComment/:id",name:"writeComment",component:m.a},{path:"/themeDetail/:id",name:"themeDetail",component:f.a},{path:"/editorsList/:id",name:"editorsList",component:p.a},{path:"/editor/:editorId/:editorName",name:"editor",component:g.a},{path:"/collect",name:"collect",component:w.a}]})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var a=s(5),i=s(217);a.default.use(i.a),e.a=new i.a.Store({state:{width:0,height:0,stories:[],ids:[],id:"",nextId:"",isFirstLoad:!0,collectIds:[],collectStories:[],isCollect:!1,comments:0,long_comments:0,short_comments:0,popularity:0,newsType:-1},getters:{collectText:function(t){return t.isCollect?"取消收藏":"收藏"}},mutations:{initSize:function(t,e){t.width=e.width,t.height=e.height},addNews:function(t,e){t.stories=t.stories.concat(e.stories),t.ids=t.ids.concat(e.ids)},refreshNews:function(t){t.stories=[]},changeLoadState:function(t){t.isFirstLoad=!t.isFirstLoad},changeCurrentNewsId:function(t,e){t.id=e;var s=t.ids.indexOf(e);t.nextId=t.ids[++s]},toggleCollect:function(t){var e=t.collectIds.indexOf(t.id);e<0?(t.collectIds.push(t.id),t.stories.map(function(e){e.id===t.id&&t.collectStories.push(e)})):(t.collectIds.splice(e,1),t.collectStories.splice(e,1)),t.isCollect=!t.isCollect},judgeCollectState:function(t){t.collectIds.indexOf(t.id)<0?t.isCollect=!1:t.isCollect=!0},changeNewsType:function(t,e){t.newsType=e}}})},function(t,e){},function(t,e,s){s(167);var a=s(1)(s(148),s(202),null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",created:function(){this.$store.commit("initSize",{width:window.screen.width,height:window.screen.height})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(0),o=s.n(n);e.default={data:function(){return{comments:[]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;i.a.get("api/story/"+this.$store.state.id+"/long-comments").then(function(e){t.comments=e.data.comments}).catch(function(t){console.log(t)})},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},changeTime:function(t){return o()(t).format("MM-DD HH:mm")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(3),o=s(8);s.n(o);e.default={data:function(){return{loading:!1,date:Date,dateStr:""}},created:function(){var t=this;this.$store.state.isFirstLoad&&(this.fetchData(),this.$store.commit("changeLoadState")),this.initDate(),this.$on("refresh",function(){t.refreshData()})},methods:{viewDetail:function(t){this.$store.commit("changeCurrentNewsId",t),this.$store.commit("changeNewsType",0),n.a.push({name:"newsDetail",params:{id:t}})},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},fetchData:function(){var t=this;i.a.get("api/news/latest").then(function(e){var s=e.data.stories,a=s.map(function(t){return t.id});t.$store.commit("addNews",{stories:s,ids:a})}).catch(function(t){console.log(t)})},refreshData:function(){var t=this;this.$store.commit("refreshNews"),this.$nextTick(function(){t.fetchData()})},initDate:function(){this.date=new Date,this.changeDate2String()},changeDate2String:function(){var t=this.date.getFullYear(),e=this.date.getMonth()+1,s=this.date.getDate();e=e<10?"0"+e:e,s=s<10?"0"+s:s,this.dateStr=t+e+s},decreaseDate:function(){this.date.setDate(this.date.getDate()-1),this.changeDate2String()},fetchMoreData:function(){var t=this;i.a.get("api/news/before/"+this.dateStr).then(function(e){var s=e.data.stories,a=s.map(function(t){return t.id});t.$store.commit("addNews",{stories:s,ids:a}),o.Indicator.close()}).catch(function(t){console.log(t)}),this.decreaseDate()},loadMore:function(){this.loading=!0,o.Indicator.open({spinnerType:"fading-circle"}),this.$nextTick(function(){this.fetchMoreData()}),this.loading=!1}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(3),i=s(187),n=s.n(i),o=s(4),c=s.n(o);e.default={data:function(){return{isDianzan:!1,popupVisible:!1}},created:function(){this.fetchStoryExtra()},watch:{$route:"reloadId"},methods:{fetchStoryExtra:function(){var t=this;c.a.get("api/story-extra/"+this.$store.state.id).then(function(e){t.$store.state.long_comments=e.data.long_comments,t.$store.state.popularity=e.data.popularity,t.$store.state.short_comments=e.data.short_comments,t.$store.state.comments=e.data.comments}).catch(function(t){console.log(t)})},goBack:function(){var t=this.$store.state.newsType;0===t?a.a.push({name:"index"}):1===t?a.a.push({name:"themeDetail"}):2===t&&a.a.push({name:"collect"})},thumbUp:function(){this.isDianzan?this.$store.state.popularity--:this.$store.state.popularity++,this.isDianzan=!this.isDianzan},showMenu:function(){this.popupVisible=!0},hideMenu:function(){this.popupVisible=!1},goNext:function(){a.a.push({name:"newsDetail",params:{id:this.$store.state.nextId}})},reloadId:function(){this.$emit("reloadId"),this.fetchStoryExtra()},showComment:function(){a.a.push({name:"comment",params:{id:this.$store.state.id}})}},components:{share:n.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},created:function(){this.$store.commit("judgeCollectState")},methods:{cancel:function(){this.$emit("cancel")},toggleCollect:function(){this.$store.commit("toggleCollect")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(0),o=s.n(n);e.default={data:function(){return{comments:[],isShow:!1}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;i.a.get("api/story/"+this.$store.state.id+"/short-comments").then(function(e){t.comments=e.data.comments}).catch(function(t){console.log(t)})},toggleShortComment:function(){this.isShow=!this.isShow},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},changeTime:function(t){return o()(t).format("MM-DD HH:mm")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(127),o=s.n(n),c=s(3);e.default={props:{isShowSidebar:{type:Boolean}},data:function(){return{data:[]}},created:function(){this.fetchData()},methods:{hideSidebar:function(){this.$emit("hideSidebar")},fetchData:function(){var t=this;i.a.get("api/themes").then(function(e){t.data=e.data.others,t.data.unshift({color:0,thumbnail:"",description:"首页",id:-1,name:"首页"}),t.$nextTick(function(){t.menuScroll=new o.a(t.$refs.menuWrapper,{click:!0})})}).catch(function(t){console.log(t)})},themeDetail:function(t){t===-1?this.hideSidebar():c.a.push({name:"themeDetail",params:{id:t}})},goCollect:function(){c.a.push({name:"collect"})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(3);e.default={data:function(){return{topStories:{}}},created:function(){var t=this;i.a.get("api/news/latest").then(function(e){t.topStories=e.data.top_stories}).catch(function(t){console.log(t)})},methods:{viewDetail:function(t){n.a.push({name:"newsDetail",params:{id:t}})},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(3);e.default={data:function(){return{}},created:function(){},methods:{back:function(){a.a.push({name:"index"})},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},viewDetail:function(t){this.$store.commit("changeCurrentNewsId",t),this.$store.commit("changeNewsType",2),a.a.push({name:"newsDetail",params:{id:t}})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(3),i=s(184),n=s.n(i),o=s(188),c=s.n(o);e.default={methods:{backToDetail:function(){a.a.go(-1)},writeComment:function(){a.a.push({name:"writeComment",params:{id:this.$store.state.id}})}},components:{"long-comment":n.a,"short-comment":c.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(3);e.default={data:function(){return{data:"",html:""}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;i.a.get("api/editor/"+this.$route.params.editorId+"/profile-page/ios").then(function(e){e.data=t.attachBodyContent(e.data),t.data=e.data})},back:function(){n.a.go(-1)},attachBodyContent:function(t){return t.replace(/src="http\w{0,1}:\/\//g,'src="https://images.weserv.nl/?url=')}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(3);e.default={data:function(){return{data:[]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;i.a.get("api/theme/"+this.$route.params.id).then(function(e){t.data=e.data.editors})},back:function(){n.a.go(-1)},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},viewEditorProfile:function(t,e){n.a.push({name:"editor",params:{editorId:t,editorName:e}})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(190),i=s.n(a),n=s(185),o=s.n(n),c=s(189),r=s.n(c);e.default={data:function(){return{isShowSidebar:!1}},created:function(){this.isShowSidebar=!1},components:{swipe:i.a,newsList:o.a,sidebar:r.a},methods:{toggleSidebar:function(){this.isShowSidebar=!this.isShowSidebar},loadTop:function(){this.$refs.newsList.$emit("refresh"),this.$refs.loadmore.onTopLoaded()},onScroll:function(t,e){console.log(e)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(4),i=s.n(a),n=s(186),o=s.n(n);e.default={data:function(){return{data:{}}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=this.$route.params.id;i.a.get("api/news/"+e).then(function(e){e.data.body=t.attachBodyContent(e.data.body),t.data=e.data}).catch(function(t){console.log(t)}),this.$store.commit("changeCurrentNewsId",e),this.$store.commit("judgeCollectState")},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},attachBodyContent:function(t){return t.replace(/src="http\w{0,1}:\/\//g,'src="https://images.weserv.nl/?url=')}},components:{"news-menu":o.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(3),i=s(4),n=s.n(i);e.default={data:function(){return{id:"",data:{},editorIds:[],isFocus:!0}},created:function(){this.id=this.$route.params.id,this.fetchData()},methods:{fetchData:function(){var t=this;n.a.get("api/theme/"+this.id).then(function(e){t.data=e.data,t.data.editors.map(function(e){t.editorIds.push(e.id)})})},viewDetail:function(t){this.$store.commit("changeCurrentNewsId",t),this.$store.commit("changeNewsType",1),a.a.push({name:"newsDetail",params:{id:t}})},backIndex:function(){a.a.go(-1)},attachImageUrl:function(t){if(void 0!==t)return t.replace(/http\w{0,1}:\/\/p/g,"https://images.weserv.nl/?url=p")},toggleThemeFocus:function(){this.isFocus=!this.isFocus},showEditors:function(){a.a.push({name:"editorsList",params:{themeId:this.id}})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(3);e.default={methods:{backToComment:function(){a.a.go(-1)},release:function(){alert("发布评论")}}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,s){function a(t){return s(i(t))}function i(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var n={"./af":14,"./af.js":14,"./ar":20,"./ar-dz":15,"./ar-dz.js":15,"./ar-ly":16,"./ar-ly.js":16,"./ar-ma":17,"./ar-ma.js":17,"./ar-sa":18,"./ar-sa.js":18,"./ar-tn":19,"./ar-tn.js":19,"./ar.js":20,"./az":21,"./az.js":21,"./be":22,"./be.js":22,"./bg":23,"./bg.js":23,"./bn":24,"./bn.js":24,"./bo":25,"./bo.js":25,"./br":26,"./br.js":26,"./bs":27,"./bs.js":27,"./ca":28,"./ca.js":28,"./cs":29,"./cs.js":29,"./cv":30,"./cv.js":30,"./cy":31,"./cy.js":31,"./da":32,"./da.js":32,"./de":34,"./de-at":33,"./de-at.js":33,"./de.js":34,"./dv":35,"./dv.js":35,"./el":36,"./el.js":36,"./en-au":37,"./en-au.js":37,"./en-ca":38,"./en-ca.js":38,"./en-gb":39,"./en-gb.js":39,"./en-ie":40,"./en-ie.js":40,"./en-nz":41,"./en-nz.js":41,"./eo":42,"./eo.js":42,"./es":44,"./es-do":43,"./es-do.js":43,"./es.js":44,"./et":45,"./et.js":45,"./eu":46,"./eu.js":46,"./fa":47,"./fa.js":47,"./fi":48,"./fi.js":48,"./fo":49,"./fo.js":49,"./fr":52,"./fr-ca":50,"./fr-ca.js":50,"./fr-ch":51,"./fr-ch.js":51,"./fr.js":52,"./fy":53,"./fy.js":53,"./gd":54,"./gd.js":54,"./gl":55,"./gl.js":55,"./he":56,"./he.js":56,"./hi":57,"./hi.js":57,"./hr":58,"./hr.js":58,"./hu":59,"./hu.js":59,"./hy-am":60,"./hy-am.js":60,"./id":61,"./id.js":61,"./is":62,"./is.js":62,"./it":63,"./it.js":63,"./ja":64,"./ja.js":64,"./jv":65,"./jv.js":65,"./ka":66,"./ka.js":66,"./kk":67,"./kk.js":67,"./km":68,"./km.js":68,"./ko":69,"./ko.js":69,"./ky":70,"./ky.js":70,"./lb":71,"./lb.js":71,"./lo":72,"./lo.js":72,"./lt":73,"./lt.js":73,"./lv":74,"./lv.js":74,"./me":75,"./me.js":75,"./mi":76,"./mi.js":76,"./mk":77,"./mk.js":77,"./ml":78,"./ml.js":78,"./mr":79,"./mr.js":79,"./ms":81,"./ms-my":80,"./ms-my.js":80,"./ms.js":81,"./my":82,"./my.js":82,"./nb":83,"./nb.js":83,"./ne":84,"./ne.js":84,"./nl":86,"./nl-be":85,"./nl-be.js":85,"./nl.js":86,"./nn":87,"./nn.js":87,"./pa-in":88,"./pa-in.js":88,"./pl":89,"./pl.js":89,"./pt":91,"./pt-br":90,"./pt-br.js":90,"./pt.js":91,"./ro":92,"./ro.js":92,"./ru":93,"./ru.js":93,"./se":94,"./se.js":94,"./si":95,"./si.js":95,"./sk":96,"./sk.js":96,"./sl":97,"./sl.js":97,"./sq":98,"./sq.js":98,"./sr":100,"./sr-cyrl":99,"./sr-cyrl.js":99,"./sr.js":100,"./ss":101,"./ss.js":101,"./sv":102,"./sv.js":102,"./sw":103,"./sw.js":103,"./ta":104,"./ta.js":104,"./te":105,"./te.js":105,"./tet":106,"./tet.js":106,"./th":107,"./th.js":107,"./tl-ph":108,"./tl-ph.js":108,"./tlh":109,"./tlh.js":109,"./tr":110,"./tr.js":110,"./tzl":111,"./tzl.js":111,"./tzm":113,"./tzm-latn":112,"./tzm-latn.js":112,"./tzm.js":113,"./uk":114,"./uk.js":114,"./uz":115,"./uz.js":115,"./vi":116,"./vi.js":116,"./x-pseudo":117,"./x-pseudo.js":117,"./yo":118,"./yo.js":118,"./zh-cn":119,"./zh-cn.js":119,"./zh-hk":120,"./zh-hk.js":120,"./zh-tw":121,"./zh-tw.js":121};a.keys=function(){return Object.keys(n)},a.resolve=i,t.exports=a,a.id=180},,,function(t,e,s){t.exports=s.p+"static/img/avatar.f85001a.png"},function(t,e,s){s(164);var a=s(1)(s(149),s(199),null,null);t.exports=a.exports},function(t,e,s){s(178);var a=s(1)(s(150),s(213),"data-v-d82f6382",null);t.exports=a.exports},function(t,e,s){s(166);var a=s(1)(s(151),s(201),null,null);t.exports=a.exports},function(t,e,s){s(179);var a=s(1)(s(152),s(214),null,null);t.exports=a.exports},function(t,e,s){s(174);var a=s(1)(s(153),s(209),null,null);t.exports=a.exports},function(t,e,s){s(177);var a=s(1)(s(154),s(212),"data-v-c510d1c4",null);t.exports=a.exports},function(t,e,s){s(173);var a=s(1)(s(155),s(208),null,null);t.exports=a.exports},function(t,e,s){s(168);var a=s(1)(s(156),s(203),"data-v-2bbfde34",null);t.exports=a.exports},function(t,e,s){s(171);var a=s(1)(s(157),s(206),"data-v-3aaac8e9",null);t.exports=a.exports},function(t,e,s){s(172);var a=s(1)(s(158),s(207),"data-v-3deb2fd3",null);t.exports=a.exports},function(t,e,s){s(169);var a=s(1)(s(159),s(204),"data-v-30489524",null);t.exports=a.exports},function(t,e,s){s(176);var a=s(1)(s(160),s(211),"data-v-a8fe7348",null);t.exports=a.exports},function(t,e,s){s(165);var a=s(1)(s(161),s(200),"data-v-155978ea",null);t.exports=a.exports},function(t,e,s){s(175);var a=s(1)(s(162),s(210),"data-v-73e30b84",null);t.exports=a.exports},function(t,e,s){s(170);var a=s(1)(s(163),s(205),null,null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"long-comment"},[s("div",{staticClass:"box"}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0!==this.comments.length,expression:"this.comments.length !== 0"}],staticClass:"long-comment-number"},[t._v(t._s(this.$store.state.long_comments)+"条长评")]),t._v(" "),s("ul",{ref:"longCommentList",staticClass:"comment-list"},[s("i",{staticClass:"icon iconfont icon-shafa"}),t._v(" "),t._l(this.comments,function(e){return s("li",{staticClass:"comment-item"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.longCommentList",value:t.attachImageUrl(e.avatar),expression:"attachImageUrl(comment.avatar)",modifiers:{longCommentList:!0}}],staticClass:"avatar",attrs:{alt:e.author}}),t._v(" "),s("div",{staticClass:"comment-content"},[s("span",{staticClass:"author"},[t._v(t._s(e.author))]),t._v(" "),s("i",{staticClass:"icon iconfont icon-dianzan"},[t._v(t._s(e.likes))]),t._v(" "),s("p",{staticClass:"text"},[t._v(t._s(e.content))]),t._v(" "),void 0!==e.reply_to?[s("p",{staticClass:"reply"},[s("span",{staticClass:"reply-author"},[t._v("//"+t._s(e.reply_to.author)+":")]),t._v("\n            "+t._s(e.reply_to.content)+"\n         ")])]:t._e(),t._v(" "),s("span",{staticClass:"date"},[t._v(t._s(t.changeTime(e.time)))])],2)])})],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"news-detail"},[0===this.$store.state.newsType?s("div",{staticClass:"top-wrapper"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.attachImageUrl(this.data.image),expression:"attachImageUrl(this.data.image)"}],attrs:{alt:this.data.title}}),t._v(" "),s("span",{staticClass:"top-title"},[t._v(t._s(t.data.title))]),t._v(" "),s("span",{staticClass:"image-source"},[t._v("图片："+t._s(this.data.image_source))])]):t._e(),t._v(" "),s("div",{staticClass:"body-wrap",domProps:{innerHTML:t._s(this.data.body)}}),t._v(" "),s("news-menu",{on:{reloadId:t.fetchData}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"news-menu"},[s("ul",{staticClass:"menu-wrap"},[s("li",{staticClass:"menu-item",on:{click:t.goBack}},[s("i",{staticClass:"icon iconfont icon-back"})]),t._v(" "),s("li",{staticClass:"menu-item",on:{click:t.goNext}},[s("i",{staticClass:"icon iconfont icon-moreunfold"})]),t._v(" "),s("li",{staticClass:"menu-item",class:{"dianzan-active":t.isDianzan},on:{click:t.thumbUp}},[s("i",{staticClass:"icon iconfont icon-dianzan"}),t._v(" "),s("span",{staticClass:"dianzan-number"},[t._v(t._s(this.$store.state.popularity))])]),t._v(" "),s("li",{staticClass:"menu-item",on:{click:t.showMenu}},[s("i",{staticClass:"icon iconfont icon-fenxiang"})]),t._v(" "),s("li",{staticClass:"menu-item",on:{click:t.showComment}},[s("i",{staticClass:"icon iconfont icon-pinglun"}),t._v(" "),s("span",{staticClass:"comments-number"},[t._v(t._s(this.$store.state.comments))])])]),t._v(" "),s("mt-popup",{attrs:{"popup-transition":"popup-fade",position:"bottom"},model:{value:t.popupVisible,callback:function(e){t.popupVisible=e}}},[s("share",{on:{cancel:t.hideMenu}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collect"},[s("mt-header",{attrs:{fixed:"",title:"收藏"}},[s("mt-button",{attrs:{icon:"back"},on:{click:t.back},slot:"left"})],1),t._v(" "),s("ul",{ref:"collectList",staticClass:"list"},t._l(this.$store.state.collectStories,function(e){return s("li",{key:e.id,staticClass:"list-item",on:{click:function(s){t.viewDetail(e.id)}}},[s("span",{staticClass:"item-title"},[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"image-wrapper"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.collectList",value:t.attachImageUrl(e.images[0]),expression:"attachImageUrl(story.images[0])",modifiers:{collectList:!0}}],staticClass:"item-image",attrs:{alt:e.title}}),t._v(" "),e.multipic?s("i",{staticClass:"icon iconfont icon-duotu multipic"},[t._v("多图")]):t._e()])])}))],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"editors-list"},[s("header",[s("i",{staticClass:"icon iconfont icon-back",on:{click:t.back}}),t._v(" "),s("span",{staticClass:"text"},[t._v("主编")])]),t._v(" "),s("ul",{ref:"editorList",staticClass:"list"},t._l(t.data,function(e){return s("li",{staticClass:"item",on:{click:function(s){t.viewEditorProfile(e.id,e.name)}}},[s("div",{staticClass:"wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.editorList",value:t.attachImageUrl(e.avatar),expression:"attachImageUrl(item.avatar)",modifiers:{editorList:!0}}],attrs:{alt:""}}),t._v(" "),s("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"bio"},[t._v(t._s(e.bio))]),t._v(" "),s("i",{staticClass:"icon iconfont icon-more"})])])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"write-comment"},[s("div",{staticClass:"header"},[s("i",{staticClass:"icon iconfont icon-back",on:{click:t.backToComment}}),t._v(" "),s("span",{staticClass:"header-text"},[t._v("写点评")]),t._v(" "),s("span",{staticClass:"header-release",on:{click:t.release}},[t._v("发布")])]),t._v(" "),s("div",{staticClass:"warning-text"},[t._v("\n    不友善言论会被删除，深度讨论会被优先展示\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"comment"},[s("div",{staticClass:"head"},[t._v(t._s(this.$store.state.comments)+"条点评")]),t._v(" "),s("long-comment"),t._v(" "),s("short-comment"),t._v(" "),s("div",{staticClass:"foot"},[s("i",{staticClass:"icon iconfont icon-back",on:{click:t.backToDetail}}),t._v(" "),s("i",{staticClass:"icon iconfont icon-bianxie",on:{click:t.writeComment}},[t._v("写评论")])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"editor"},[s("header",[s("i",{staticClass:"icon iconfont icon-back",on:{click:t.back}}),t._v(" "),s("div",{staticClass:"text"},[t._v(t._s(this.$route.params.editorName))]),t._v(" "),s("div",{staticClass:"box"})]),t._v(" "),s("div",{staticClass:"html-content",domProps:{innerHTML:t._s(this.data)}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swipe"},[s("mt-swipe",{attrs:{auto:4e3}},t._l(t.topStories,function(e){return s("mt-swipe-item",{key:e.id,nativeOn:{click:function(s){t.viewDetail(e.id)}}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.attachImageUrl(e.image),expression:"attachImageUrl(topStory.image)"}],attrs:{alt:e.title}}),t._v(" "),s("span",{staticClass:"top-story-title"},[t._v(t._s(e.title))])])}))],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"short-comment"},[s("div",{directives:[{name:"show",rawName:"v-show",value:0!==this.comments.length,expression:"this.comments.length !== 0"}],staticClass:"short-comment-number",on:{click:t.toggleShortComment}},[t._v("\n    "+t._s(this.$store.state.short_comments)+"条短评\n    "),s("i",{staticClass:"icon iconfont",class:[t.isShow?"icon-updouble":"icon-downdouble"]})]),t._v(" "),s("ul",{ref:"shortCommentList",staticClass:"comment-list",class:{hide:!t.isShow}},t._l(this.comments,function(e){return s("li",{staticClass:"comment-item"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.shortCommentList",value:t.attachImageUrl(e.avatar),expression:"attachImageUrl(comment.avatar)",modifiers:{shortCommentList:!0}}],staticClass:"avatar",attrs:{alt:e.author}}),t._v(" "),s("div",{staticClass:"comment-content"},[s("span",{staticClass:"author"},[t._v(t._s(e.author))]),t._v(" "),s("i",{staticClass:"icon iconfont icon-dianzan"},[t._v(t._s(e.likes))]),t._v(" "),s("p",{staticClass:"text"},[t._v(t._s(e.content))]),t._v(" "),void 0!==e.reply_to?[s("p",{staticClass:"reply"},[s("span",{staticClass:"reply-author"},[t._v("//"+t._s(e.reply_to.author)+":")]),t._v("\n            "+t._s(e.reply_to.content)+"\n         ")])]:t._e(),t._v(" "),s("span",{staticClass:"date"},[t._v(t._s(t.changeTime(e.time)))])],2)])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"theme-detail"},[s("header",[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.attachImageUrl(t.data.image),expression:"attachImageUrl(data.image)"}],attrs:{alt:""}}),t._v(" "),s("i",{staticClass:"icon iconfont icon-back",on:{click:t.backIndex}}),t._v(" "),s("span",{staticClass:"title"},[t._v(t._s(t.data.name))]),t._v(" "),s("i",{staticClass:"icon iconfont",class:[t.isFocus?"icon-jian":"icon-jia"],on:{click:t.toggleThemeFocus}})]),t._v(" "),s("div",{staticClass:"editors",on:{click:function(e){t.showEditors()}}},[s("span",{staticClass:"text"},[t._v("主编")]),t._v(" "),t._l(t.data.editors,function(e){return s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.attachImageUrl(e.avatar),expression:"attachImageUrl(item.avatar)"}],attrs:{alt:""}})}),t._v(" "),s("i",{staticClass:"icon iconfont icon-more"})],2),t._v(" "),s("ul",{ref:"list",staticClass:"list"},t._l(t.data.stories,function(e){return s("li",{key:e.id,staticClass:"list-item",on:{click:function(s){t.viewDetail(e.id)}}},[s("span",{staticClass:"item-title"},[t._v(t._s(e.title))]),t._v(" "),void 0!==e.images?s("div",{staticClass:"image-wrapper"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.list",value:t.attachImageUrl(e.images[0]),expression:"attachImageUrl(story.images[0])",modifiers:{list:!0}}],staticClass:"item-image",attrs:{alt:e.title}})]):t._e()])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"scroll",rawName:"v-scroll",value:t.onScroll,expression:"onScroll"}],staticClass:"index"},[s("sidebar",{attrs:{isShowSidebar:t.isShowSidebar},on:{hideSidebar:t.toggleSidebar}}),t._v(" "),s("mt-loadmore",{ref:"loadmore",attrs:{"top-method":t.loadTop,topDistance:40}},[s("header",[s("i",{staticClass:"icon iconfont icon-fenlei",on:{click:t.toggleSidebar}}),t._v(" "),s("span",{staticClass:"hot-news"},[t._v("今日热闻")])]),t._v(" "),s("swipe"),t._v(" "),s("newsList",{ref:"newsList"})],1)],1)},staticRenderFns:[]}},function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap",class:[t.isShowSidebar?"show":""]},[s("div",{staticClass:"sidebar"},[t._m(0),t._v(" "),s("div",{staticClass:"menubar"},[s("div",{on:{click:t.goCollect}},[s("i",{staticClass:"icon iconfont icon-shoucang"}),s("br"),t._v(" "),s("span",[t._v("收藏")])]),t._v(" "),t._m(1),t._v(" "),t._m(2)]),t._v(" "),s("div",{ref:"menuWrapper",staticClass:"menu-wrapper"},[s("ul",t._l(t.data,function(e){return s("li",{staticClass:"menu-item",on:{click:function(s){t.themeDetail(e.id)}}},[e.id===-1?s("i",{staticClass:"icon iconfont icon-shouyeshouye"}):t._e(),t._v("\n          "+t._s(e.name)+"\n          "),s("i",{staticClass:"icon iconfont icon-more"})])}))]),t._v(" "),t._m(3)]),t._v(" "),s("div",{staticClass:"mask",on:{click:t.hideSidebar}})])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top"},[a("img",{staticClass:"avatar",attrs:{src:s(183),alt:""}}),t._v(" "),a("span",{staticClass:"name"},[t._v("陈钰博")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("i",{staticClass:"icon iconfont icon-xiaoxi"}),s("br"),t._v(" "),s("span",[t._v("消息")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("i",{staticClass:"icon iconfont icon-shezhi"}),s("br"),t._v(" "),s("span",[t._v("设置")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"foot-menu"},[s("i",{staticClass:"icon iconfont icon-lixianwenjian"},[t._v("  离线")]),t._v(" "),s("i",{staticClass:"icon iconfont icon-yejianmoshi"},[t._v("  夜间")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"news-list"},[s("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],ref:"newsList",staticClass:"list",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-immediate-check":"false","infinite-scroll-distance":"40"}},t._l(this.$store.state.stories,function(e){return s("li",{key:e.id,staticClass:"list-item",on:{click:function(s){t.viewDetail(e.id)}}},[s("span",{staticClass:"item-title"},[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"image-wrapper"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy.newsList",value:t.attachImageUrl(e.images[0]),expression:"attachImageUrl(story.images[0])",modifiers:{newsList:!0}}],staticClass:"item-image",attrs:{alt:e.title}}),t._v(" "),e.multipic?s("i",{staticClass:"icon iconfont icon-duotu multipic"},[t._v("多图")]):t._e()])])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"share"},[s("span",{staticClass:"share-title"},[t._v("分享这篇内容")]),t._v(" "),s("mt-swipe",{attrs:{auto:0}},[s("mt-swipe-item",[s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-weixinhaoyou"}),t._v(" "),s("span",[t._v("微信好友")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-weixinpengyouquan"}),t._v(" "),s("span",[t._v("微信朋友圈")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-QQ"}),t._v(" "),s("span",[t._v("QQ")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-weibo"}),t._v(" "),s("span",[t._v("新浪微博")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-fuzhi"}),t._v(" "),s("span",[t._v("复制链接")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-youdaoyunbiji"}),t._v(" "),s("span",[t._v("有道云笔记")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-yinxiangbiji"}),t._v(" "),s("span",[t._v("印象笔记")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-tengxunweibo"}),t._v(" "),s("span",[t._v("腾讯微博")])])]),t._v(" "),s("mt-swipe-item",[s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-xinxi"}),t._v(" "),s("span",[t._v("微信好友")])]),t._v(" "),s("div",{staticClass:"share-item"},[s("i",{staticClass:"icon iconfont icon-instapaper"}),t._v(" "),s("span",[t._v("微信朋友圈")])])])],1),t._v(" "),s("div",{staticClass:"button",on:{click:t.toggleCollect}},[t._v(t._s(this.$store.getters.collectText))]),t._v(" "),s("div",{staticClass:"button",on:{click:t.cancel}},[t._v("取消")])],1)},staticRenderFns:[]}},,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(5),i=s(126),n=s.n(i),o=s(3),c=s(124),r=s(8),l=s.n(r),u=s(123),d=s.n(u),m=s(125),h=(s.n(m),s(7)),f=s.n(h);a.default.config.productionTip=!1,a.default.use(l.a),a.default.use(d.a),a.default.use(f.a,{preLoad:1.3,error:"dist/error.png",loading:"dist/loading.gif",attempt:1,listenEvents:["scroll"]}),new a.default({el:"#app",router:o.a,store:c.a,template:"<App/>",components:{App:n.a}})}],[219]);
//# sourceMappingURL=app.adebb0a54027e0527118.js.map