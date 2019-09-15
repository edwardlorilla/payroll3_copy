<template>
    <header class="page-header" role="banner">
        <!-- we need this logo when users switches to nav-function-top -->
        <div class="page-logo">
            <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative"
               data-toggle="modal" data-target="#modal-shortcut">
                <img src="/img/favicon/favicon-32x32.png" alt="Payroll" aria-roledescription="logo">
                <span class="page-logo-text mr-1">Payroll</span>
                <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
            </a>
        </div>
        <!-- DOC: nav menu layout change shortcut -->
        <div class="hidden-md-down dropdown-icon-menu position-relative">
            <a href="#" class="header-btn btn js-waves-off" data-action="toggle" data-class="nav-function-hidden"
               title="Hide Navigation">
                <i class="ni ni-menu"></i>
            </a>
            <ul>
                <li>
                    <a href="#" class="btn js-waves-off" data-action="toggle" data-class="nav-function-minify"
                       title="Minify Navigation">
                        <i class="ni ni-minify-nav"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="btn js-waves-off" data-action="toggle" data-class="nav-function-fixed"
                       title="Lock Navigation">
                        <i class="ni ni-lock-nav"></i>
                    </a>
                </li>
            </ul>
        </div>
        <!-- DOC: mobile button appears during mobile width -->
        <div class="hidden-lg-up">
            <a href="#" class="header-btn btn press-scale-down" data-action="toggle" data-class="mobile-nav-on">
                <i class="ni ni-menu"></i>
            </a>
        </div>
        <div class="ml-auto d-flex">
            <!-- app settings -->
            <div class="hidden-md-down">
                <a href="#" class="header-icon" data-toggle="modal" data-target=".js-modal-settings">
                    <i class="fal fa-cog"></i>
                </a>
            </div>
            <!-- app users menu -->
            <div>
                <a href="#" data-toggle="dropdown" title="drlantern@gotbootstrap.com"
                   class="header-icon d-flex align-items-center justify-content-center ml-2">
                    <img style="height:32px; width: 32px;" :src="$store.getters.USER.image ?`/upload/100_${$store.getters.USER.image.url}` : '/img/demo/avatars/avatar-m.png'" class="profile-image rounded-circle"
                    :alt="$store.getters.USER.name ? $store.getters.USER.name : ''">
                    <!-- you can also add username next to the avatar with the codes below:
                    <span class="ml-1 mr-1 text-truncate text-truncate-header hidden-xs-down">Me</span>
                    <i class="ni ni-chevron-down hidden-xs-down"></i> -->
                </a>
                <div class="dropdown-menu dropdown-menu-animated dropdown-lg">
                    <div class="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
                        <div class="d-flex flex-row align-items-center mt-1 mb-1 color-white">
                                        <span class="mr-2">
                                            <img style="width: 32px;height: 32px;" :src="$store.getters.USER.image ?`/upload/100_${$store.getters.USER.image.url}` : '/img/demo/avatars/avatar-m.png'"
                                                 class="rounded-circle profile-image" :alt="$store.getters.USER.name ? $store.getters.USER.name : ''">
                                        </span>
                            <div class="info-card-text">
                                <div class="fs-lg text-truncate text-truncate-lg">{{$store.getters.USER.name ? $store.getters.USER.name : ''}}</div>
                                <span class="text-truncate text-truncate-md opacity-80">{{$store.getters.USER.email ? $store.getters.USER.email : ''}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-divider m-0"></div>
                    <a href="#" class="dropdown-item" data-action="app-reset">
                        <span data-i18n="drpdwn.reset_layout">Reset Layout</span>
                    </a>
                    <a href="#" class="dropdown-item" data-toggle="modal" data-target=".js-modal-settings">
                        <span data-i18n="drpdwn.settings">Settings</span>
                    </a>
                    <div class="dropdown-divider m-0"></div>
                    <a href="#" class="dropdown-item" data-action="app-fullscreen">
                        <span data-i18n="drpdwn.fullscreen">Fullscreen</span>
                        <i class="float-right text-muted fw-n">F11</i>
                    </a>
                    <a href="#" class="dropdown-item" data-action="app-print">
                        <span data-i18n="drpdwn.print">Print</span>
                        <i class="float-right text-muted fw-n">Ctrl + P</i>
                    </a>
                    <div class="dropdown-multilevel dropdown-multilevel-left">
                        <div class="dropdown-item">
                            Language
                        </div>
                        <div class="dropdown-menu">
                            <a href="#?lang=fr" class="dropdown-item" data-action="lang" data-lang="fr">Français</a>
                            <a href="#?lang=en" class="dropdown-item active" data-action="lang" data-lang="en">English
                                (US)</a>
                            <a href="#?lang=es" class="dropdown-item" data-action="lang" data-lang="es">Español</a>
                            <a href="#?lang=ru" class="dropdown-item" data-action="lang" data-lang="ru">Русский язык</a>
                            <a href="#?lang=jp" class="dropdown-item" data-action="lang" data-lang="jp">日本語</a>
                            <a href="#?lang=ch" class="dropdown-item" data-action="lang" data-lang="ch">中文</a>
                        </div>
                    </div>
                    <div class="dropdown-divider m-0"></div>
                    <a v-loading.fullscreen.lock="$store.state.loading" @click="handleLogout"
                       class="dropdown-item fw-500 pt-3 pb-3">
                        <span data-i18n="drpdwn.page-logout">Logout</span>
                        <span class="float-right fw-n">{{$store.getters.USER.name ? $store.getters.USER.name : ''}}</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        methods: {
            handleLogout() {
                var vm = this

                vm.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        vm.$store.dispatch('LOADING', true).then(function(){
                            axios.post('/logout').then(function (response) {
                            }).catch(function (error) {
                                window.location.href = window.location.href;
                            })

                        })

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {

                    }
                })
            }
        }
    }
</script>