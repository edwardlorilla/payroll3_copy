export default (vm, error) => {
    if (error.response.status === 401) {
            window.location.href = window.location.href;
    } else if (error.response.status === 404) {
        vm.$router.push({name: 'not_found'})
    } else {
        vm.$swal(error.response.data.statusText, error.response.data.message, 'error');
    }

}