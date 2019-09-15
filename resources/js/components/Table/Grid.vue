<template>
    <div class="card">
        <div class="card-header">
            <div class="clearfix">
                <div class="float-sm-left" style="margin-bottom: 9px;" v-if="onCreateName && showCreate"> <el-button size="mini"  type="primary" @click="$router.push({ name: onCreateName})">{{createName}}</el-button></div>
                <div class="float-sm-right"><el-input v-model="search" @input="search_" size="mini" placeholder="Type to search"/></div>
            </div>


        </div>

        <div class="card-body">
        <el-table :data="data.data"
                  @sort-change="handleSortChange"
                  v-loading="loading"
                  style="width: 100%">
            <slot></slot>
            <el-table-column
                    v-for="(column, index, key) in columns"
                    :key="`${index}-${key}-${column.prop}-${column.label}`"
                    :sortable="column.sort ? true : false"

                    :label="column.label"
                    :prop="column.prop">
            </el-table-column>

            <el-table-column v-if="(can[canUpdate] || can[canDelete]) && (showEdit || showDelete)" align="right">
                <template slot-scope="scope">
                    <div class="btn-group btn-group-sm">
                        <button @click="handleEdit(scope.$index, scope.row)" v-if="showEdit || can[canUpdate] ? can[canUpdate] : false  " type="button" class="btn btn-success">Edit</button>
                        <button @click="handleDelete(scope.$index, scope.row)" v-if="showDelete || can[canDelete] ? can[canDelete] : false"type="button" class="btn btn-danger">Delete</button>
                    </div>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="data.current_page"
                :page-size="data.per_page"
                layout="total, prev, pager, next, jumper"
                :total="data.total">
        </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            header: {
                type: String,
                default: ''
            },
            canDelete: String,
            canUpdate: String,
            createName: String,
            onCreateName: String,
            onEditName: {
                type: String,
                required: true
            },
            onDelete: {
                type: String,
                required: true
            },
            data: {},
            columns: Array,
            showEdit:  {
                default: true,
                type: Boolean},
            showCreate:  {
                default: true,
                type: Boolean},
            showDelete:  {
                default: true,
                type: Boolean},
        },
        computed:{
            can(){
                return this.$store.getters.CAN}
        },
        data(){
            var vm = this
            return {
                search: vm.$route.query.search ? vm.$route.query.search : '',
                loading: false
            }
        },
        methods: {
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
            search_(){
                var vm = this
                vm.onSearch(vm.search, vm)
            },
            onSearch: _.debounce(function (query, vm) {
                var vm = this;
                vm.loading = true
                vm.$router.push({
                    path: `${vm.$route.path}`,
                    query: {search: query}
                }, function () {
                    vm.loading = false
                }, function () {
                    vm.loading = false
                });
            }, 500),
            handleEdit(index, row) {
                var vm = this
                vm.$router.push({name: vm.onEditName, params: {id: row.id}})
            },
            handleDelete(index, row) {
                var vm = this
                vm.loading = true
                vm.$swal({
                    title: 'Are you sure?',
                    text: "This will permanently delete the file. Continue?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if(result.value){
                        axios.post(`${vm.onDelete ? vm.onDelete : '/api/agencies'}/${row.id}`)
                        vm.$emit('delete', index)
                        vm.$swal('', 'Delete completed', 'success')
                    }
                    vm.loading = false
                }).catch(() => {
                    vm.$swal('', 'Delete canceled', 'info')
                    vm.loading = false
                });
            }
        }
    }
</script>