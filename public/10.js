(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{319:function(e,t,a){"use strict";a.r(t);var n=a(32),o=a(4),r={data:function(){return{columns:[{label:"Name",prop:"name",sort:!0},{label:"Email",prop:"email",sort:!0}],data:[]}},components:{GridView:n.a},beforeRouteEnter:function(e,t,a){axios.get("/api/users",{params:e.query}).then(function(e){a(function(t){return t.setData(e.data)})}).catch(function(e){e.response.statusText&&a(function(t){return Object(o.a)(t,e)})})},beforeRouteUpdate:function(e,t,a){var n=this;axios.get("/api/users",{params:e.query}).then(function(e){n.setData(e.data),a()}).catch(function(e){e.response.statusText&&a(function(t){return Object(o.a)(t,e)})})},methods:{setData:function(e){this.data=e}}},s=a(1),i=Object(s.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("grid-view",{attrs:{columns:e.columns,data:e.data,"create-name":"Add User",header:"Users","can-delete":"delete-employees","can-update":"update-employees","on-delete":"/api/users","on-edit-name":"update-users","on-create-name":"create-users"},on:{delete:function(t){return e.data.data.splice(t,1)}}})],1)},[],!1,null,null,null);t.default=i.exports},32:function(e,t,a){"use strict";var n={props:{header:{type:String,default:""},canDelete:String,canUpdate:String,createName:String,onCreateName:String,onEditName:{type:String,required:!0},onDelete:{type:String,required:!0},data:{},columns:Array,showEdit:{default:!0,type:Boolean},showCreate:{default:!0,type:Boolean},showDelete:{default:!0,type:Boolean}},computed:{can:function(){return this.$store.getters.CAN}},data:function(){return{search:this.$route.query.search?this.$route.query.search:"",loading:!1}},methods:{handleSortChange:function(e){var t=_.clone(this.$route.query);t.column=e.prop,t.direction="ascending"==e.order?"asc":"desc",this.onRouteChange(t)},handleCurrentChange:function(e){var t=_.clone(this.$route.query);t.page=e,this.onRouteChange(t)},onRouteChange:function(e){var t=this;t.loading=!0,t.$router.push({path:"".concat(t.$route.path),query:e},function(){t.loading=!1},function(){t.loading=!1})},search_:function(){this.onSearch(this.search,this)},onSearch:_.debounce(function(e,t){(t=this).loading=!0,t.$router.push({path:"".concat(t.$route.path),query:{search:e}},function(){t.loading=!1},function(){t.loading=!1})},500),handleEdit:function(e,t){this.$router.push({name:this.onEditName,params:{id:t.id}})},handleDelete:function(e,t){var a=this;a.loading=!0,a.$swal({title:"Are you sure?",text:"This will permanently delete the file. Continue?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes!",cancelButtonText:"No, cancel!",reverseButtons:!0}).then(function(n){n.value&&(axios.post("".concat(a.onDelete?a.onDelete:"/api/agencies","/").concat(t.id)),a.$emit("delete",e),a.$swal("","Delete completed","success")),a.loading=!1}).catch(function(){a.$swal("","Delete canceled","info"),a.loading=!1})}}},o=a(1),r=Object(o.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("div",{staticClass:"clearfix"},[e.onCreateName&&e.showCreate?a("div",{staticClass:"float-sm-left",staticStyle:{"margin-bottom":"9px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.$router.push({name:e.onCreateName})}}},[e._v(e._s(e.createName))])],1):e._e(),e._v(" "),a("div",{staticClass:"float-sm-right"},[a("el-input",{attrs:{size:"mini",placeholder:"Type to search"},on:{input:e.search_},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)])]),e._v(" "),a("div",{staticClass:"card-body"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.data.data},on:{"sort-change":e.handleSortChange}},[e._t("default"),e._v(" "),e._l(e.columns,function(e,t,n){return a("el-table-column",{key:t+"-"+n+"-"+e.prop+"-"+e.label,attrs:{sortable:!!e.sort,label:e.label,prop:e.prop}})}),e._v(" "),(e.can[e.canUpdate]||e.can[e.canDelete])&&(e.showEdit||e.showDelete)?a("el-table-column",{attrs:{align:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"btn-group btn-group-sm"},[(e.showEdit||e.can[e.canUpdate])&&e.can[e.canUpdate]?a("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("Edit")]):e._e(),e._v(" "),(e.showDelete||e.can[e.canDelete])&&e.can[e.canDelete]?a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("Delete")]):e._e()])]}}],null,!1,3115393268)}):e._e()],2),e._v(" "),a("el-pagination",{attrs:{"current-page":e.data.current_page,"page-size":e.data.per_page,layout:"total, prev, pager, next, jumper",total:e.data.total},on:{"current-change":e.handleCurrentChange}})],1)])},[],!1,null,null,null);t.a=r.exports},4:function(e,t,a){"use strict";t.a=function(e,t){401===t.response.status?window.location.href=window.location.href:404===t.response.status?e.$router.push({name:"not_found"}):e.$swal(t.response.data.statusText,t.response.data.message,"error")}}}]);