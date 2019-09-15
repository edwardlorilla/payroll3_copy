<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-pills">
                        <li v-for="link in navigation" v-if="link.can ? can[link.can] : true" class="nav-item">
                            <router-link :class="$route.name === link.name ? 'active' : ''" :to="{name: link.name}" class="nav-link" exact>{{link.label}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            can() {
                return this.$store.getters.CAN
            }
        },
        data(){
            return{
                navigation: [
                    {
                        name: 'view-dashboard-user-present',
                        label: 'User Present',
                        can: 'read-employees'
                    },{
                        name: 'view-dashboard-leave',
                        label: 'Leaves',
                        can: 'read-employees'
                    },{
                        name: 'view-dashboard-event',
                        label: 'Events',
                        can: 'read-employees'
                    },
                ]

            }
        }
    }
</script>

<style scoped>

</style>