<template>
    <div>
        <div v-if="presents"  class="row row-grid no-gutters">
            <present v-for="present in presents" :key="present.id" :present="present"/>
        </div>
        <div v-if="presents.length > 0" style="margin-top: 12px;" class="card-footer">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="current_page"
                    :pager-count="pagerCount"
                    :page-size="per_page"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
        <span v-else>No Result</span>

    </div>

</template>

<script>
    import present from './../Table/presentGrid'
    import catchError from './../../components/mixins/catchError'
    export default {
        name: "UserPresent",
        components:{
          present
        },
        data(){
            return{
                pagerCount:5,
                presents:[],
                current_page: null,
                per_page: null,
                total: null,
                loading: false
            }

        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/users`, {params: to.query}).then(function (response) {
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
            axios.get(`/api/users`, {params: to.query}).then(function (response) {
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
                var vm = this
                vm.presents = response.data
                vm.total = response.total
                vm.current_page = response.current_page
                vm.per_page = response.per_page
            },
            handleSortChange(val){
                var vm = this;
                var option = _.clone(vm.$route.query)
                option.column = val.prop;
                option.direction = val.order == 'ascending' ? 'asc' : 'desc';
                vm.onRouteChange(option)
            },
            handleCurrentChange(val) {
                var vm = this;
                var option = _.clone(vm.$route.query)
                option.page = val;
                vm.onRouteChange(option)
            },
            onRouteChange(option){
                var vm = this
                vm.loading = true
                vm.$router.push({
                    path: `${vm.$route.path}`,
                    query: option}, function () {
                    vm.loading = false
                }, function () {
                    vm.loading = false
                });
            },
        }
    }
</script>

<style scoped>

</style>