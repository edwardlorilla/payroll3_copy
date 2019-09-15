<template>
    <div class="row">
        <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                    <div class="text-center">
                        <img  style="width: 100px;height: 100px;" class="rounded-circle profile-image"
                              :src="user_$.image ?  `/upload/100_${user_$.image.url}` : '/img/demo/avatars/avatar-m.png'"
                             alt="avatar">


                    </div>
                    <p class="text-center">
                        <upload-button api="/api/uploads" title="Upload"/>
                    </p>
                    <h3 class="profile-username text-center">{{user_$.name}}</h3>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">About Me</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <strong><i class="fa fa-book mr-1"></i> Email</strong>

                    <p class="text-muted">
                        {{user_$.email}}
                    </p>

                    <hr>

                    <strong><i class="fa fa-map-marker mr-1"></i> Location</strong>

                    <p class="text-muted">{{user_$.address}}</p>

                    <hr>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
        <!-- /.col -->
        <div class="col-md-9">
            <div class="card">
                <div class="card-header p-2">
                    <ul class="nav nav-pills">
                        <li v-for="(route, index) in filterRoute"
                            :key="index" class="nav-item">
                            <router-link class="nav-link"
                                         :to="{name: route.to, params: {id: $store.getters.USER.id}} ">{{route.name}}
                            </router-link>
                        </li>
                    </ul>
                </div><!-- /.card-header -->
                <div class="card-body">
                    <div>
                        <router-view/>
                    </div>

                </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
    </div>
</template>

<script>
    import UploadButton from './../UploadFile/UploadButton.vue'
    export default{
        components: {
            UploadButton
        },
        data(){
            return {
                dataToggle: 'edit'
            }
        },

        computed: {
                filterRoute(){
                    var vm = this,
                        routes = [
                            {
                                to: "profile.edit",
                                name: 'Profile',
                                roles: ['superadministrator', 'administrator', 'doctor', 'customer']
                            },{
                                to: "setting.index",
                                name: 'Application Settings',
                                roles: ['superadministrator']
                            },{
                                to: "change.password",
                                name: 'Change Password',
                                roles: ['superadministrator', 'administrator', 'doctor', 'customer']
                            },
                        ],
                        selectedFilter = _.map(routes, function (select) {


                            var result  =[], roles = vm.$store.getters.ROLES

                            Object.keys(roles).map(function(key) {
                                if(roles[key]){
                                    return  result.push(key);
                                }


                            });

                            console.log(result)
                            var filter = _.filter(select.roles, function (role) {

                                return result.indexOf(role) !== -1
                            })
                            return !_.isEmpty(filter) ? select : null
                        });
                    return _.compact(selectedFilter)
                }
            ,
            user_$(){
                return this.$store.getters.USER
            }
        },
    }
</script>
