webpackJsonp([2],{ugUx:function(t,i,s){"use strict";var a,e;Object.defineProperty(i,"__esModule",{value:!0});var r=void 0,o=void 0,n=void 0,p={data:function(){return{mapInfo:{},sheetVisible:!1,actions:[{name:"圆形（默认）",method:this.drawClk,type:0},{name:"自定义形状",method:this.drawClk,type:1}],drawType:0,markers:[],markerArray:[],isClik:!0,isdraw:!0,radius:500,isfirstLoding:!1}},created:function(){this.$route.query.gid&&this.getdata()},mounted:function(){var t=this,i=this;this.map=new AMap.Map("container",{resizeEnable:!0,zoom:14}),this.$route.query.gid||this.map.plugin("AMap.Geolocation",function(){n=new AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,buttonOffset:new AMap.Pixel(10,20),zoomToAccuracy:!0,buttonPosition:"RB"}),i.map.addControl(n),n.getCurrentPosition()}),a=this.map,this.map.on("click",function(i){var s={Lng:i.lnglat.getLng(),lat:i.lnglat.getLat()};t.mapClk(s)})},methods:{getdata:function(){var t=this;this.isfirstLoding=!0,this.$http.get("http://restapi.amap.com/v4/geofence/meta",{params:{key:this.mapKey,gid:this.$route.query.gid,page_no:1,page_size:20}}).then(function(i){t.mapInfo=i.data.data.rs_list[0];var s=t.mapInfo.center.split(",");if(t.map.setCenter([s[0],s[1]]),""==t.mapInfo.points){var a=t.mapInfo.center.split(",");t.mapClk({Lng:a[0],lat:a[1]}),t.radius=t.mapInfo.radius}else{var e=t.mapInfo.points.split(";");t.drawType=1,e.forEach(function(i,s){t.markers.push({icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",position:[i.split(",")[0],i.split(",")[1]]}),s==e.length-1&&(t.setting(),t.drawSt(),t.isfirstLoding=!1)})}}).catch(function(i){t.toast("查询失败")})},mapClk:function(t){0==this.drawType?(this.markers=[{icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",position:[t.Lng,t.lat]}],this.setting(),this.drawSt()):(this.markers.push({icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",position:[t.Lng,t.lat]}),this.setting(),(this.markers.length>3||3==this.markers.length)&&this.drawSt())},setting:function(){var t=this;0==this.drawType?this.isClik?((a=new AMap.Marker({map:t.map,icon:t.markers[0].icon,position:[t.markers[0].position[0],t.markers[0].position[1]],offset:new AMap.Pixel(-12,-36)})).setMap(t.map),this.isClik=!1):a.setPosition([t.markers[0].position[0],t.markers[0].position[1]]):this.markers.forEach(function(i){e=new AMap.Marker({map:t.map,icon:i.icon,position:[i.position[0],i.position[1]],offset:new AMap.Pixel(-12,-36)}),t.markerArray.push(e),e.setMap(t.map)})},drawSt:function(){if(0==this.drawType)this.isdraw?((r=new AMap.Circle({center:new AMap.LngLat(this.markers[0].position[0],this.markers[0].position[1]),radius:this.radius,strokeColor:"#F33",strokeOpacity:1,strokeWeight:3,fillColor:"#ee2200",fillOpacity:.35})).setMap(this.map),this.isdraw=!1):r.setCenter([this.markers[0].position[0],this.markers[0].position[1]]);else{var t=new Array;this.markers.forEach(function(i){t.push([i.position[0],i.position[1]])}),(o=new AMap.Polygon({path:t,strokeColor:"#FF33FF",strokeOpacity:.2,strokeWeight:3,fillColor:"#1791fc",fillOpacity:.35})).setMap(this.map)}},drawClk:function(t){this.drawType=t.type},goback:function(){this.$router.go(-1)},goedit:function(){var t=void 0;if(0==this.markers.length)return this.toast("请先设置围栏"),!1;t=0==this.drawType?{type:this.drawType,data:this.markers,radius:this.radius}:{type:this.drawType,data:this.markers,radius:""},this.$store.commit("setMap",t),this.$router.push({path:"/editMap/mapInfo_edit",query:{gid:this.$route.query.gid,name:this.mapInfo.name,id:this.$route.query.id}})}},watch:{radius:function(t){r.setRadius(t)},drawType:function(t){console.log(this.isfirstLoding),this.isfirstLoding||(console.log("变化"),this.markers.length>0&&(0==t?(this.map.remove(this.markerArray),o.setMap(null),this.isClik=!0,this.isdraw=!0):(a.setMap(null),r.setMap(null)),this.markers=[]))}}},l={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"editmap-body"},[s("mt-header",{attrs:{title:"电子围栏"}},[s("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.goback},slot:"left"}),t._v(" "),s("span",{attrs:{slot:"right"},on:{click:function(i){t.sheetVisible=!0}},slot:"right"},[t._v("围栏类型")])],1),t._v(" "),s("div",{attrs:{id:"container",tabindex:"0"}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.drawType,expression:"drawType==0"}],staticClass:"drag-body"},[s("div",{staticClass:"drag"},[s("mt-range",{attrs:{min:100,step:100,max:1500},model:{value:t.radius,callback:function(i){t.radius=i},expression:"radius"}},[s("div",{staticStyle:{"margin-right":"5px"},attrs:{slot:"start"},slot:"start"},[t._v("100")]),t._v(" "),s("div",{staticStyle:{"margin-left":"5px"},attrs:{slot:"end"},slot:"end"},[t._v("150")])]),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:!t.isdraw,expression:"!isdraw"}]},[t._v("当前圆形半径为："+t._s(t.radius))])],1)]),t._v(" "),s("div",{staticClass:"footer-tip"},[1==t.drawType?s("p",[t._v("请在地图上点击三个以上的点组成一个闭合的多边形作为安全范围的区域")]):s("p",[t._v("请在地图上点击任意位置")]),t._v(" "),s("button",{staticClass:"btn-ok",on:{click:t.goedit}},[t._v("确定")])]),t._v(" "),s("mt-actionsheet",{attrs:{actions:t.actions},model:{value:t.sheetVisible,callback:function(i){t.sheetVisible=i},expression:"sheetVisible"}}),t._v(" "),s("transition",{attrs:{name:"slide"}},[s("router-view",{staticClass:"router-body"})],1)],1)},staticRenderFns:[]};var h=s("Z0/y")(p,l,!1,function(t){s("ulJE")},"data-v-3030004b",null);i.default=h.exports},ulJE:function(t,i){}});
//# sourceMappingURL=2.7f485021d8f7b70c0c52.js.map