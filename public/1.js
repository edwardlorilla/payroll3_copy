(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{109:function(e,r,t){"use strict";r.a={data:function(){return{users:[],params:"",errors:{}}},methods:{search_user:function(e){var r=this;""!==e?(r.loading=!0,r.onSearchUser(e,r)):(r.loading=!1,r.users=[])},onSearchUser:_.debounce(function(e,r){axios.get("/api/users/search?search="+e).then(function(e){r.loading=!1,r.users=e.data.data.map(function(e){return{value:e.id,label:e.name}})}).catch(function(e){r.loading=!1,e.data&&e.response.data&&e.response.data.errors&&e.response.data.message&&(r.errors=e.response.data.errors,r.$swal(e.response.data.statusText,e.response.data.message,"error"))})},350)}}},318:function(e,r,t){"use strict";t.r(r);var s={mixins:[t(109).a],data:function(){return{url:"",form:{type:"0",user_id:"",date_issued:"",date_due_for_return:""},errors:{},loading:!1,disabled:!1}},beforeRouteEnter:function(e,r,t){e.params.id?axios.get("/api/holidays/".concat(e.params.id)).then(function(e){t(function(r){return r.setData(e.data)})}).catch(function(e){e.response.statusText&&t(function(r){return r.$swal(e.response.data.statusText,e.response.data.message,"error")}),401===e.response.status&&(window.location.href=window.location.href)}):t()},beforeRouteUpdate:function(e,r,t){var s=this;e.params.id?(s.errors={},axios.get("/api/holidays/".concat(e.params.id)).then(function(e){s.setData(e.data),t()}).catch(function(e){e.response.statusText&&t(function(r){return r.$swal(e.response.data.statusText,e.response.data.message,"error")}),401===e.response.status&&(window.location.href=window.location.href)})):t()},methods:{setData:function(e){console.log(e);this.users=[],this.users=[{value:e.user.id,label:e.user.name}],this.form=e,this.form.user_id=e.user.id},onCancel:function(){this.$router.push({name:"view-leave"})},onSubmit:function(){var e=this;this.$refs.form.validate(function(r){if(r){e.disabled=!0,e.errors={};var t=e.$route.params.id;axios[t?"put":"post"]("/api/holidays".concat(t?"/".concat(t):""),e.form).then(function(){e.disabled=!1,e.errors={},e.$swal("".concat(e.$route.params.id?"Update":"Created"," successfully!"),"","success")}).catch(function(r){e.disabled=!1,r.response.data.errors&&r.response.data.message&&(e.errors=r.response.data.errors,e.$swal(r.response.data.statusText,r.response.data.message,"error"))})}})}}},a=t(1),o=Object(a.a)(s,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("el-row",[t("el-col",{attrs:{span:24}},[t("el-card",{attrs:{shadow:"never"}},[t("div",{attrs:{slot:"header"},slot:"header"},[t("span",[e._v(e._s(e.$route.params.id?"Edit":"Create")+" Employee Leave")])]),e._v(" "),t("el-form",{ref:"form",attrs:{model:e.form},nativeOn:{submit:function(r){return r.preventDefault(),e.onSubmit(r)}}},[t("el-form-item",{attrs:{prop:"user_id",label:"User"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"Please enter a keyword","remote-method":e.search_user,loading:e.loading},model:{value:e.form.user_id,callback:function(r){e.$set(e.form,"user_id",r)},expression:"form.user_id"}},e._l(e.users,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),e._l(e.errors.user_id,function(r){return e.errors.user_id?t("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(r)+"\n                        ")]):e._e()})],2),e._v(" "),t("el-form-item",{attrs:{prop:"date_issued",label:"Date Issued"}},[t("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a day"},model:{value:e.form.date_issued,callback:function(r){e.$set(e.form,"date_issued",r)},expression:"form.date_issued"}}),e._v(" "),e._l(e.errors.date_issued,function(r){return e.errors.date_issued?t("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(r)+"\n                        ")]):e._e()})],2),e._v(" "),t("el-form-item",{attrs:{prop:"date_due_for_return",label:"Date due for return"}},[t("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a day"},model:{value:e.form.date_due_for_return,callback:function(r){e.$set(e.form,"date_due_for_return",r)},expression:"form.date_due_for_return"}}),e._v(" "),e._l(e.errors.date_due_for_return,function(r){return e.errors.date_due_for_return?t("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(r)+"\n                        ")]):e._e()})],2),e._v(" "),t("el-form-item",{attrs:{prop:"type",label:"Type"}},[t("el-select",{staticStyle:{width:"100%"},model:{value:e.form.type,callback:function(r){e.$set(e.form,"type",r)},expression:"form.type"}},[t("el-option",{attrs:{label:"LEAVE WITH PAY",value:"0"}})],1),e._v(" "),e._l(e.errors.type,function(r){return e.errors.type?t("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(r)+"\n                        ")]):e._e()})],2),e._v(" "),t("el-form-item",[t("el-button",{attrs:{disabled:e.disabled,type:"primary"},on:{click:function(r){return e.onSubmit("form")}}},[e._v(e._s(e.$route.params.id?"Edit":"Create")+" Employee Leave\n                        ")]),e._v(" "),t("el-button",{on:{click:e.onCancel}},[e._v("Cancel")])],1)],1)],1)],1)],1)],1)},[],!1,null,null,null);r.default=o.exports}}]);