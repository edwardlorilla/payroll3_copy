(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{329:function(a,e,t){"use strict";t.r(e);var s={computed:{can:function(){return this.$store.getters.CAN}},data:function(){return{navigation:[{name:"view-dashboard-user-present",label:"User Present",can:"read-employees"},{name:"view-dashboard-leave",label:"Leaves",can:"read-employees"},{name:"view-dashboard-event",label:"Events",can:"read-employees"}]}}},n=t(1),i=Object(n.a)(s,function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-header"},[t("ul",{staticClass:"nav nav-pills"},a._l(a.navigation,function(e){return!e.can||a.can[e.can]?t("li",{staticClass:"nav-item"},[t("router-link",{staticClass:"nav-link",class:a.$route.name===e.name?"active":"",attrs:{to:{name:e.name},exact:""}},[a._v(a._s(e.label))])],1):a._e()}),0)]),a._v(" "),t("div",{staticClass:"card-body"},[t("router-view")],1)])])])},[],!1,null,"3d4bd721",null);e.default=i.exports}}]);