(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{320:function(e,t,r){"use strict";r.r(t);var a={data:function(){return{options:[{label:"Regular Holiday",value:"0"},{label:"Special Holiday",value:"1"}],url:"",form:{memo:"",start_date:"",end_date:"",occurrence:""},errors:{},loading:!1,disabled:!1}},beforeRouteEnter:function(e,t,r){e.params.id?axios.get("/api/events/".concat(e.params.id)).then(function(e){r(function(t){return t.setData(e.data)})}).catch(function(e){e.response.statusText&&r(function(t){return t.$swal(e.response.data.statusText,e.response.data.message,"error")}),401===e.response.status&&(window.location.href=window.location.href)}):r()},beforeRouteUpdate:function(e,t,r){var a=this;e.params.id?(a.errors={},axios.get("/api/events/".concat(e.params.id)).then(function(e){a.setData(e.data),r()}).catch(function(e){e.response.statusText&&r(function(t){return t.$swal(e.response.data.statusText,e.response.data.message,"error")}),401===e.response.status&&(window.location.href=window.location.href)})):r()},methods:{setData:function(e){this.form=e,""==this.form.occurrence&&(this.form.occurrence="0")},onCancel:function(){this.$router.push({name:"view-event"})},onSubmit:function(){var e=this;this.$refs.form.validate(function(t){if(t){e.disabled=!0,e.errors={};var r=e.$route.params.id;axios[r?"put":"post"]("/api/events".concat(r?"/".concat(r):""),e.form).then(function(){e.disabled=!1,e.errors={},e.$swal("Event has been ".concat(r?"edited":"created"),"","success")}).catch(function(t){e.disabled=!1,t.response.data.errors&&t.response.data.message&&(e.errors=t.response.data.errors,e.$swal(t.response.data.statusText,t.response.data.message,"error"))})}})}}},o=r(1),s=Object(o.a)(a,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-card",{attrs:{shadow:"never"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[e._v(e._s(e.$route.params.id?"Edit":"Create")+" Event")])]),e._v(" "),r("el-form",{ref:"form",attrs:{model:e.form},nativeOn:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("el-form-item",{attrs:{prop:"memo",label:"Memo"}},[r("el-input",{staticStyle:{width:"100%"},model:{value:e.form.memo,callback:function(t){e.$set(e.form,"memo",t)},expression:"form.memo"}}),e._v(" "),e._l(e.errors.memo,function(t){return e.errors.memo?r("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(t)+"\n                        ")]):e._e()})],2),e._v(" "),r("el-form-item",{attrs:{prop:"start_date",label:"Start Date"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a day"},model:{value:e.form.start_date,callback:function(t){e.$set(e.form,"start_date",t)},expression:"form.start_date"}}),e._v(" "),e._l(e.errors.start_date,function(t){return e.errors.start_date?r("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(t)+"\n                        ")]):e._e()})],2),e._v(" "),r("el-form-item",{attrs:{prop:"end_date",label:"End Date"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a day"},model:{value:e.form.end_date,callback:function(t){e.$set(e.form,"end_date",t)},expression:"form.end_date"}}),e._v(" "),e._l(e.errors.end_date,function(t){return e.errors.end_date?r("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(t)+"\n                        ")]):e._e()})],2),e._v(" "),r("el-form-item",{attrs:{prop:"type",label:"Type"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Select"},model:{value:e.form.occurrence,callback:function(t){e.$set(e.form,"occurrence",t)},expression:"form.occurrence"}},e._l(e.options,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),e._l(e.errors.occurrence,function(t){return e.errors.occurrence?r("div",{staticClass:"el-form-item__error"},[e._v("\n                            "+e._s(t)+"\n                        ")]):e._e()})],2),e._v(" "),r("el-form-item",[r("el-button",{attrs:{disabled:e.disabled,type:"primary"},on:{click:function(t){return e.onSubmit("form")}}},[e._v(e._s(e.$route.params.id?"Edit":"Create")+" Event\n                        ")]),e._v(" "),r("el-button",{on:{click:e.onCancel}},[e._v("Cancel")])],1)],1)],1)],1)],1)],1)},[],!1,null,null,null);t.default=s.exports}}]);