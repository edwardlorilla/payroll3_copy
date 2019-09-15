<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   header="Leaves"
                   create-name="Add Leave"
                   can-delete ="delete-employees"
                   can-update="update-employees"
                   on-delete="/api/holidays"
                   on-edit-name="edit-leave"
                   on-create-name="create-leave"
                   @delete="data.data.splice($event, 1)"
        ></grid-view>
    </div>
</template>
<style>
</style>
<script>

    import catchError from '../mixins/catchError'
    import GridView from './../Table/Grid.vue'
    export default{
        data(){
            return {
                columns: [
                    {
                        label: 'User Name',
                        prop: 'user.name',
                        sort: true
                    }, {
                        label: 'Issued',
                        prop: 'date_issued',
                        sort: true
                    }, {
                        label: 'Due',
                        prop: 'date_due_for_return',
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
            axios.get(`/api/holidays`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/holidays`, {params: to.query}).then(function (response) {
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
                this.data = response
            },
        }
    }
</script>