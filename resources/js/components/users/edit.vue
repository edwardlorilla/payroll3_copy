<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <router-link :to="{name: 'update-users', params:{id : $route.params.id}}" class="nav-link">{{`${$route.params.id ? 'Edit' : 'Create'}`}} User</router-link>
                            </li>
                            <li v-if="$route.params.id" class="nav-item">
                                <router-link :to="{name: 'view-attendance', params:{id : $route.params.id}}" class="nav-link">Attendance</router-link>
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
        data() {
            return {

            }
        },
    }
</script>