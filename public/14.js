(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{328:function(t,e,a){"use strict";a.r(e);a(4);var s={name:"attendance",data:function(){var t=new Date,e=t.getMonth(),a=t.getYear();return{month:e,year:a,no_of_days:new Date(a,e+1,0),user:{attendances:[]},monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"]}},mounted:function(){this.no_of_days.getDate()},computed:{days:function(){for(var t=this,e=0,a={};e<t.no_of_days.getDate();)a[e+1]=!1,e++;if(e=0,t.user.attendances&&t.user.attendances.length)for(;e<t.user.attendances.length;){var s=new Date(t.user.attendances[e].started_at.split(" ")[0]).addDays(1);s.getDate()&&(a[s.getDate()]=!0),e++}return t.user?a:{}}},beforeRouteEnter:function(t,e,a){t.params.id&&axios.get("/api/user/".concat(t.params.id,"/attendances")).then(function(t){a(function(e){return e.setData(t.data)})}).catch(function(t){t.response.statusText&&a(function(e){return e.$swal(t.response.data.statusText,t.response.data.message,"error")}),401===t.response.status&&(window.location.href=window.location.href)})},beforeRouteUpdate:function(t,e,a){var s=this;t.params.id&&axios.get("/api/user/".concat(t.params.id,"/attendances")).then(function(t){s.setData(t.data),a()}).catch(function(t){t.response.statusText&&a(function(e){return e.$swal(t.response.data.statusText,t.response.data.message,"error")}),401===t.response.status&&(window.location.href=window.location.href)})},methods:{setData:function(t){this.user=t},getSummaries:function(t){var e=t.columns,a=t.data,s=[];return e.forEach(function(t,e){2===e&&(s[e]=new Date(a.reduce(function(t,e){var a=Number();return isNaN(a)?t:t+1e3*e.timing},0)).toISOString().substr(11,8)+" Hour(s)")}),s}}},n=a(1),r=Object(n.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v("\n                    "+t._s(t.monthNames[t.month])+"\n            ")]),t._v(" "),a("div",{staticClass:"card-body"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.user.attendances,stripe:"","summary-method":t.getSummaries,"show-summary":""}},[a("el-table-column",{attrs:{prop:"started_at",label:"Started At"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stopped_at",label:"Stopped At"}}),t._v(" "),a("el-table-column",{attrs:{prop:"timing",label:"As Hour"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(new Date(1e3*e.row.timing).toISOString().substr(11,8))+"\n                        ")]}}])})],1)],1)])])])},[],!1,null,null,null);e.default=r.exports},4:function(t,e,a){"use strict";e.a=function(t,e){401===e.response.status?window.location.href=window.location.href:404===e.response.status?t.$router.push({name:"not_found"}):t.$swal(e.response.data.statusText,e.response.data.message,"error")}}}]);