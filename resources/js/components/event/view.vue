<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   header="Events"
                   create-name="Add Event"
                   can-delete ="delete-employees"
                   can-update="update-employees"
                   on-delete="/api/events"
                   on-edit-name="edit-event"
                   on-create-name="create-event"
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
                        label: 'Memo',
                        prop: 'memo',
                        sort: true
                    }, {
                        label: 'Start Date',
                        prop: 'start_date',
                        sort: true
                    }, {
                        label: 'End Date',
                        prop: 'end_date',
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
            axios.get(`/api/events`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            }).catch(function (error) {
                if (error.response.statusText) {
                    next(vm => catchError(vm, error))
                }
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/events`, {params: to.query}).then(function (response) {
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