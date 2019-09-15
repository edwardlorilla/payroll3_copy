export default {
    data() {
        return {
            users: [],
            params: '',
            errors: {}
        }
    },
    methods: {
        search_user(query) {
            var vm = this
            if (query !== '') {
                vm.loading = true
                vm.onSearchUser(query, vm)
            } else {
                vm.loading = false
                vm.users = []
            }
        },

        onSearchUser: _.debounce(function (query, vm) {

            axios.get('/api/users/search' + '?search=' + query).then(function (q) {
                vm.loading = false
                vm.users = q.data.data.map(item => {
                    return {value: item.id, label: item.name};
                })
            }).catch(function (error) {
                vm.loading = false
                if (error.data && error.response.data && error.response.data.errors && error.response.data.message) {
                    vm.errors = error.response.data.errors;
                    vm.$swal(error.response.data.statusText, error.response.data.message, 'error');
                }
            })
        }, 350),
    }
}