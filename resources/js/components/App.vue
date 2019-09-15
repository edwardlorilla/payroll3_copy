<template>
    <div >
        <div class="page-wrapper">
            <div class="page-inner">
                <!-- BEGIN Left Aside -->
                <yum-aside/>
                <!-- END Left Aside -->
                <div class="page-content-wrapper">
                    <!-- BEGIN Page Header -->
                    <yum-header/>
                    <!-- END Page Header -->
                    <!-- BEGIN Page Content -->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <router-link tag="li"  class="breadcrumb-item" v-for="(breadcrumb, index) in $route.meta.breadcrumb" :key="index" :to="{name: breadcrumb.name}">{{breadcrumb.label}}</router-link>
                        </ol>
                        <!--<yum-subheader title=""/>-->

                        <router-view/>
                    </main>
                    <!-- this overlay is activated only when mobile menu is triggered -->
                    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div> <!-- END Page Content -->
                    <!-- BEGIN Page Footer -->
                    <page-footer/>
                    <shortcut/>
                </div>
            </div>
        </div>

        <quick-menu/>
        <page-setting/>
    </div>
</template>

<script>
    import yumAside from './page/aside'
    import yumHeader from './page/header'
    import pageSetting from './settings/page'
    import shortcut from './settings/shortcut'
    import quickMenu from './settings/quickMenu'
    import pageFooter from './settings/pageFooter'
    export default {
        components:{
            pageSetting,
            quickMenu,
            yumAside,
            shortcut,
            pageFooter,
            yumHeader
        }
    }
</script>
