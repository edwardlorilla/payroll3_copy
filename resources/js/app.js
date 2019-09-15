/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment'
Vue.use(VueSweetalert2);
Vue.use(ElementUI, {locale})
Vue.use(VueRouter)
Vue.use(Vuex)

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

function hasPermission(roles, route) {
    let permissions = []
    if (roles) {
        Object.entries(roles).forEach(entry => {
            if (entry[1]) {
                permissions.push(entry[0])
            }
        })
    }
    if (route.meta && route.meta.roles) {
        return permissions.some(role => route.meta.roles.indexOf(role) >= 0)
    }
    else if (route.meta && route.meta.can) {
        return permissions.some(can => route.meta.can.indexOf(can) >= 0)
    } else {
        return true
    }
}

function filterAsyncRouter(asyncRouterMap, roles, can) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, can)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

$(window).on('load', function () {
    axios.get('/api/user').then(response => {

        const constantRoute = [
            {
                path: '/',
                component: resolve => require(["./components/view"], resolve),
                children:[
                    {
                        path: '',
                        name: 'view-dashboard-user-present',
                        component: resolve => require(["./components/dashboard/UserPresent"], resolve),
                        meta: {
                            can: ['read-employees'],
                        },

                    },{
                        path: 'dashboard/leaves',
                        name: 'view-dashboard-leave',
                        component: resolve => require(["./components/Dashboard"], resolve),
                        meta: {
                            can: ['read-employees'],
                        },

                    },{
                        path: 'dashboard/events',
                        name: 'view-dashboard-event',
                        component: resolve => require(["./components/Event"], resolve),
                        meta: {
                            can: ['read-employees'],
                        },

                    },
                ]
            },
            {
                path: "/profile",
                component: resolve => {
                    require.ensure(["./components/Profile/Profile.vue"], () => {
                        resolve(require("./components/Profile/Profile.vue"))
                    })
                },
                name: "profile.index",
                meta: {title: 'Profile'},
                children: [
                    {
                        path: "edit/:id",
                        component: resolve => {
                            require.ensure(["./components/Profile/Edit.vue"], () => {
                                resolve(require("./components/Profile/Edit.vue"))
                            })
                        },
                        name: "profile.edit",
                    },
                    {
                        path: "change-password/:id",
                        component: resolve => {
                            require.ensure(["./components/Profile/ChangePassword.vue"], () => {
                                resolve(require("./components/Profile/ChangePassword.vue"))
                            })
                        },
                        name: "change.password"
                    },
                    {
                        path: "settings",
                        component: resolve => {
                            require.ensure(["./components/Profile/Setting.vue"], () => {
                                resolve(require("./components/Profile/Setting.vue"))
                            })
                        },
                        name: "setting.index"
                    }
                ]
            },
            {
                path: '*',
                name: 'not_found',
                component: resolve => require(["./components/Error/404.vue"], resolve),
            }
        ];
        const asyncRoute = [
            {
                path: '/users',
                meta: {
                    roles: ['superadministrator']
                },
                component: resolve => require(["./components/users/index.vue"], resolve),
                children: [
                    {
                        path: '',
                        name: 'view-users',
                        component: resolve => require(["./components/users/view.vue"], resolve),
                        meta: {
                            can: ['read-employees'],
                            breadcrumb: [
                                {name: 'view-users', label: 'View User'}
                            ]
                        }
                    },
                    {
                        path: 'create',
                        name: 'create-users',
                        component: resolve => require(["./components/users/create.vue"], resolve),
                        meta: {can: ['create-employees'], breadcrumb: [{name: 'view-users', label: 'User'}, {name: 'create-users', label: 'Create'} ]}
                    },
                    {
                        path: 'edit/:id',

                        component: resolve => require(["./components/users/edit.vue"], resolve),
                        meta: {can: ['update-employees'],  breadcrumb: [{name: 'view-users', label: 'User'}, {name: 'update-users', label: 'Update'} ]},
                        children:[
                            { name: 'update-users', path: '', component: resolve => require(["./components/users/create.vue"], resolve)},
                            { name: 'view-attendance', path: 'attendance', component: resolve => require(["./components/users/attendance.vue"], resolve)}

                        ]
                    },
                ]
            },
            {
                path: '/attendances',
                meta: {
                    roles: ['superadministrator']
                },
                component: resolve => require(["./components/attendance/index.vue"], resolve),
                children: [
                    {
                        path: '',
                        name: 'view-attendances',
                        component: resolve => require(["./components/attendance/view.vue"], resolve),
                        meta: {
                            can: ['read-employees'],
                            breadcrumb: [
                                {name: 'view-attendances', label: 'View Attendances'}
                            ]
                        }
                    }
                ]
            },{
                path: '/payrolls',
                meta: {
                    roles: ['superadministrator']
                },
                component: resolve => require(["./components/payroll/index.vue"], resolve),
                children: [
                    {
                        path: '',
                        name: 'view-payrolls',
                        component: resolve => require(["./components/payroll/create.vue"], resolve),
                        meta: {
                            can: ['read-employees'],
                            breadcrumb: [
                                {name: 'view-payrolls', label: 'View Payrolls'}
                            ]
                        }
                    }
                ]
            },{
                path: '/events',
                meta: {
                    roles: ['superadministrator']
                },
                component: resolve => require(["./components/event/index.vue"], resolve),
                children: [
                    {
                        path: '',
                        name: 'view-event',
                        component: resolve => require(["./components/event/view.vue"], resolve),
                        meta: {
                            can: ['read-employees'],
                            breadcrumb: [
                                {name: 'view-event', label: 'View Event'}
                            ]
                        }
                    },
                    {
                        path: 'create',
                        name: 'create-event',
                        meta: {
                            can: ['create-employees'],
                            breadcrumb:
                                [
                                    {name: 'view-event', label: 'View Event'},
                                    {name: 'create-event', label: 'Add Event'}
                                ]
                        },
                        component: resolve => require(["./components/event/create.vue"], resolve),
                    },
                    {
                        path: 'edit/:id',
                        name: 'edit-event',
                        meta: {
                            can: ['update-employees'],
                            breadcrumb:
                                [
                                    {name: 'view-event', label: 'View Event'},
                                    {name: 'edit-event', label: 'Edit Event'}
                                ]},
                        component: resolve => require(["./components/event/create.vue"], resolve),
                    },
                ]
            },
            {
                path: '/leave',
                meta: {
                    roles: ['superadministrator']
                },
                component: resolve => require(["./components/leave/index.vue"], resolve),
                children: [
                    {
                        path: '',
                        name: 'view-leave',
                        meta:{
                            can: ['read-employees'],
                            breadcrumb: [
                                {name: 'view-leave', label: 'View Leaves'}
                            ]
                        },
                        component: resolve => require(["./components/leave/view.vue"], resolve),
                    },
                    {
                        path: 'create',
                        name: 'create-leave',
                        meta: {
                            can: ['create-employees'],
                            breadcrumb:
                                [
                                    {name: 'view-leave', label: 'View Leave'},
                                    {name: 'create-leave', label: 'Add Leave'}
                                ]
                        },
                        component: resolve => require(["./components/leave/create.vue"], resolve),
                    },
                    {
                        path: 'edit/:id',
                        name: 'edit-leave',
                        meta: {
                            can: ['update-employees'],
                            breadcrumb:
                                [
                                    {name: 'view-leave', label: 'View Leave'},
                                    {name: 'edit-leave', label: 'Edit Leave'}
                        ]},
                        component: resolve => require(["./components/leave/create.vue"], resolve),
                    },
                ]
            }
        ];
        const store = new Vuex.Store({
            state: {
                loading: false,
                validate: {
                    required: [
                        {required: true}
                    ]
                },
                addRouters: [],
                routers: constantRoute,
                setting: response.data.setting,
                user: response.data.user || {},
            },
            mutations: {
                loading(state, data) {
                    state.loading = data
                },
                set_router: (state, routers) => {
                    state.addRouters = routers
                    state.routers = constantRoute.concat(routers)
                },
                onChangeImage(state, data){
                    state.user.image = data
                },
                settingChange(state, data){
                    state.setting = data
                }
            },
            actions: {
                LOADING(context, argument) {
                    return new Promise(resolve => {
                        context.commit('loading', argument)
                        resolve()
                    })
                },
                onChangeImage(context, argument){
                    context.commit('onChangeImage', argument);
                },
                settingChange(context, argument){
                    context.commit('settingChange', argument);
                },
                GenerateRoutes(context, data) {
                    return new Promise(resolve => {
                        let permissions = []
                        if (data.roles) {
                            Object.entries(data.roles).forEach(entry => {
                                if (entry[1]) {
                                    permissions.push(entry[0])
                                }
                            })
                        }

                        const roles = permissions
                        let accessedRouters
                        accessedRouters = filterAsyncRouter(asyncRoute, response.data.user.roles, response.data.user.can)
                        context.commit('set_router', accessedRouters)
                        resolve()
                    })
                }
            },
            getters: {
                USER(state){
                    return state.user
                },
                SETTING(state){
                    return state.setting
                },
                EMPLOYEE_PAY(state){
                  return state.user.employee_pay
                },
                ROLES(state) {
                    return state.user.roles
                },
                CAN(state) {
                    return state.user.can
                },
                ROUTER(state) {
                    return state.routers
                }
            }
        })


        const router = new VueRouter({
            base: 'home',
            mode: 'history',
            linkExactActiveClass: 'active',
            routes: constantRoute
        });
        store.dispatch('GenerateRoutes', {roles: store.getters.ROLES}).then(() => {
            router.addRoutes(filterAsyncRouter(asyncRoute, store.getters.ROLES, store.getters.CAN))
        }).then(() => {
            new Vue({
                data(){
                  return{
                      now: 0,
                      moment
                  }
                },
                mounted(){

                    var vm = this
                    var x = setInterval(function () {
                        vm.now = new Date().getTime()
                    }, 1000);
                },
                router,
                store,
                render: h => h(require('./components/App.vue').default)
            }).$mount('#app')
        })
    })
        .catch(function (error) {
            window.location.href = window.location.href;
        })
});