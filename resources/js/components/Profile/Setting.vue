<template>
    <form v-if="setting_d" ref="form" @submit.prevent="form_m" class="form-horizontal">
        <div class="form-group">
            <div class="text-center">
               <!-- <img class="profile-user-img img-fluid img-circle"
                     :src="$root.store.state.setting.photo ?  '/storage/images/' + $root.store.state.setting.photo.file : '/storage/AdminLTELogo.png'"
                     alt="avatar">-->
            </div>
        </div>
        <div class="form-group">
            <label for="inputName" class="col-sm-2 control-label">Name</label>

            <div class="col-sm-10">
                <input v-model="setting_d.name" type="text" class="form-control" name="name" placeholder="Name">
            </div>
        </div>
        <div class="form-group">
            <label for="upload" class="col-sm-2 control-label">Upload</label>
            <div class="col-sm-10">
                <upload removeUrl="/api/users" :image="setting_d.image ? setting_d.image.url : ''"
                        @file="setting_d.file=$event"/>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" class="btn btn-danger"/>
            </div>
        </div>
    </form>
</template>
<script>
    import upload from './../upload/profile'
    import objectToFormData from './../mixins/objectToFormData'
    export default{
        components: {
            upload
        },
        data(){
            return {
                setting_d: []
            }
        },
        beforeRouteEnter (to, from, next) {
                axios.get(`/api/settings/`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }

                })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
                axios.get(`/api/settings`).then(function (response) {
                    vm.setData(response.data)
                    next()
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }
                    if (error.response.status === 401) {
                        window.location.href = window.location.href;
                    }
                })

        },
        methods: {

            setData(response){
                this.setting_d = response
            },
            form_m(){
                var vm = this
                var formData = objectToFormData(vm.setting_d)
                axios.post('/api/settings', formData).then(function (response) {
                    vm.$store.dispatch('settingChange', response.data)
                    vm.$swal(`Change Setting Successfully! `, '', 'success')
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }
                    if (error.response.status === 401) {
                        window.location.href = window.location.href;
                    }
                })
            }
        },

    }
</script>
