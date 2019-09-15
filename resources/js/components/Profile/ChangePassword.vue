<template>
    <form @submit.prevent="changePassword_m" ref="form" class="form-horizontal">
        <div class="form-group">
            <label for="old_password" class="control-label">Old Password</label>

            <div class="col-sm-10">
                <input name="old_password" type="password"  :class="errors.old_password ? 'is-invalid' : ''" class="form-control" id="old_password" placeholder="Password">
                <span v-if="errors.old_password" v-for="error in errors.old_password" class="invalid-feedback" role="alert">
                                        <strong>{{ error }}</strong>
                                    </span>
            </div>
        </div>
        <div class="form-group">
            <label for="new_password" class="control-label">New Password</label>

            <div class="col-sm-10">
                <input name="new_password" type="password"  :class="errors.new_password ? 'is-invalid' : ''" class="form-control" id="new_password" placeholder="Password">
                <span v-if="errors.new_password" v-for="error in errors.new_password" class="invalid-feedback" role="alert">
                                        <strong>{{ error }}</strong>
                                    </span>
            </div>
        </div>
        <div class="form-group">
            <label for="confirm" class="control-label">Confirm Password</label>

            <div class="col-sm-10">
                <input name="confirm_password"  :class="errors.confirm_password? 'is-invalid' : ''" type="password" class="form-control" id="confirm"
                       placeholder="Confirm Password">
                <span v-if="errors.confirm_password" v-for="error in errors.confirm_password" class="invalid-feedback" role="alert">
                                        <strong>{{ error }}</strong>
                                    </span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-danger">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
export default{
    data(){
        return{
            disabled: false,
            errors: {}
        }
    },
    methods:{
        changePassword_m(){
            var vm = this
            const formData = new FormData(vm.$refs.form);
            let jsonObject = {};

            for (const [key, value]  of formData.entries()) {
                jsonObject[key] = value;
            }
            vm.disabled = true
            axios.put(`/api/users/${vm.$store.getters.USER.id}`, jsonObject).then(function (response) {
                vm.disabled = false
                vm.errors = {}
                vm.$swal(`Password has been changed`, '', 'success')
            }).catch(function (error) {
                vm.disabled = false
                if (error.response.data && error.response.data.errors && error.response.data.message) {
                    vm.errors = error.response.data.errors;
                    vm.$swal(error.response.data.statusText, error.response.data.message, 'error')
                }else{
                    vm.$swal(error.response.data.statusText, error.response.data, 'error')
                }
            })
        }
    }
}
</script>
