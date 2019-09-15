<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name=""
                   :show-create="false"
                   :show-delete="false"
                   :show-edit="false"
                   header="Attendances"
                   can-delete ="delete-employees"
                   can-update="update-employees"
                   on-delete="/api/attendances"
                   on-edit-name="edit-attendances"
                   on-create-name="create-attendances"
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
                        label: 'User Name',
                        prop: 'user.name',
                        sort: true
                    }, {
                        label: 'Started At',
                        prop: 'started_at',
                        sort: true
                    }, {
                        label: 'Stopped At',
                        prop: 'stopped_at',
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
            axios.get(`/api/attendances`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
                if (error.response.status === 401) {
                    window.location.href = window.location.href;
                }
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/attendances`, {params: to.query}).then(function (response) {
                vm.setData(response.data)
                next()
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
                if (error.response.status === 401) {
                    window.location.href = window.location.href;
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