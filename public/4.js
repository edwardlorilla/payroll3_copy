(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Dashboard.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Table_leaveGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Table/leaveGrid */ "./resources/js/components/Table/leaveGrid.vue");
/* harmony import */ var _components_mixins_catchError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/mixins/catchError */ "./resources/js/components/mixins/catchError.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    leave: _Table_leaveGrid__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      pagerCount: 5,
      leaves: [],
      current_page: null,
      per_page: null,
      total: null,
      loading: false
    };
  },
  computed: {
    handleBorrow: function handleBorrow() {
      return !_.isEmpty(this.leaves);
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get("/api/holidays", {
      params: to.query
    }).then(function (response) {
      next(function (vm) {
        return vm.setData(response.data);
      });
    })["catch"](function (error) {
      if (error.response.statusText) {
        next(function (vm) {
          return Object(_components_mixins_catchError__WEBPACK_IMPORTED_MODULE_1__["default"])(vm, error);
        });
      }
    });
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var vm = this;
    axios.get("/api/holidays", {
      params: to.query
    }).then(function (response) {
      vm.setData(response.data);
      next();
    })["catch"](function (error) {
      if (error.response.statusText) {
        next(function (vm) {
          return Object(_components_mixins_catchError__WEBPACK_IMPORTED_MODULE_1__["default"])(vm, error);
        });
      }
    });
  },
  methods: {
    setData: function setData(response) {
      var vm = this;
      vm.leaves = response.data;
      vm.total = response.total;
      vm.current_page = response.current_page;
      vm.per_page = response.per_page;
    },
    handleSortChange: function handleSortChange(val) {
      var vm = this;

      var option = _.clone(vm.$route.query);

      option.column = val.prop;
      option.direction = val.order == 'ascending' ? 'asc' : 'desc';
      vm.onRouteChange(option);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var vm = this;

      var option = _.clone(vm.$route.query);

      option.page = val;
      vm.onRouteChange(option);
    },
    onRouteChange: function onRouteChange(option) {
      var vm = this;
      vm.loading = true;
      vm.$router.push({
        path: "".concat(vm.$route.path),
        query: option
      }, function () {
        vm.loading = false;
      }, function () {
        vm.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['leave'],
  data: function data() {
    return {
      countDownDate: new Date(this.leave.date_due_for_return).getTime(),
      startDateNow: new Date(this.leave.date_issued).getTime(),
      date: '',
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      distance: 0
    };
  },
  computed: {
    dateTime: function dateTime() {
      var vm = this;

      if (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) {
        vm.distance = vm.countDownDate - vm.$root.now;
        vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
        vm.hours = Math.floor(vm.distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        vm.minutes = Math.floor(vm.distance % (1000 * 60 * 60) / (1000 * 60));
        vm.seconds = Math.floor(vm.distance % (1000 * 60) / 1000);
      } else if (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) {
        vm.distance = vm.countDownDate - vm.$root.now;
        vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
        vm.hours = Math.floor(vm.distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        vm.minutes = Math.floor(vm.distance % (1000 * 60 * 60) / (1000 * 60));
        vm.seconds = Math.floor(vm.distance % (1000 * 60) / 1000);
      }

      return vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now ? {
        status: 'Starting',
        date: "".concat(vm.days, "d ").concat(vm.hours, "h ").concat(vm.minutes, "m ").concat(vm.seconds, "s")
      } : vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now ? {
        status: 'Pending',
        date: "".concat(vm.days, "d ").concat(vm.hours, "h ").concat(vm.minutes, "m ").concat(vm.seconds, "s")
      } : {
        status: 'Due Date',
        date: ""
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.handleBorrow
      ? _c(
          "div",
          { staticClass: "card-deck" },
          _vm._l(_vm.leaves, function(leave) {
            return _c("leave", { key: leave.id, attrs: { leave: leave } })
          }),
          1
        )
      : _c("span", [_vm._v("No Result")]),
    _vm._v(" "),
    _vm.leaves.length > 0
      ? _c(
          "div",
          { staticClass: "card-footer", staticStyle: { "margin-top": "12px" } },
          [
            _c("el-pagination", {
              attrs: {
                "current-page": _vm.current_page,
                "pager-count": _vm.pagerCount,
                "page-size": _vm.per_page,
                layout: "prev, pager, next",
                total: _vm.total
              },
              on: { "current-change": _vm.handleCurrentChange }
            })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "card",
        class:
          _vm.dateTime.status === "Starting"
            ? "border-success"
            : _vm.dateTime.status === "Pending"
            ? "border-primary"
            : "border-danger"
      },
      [
        _c("div", { staticClass: "card-header" }, [
          _c("h5", { staticClass: "card-title" }, [
            _vm._v(_vm._s("" + (_vm.leave.user ? _vm.leave.user.name : "")))
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "card-text" }, [
            _c("div", [
              _vm._v(
                "\n            Start at: " +
                  _vm._s(
                    "" +
                      _vm.$root
                        .moment(_vm.leave.date_issued)
                        .format("YYYY-MM-DD hh:mm:ss a")
                  ) +
                  "\n        "
              )
            ]),
            _vm._v(" "),
            _c("div", [
              _vm._v(
                "\n            End at: " +
                  _vm._s(
                    "" +
                      _vm.$root
                        .moment(_vm.leave.date_due_for_return)
                        .format("YYYY-MM-DD hh:mm:ss a")
                  ) +
                  "\n        "
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-footer" }, [
          _c(
            "span",
            {
              staticClass: "badge",
              class:
                _vm.dateTime.status === "Starting"
                  ? "badge-success"
                  : _vm.dateTime.status === "Pending"
                  ? "badge-primary"
                  : "badge-danger"
            },
            [_vm._v(_vm._s(_vm.dateTime.status))]
          ),
          _vm._v(" "),
          _c("small", { staticClass: "text-muted" }, [
            _vm._v(_vm._s(_vm.dateTime.date))
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Dashboard.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/Dashboard.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=040e2ab9& */ "./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/components/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Dashboard.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/Dashboard.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=040e2ab9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Dashboard.vue?vue&type=template&id=040e2ab9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_040e2ab9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Table/leaveGrid.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Table/leaveGrid.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leaveGrid.vue?vue&type=template&id=d711dffe& */ "./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe&");
/* harmony import */ var _leaveGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaveGrid.vue?vue&type=script&lang=js& */ "./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _leaveGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Table/leaveGrid.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_leaveGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./leaveGrid.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/leaveGrid.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_leaveGrid_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./leaveGrid.vue?vue&type=template&id=d711dffe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Table/leaveGrid.vue?vue&type=template&id=d711dffe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_leaveGrid_vue_vue_type_template_id_d711dffe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/mixins/catchError.js":
/*!******************************************************!*\
  !*** ./resources/js/components/mixins/catchError.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (vm, error) {
  if (error.response.status === 401) {
    window.location.href = window.location.href;
  } else if (error.response.status === 404) {
    vm.$router.push({
      name: 'not_found'
    });
  } else {
    vm.$swal(error.response.data.statusText, error.response.data.message, 'error');
  }
});

/***/ })

}]);