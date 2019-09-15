<template>
    <div>
        <div v-if="handleBorrow" class="card-deck">
            <leave v-for="leave in leaves" :key="leave.id" :leave="leave"></leave>
        </div>
        <span v-else>No Result</span>
        <div v-if="leaves.length > 0" style="margin-top: 12px;" class="card-footer">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="current_page"
                    :pager-count="pagerCount"
                    :page-size="per_page"
                    layout="prev, pager, next"
                    :total="total">
        </el-pagination>
        </div>

    </div>

</template>

<script>
    import leave from './Table/leaveGrid'
    import catchError from '../components/mixins/catchError'
    export default {
        components:{
            leave
        },
        data(){
            return {
                pagerCount: 5,
                leaves: [],
                current_page: null,
                per_page: null,
                total: null,
                loading: false
            }
        },
        computed: {
            handleBorrow(){
                return !_.isEmpty(this.leaves)
            }
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
                var vm = this
                vm.leaves = response.data
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
