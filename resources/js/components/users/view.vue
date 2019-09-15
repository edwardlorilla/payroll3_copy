<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add User"
                   header="Users"
                   can-delete ="delete-employees"
                   can-update="update-employees"
                   on-delete="/api/users"
                   on-edit-name="update-users"
                   on-create-name="create-users"
                   @delete="data.data.splice($event, 1)"
        ></grid-view>
    </div>
</template>
<style>
</style>
<script>
    import GridView from './../Table/Grid.vue'
    import catchError from '../mixins/catchError'
    export default{
        data(){
            return {
                columns: [
                    {
                        label: 'Name',
                        prop: 'name',
                        sort: true
                    }, {
                        label: 'Email',
                        prop: 'email',
                        sort: true
                    }
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {

            axios.get(`/api/users`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/users`, {params: to.query}).then(function (response) {
                vm.setData(response.data)
                next()
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
            })
        },
        methods: {
            setData(response){

                this.data = response},
        }
    }
</script>