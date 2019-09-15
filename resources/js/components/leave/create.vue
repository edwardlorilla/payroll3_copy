<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edit' : 'Create'}} Employee Leave</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form">

                        <el-form-item  prop="user_id"  label="User">
                            <el-select
                                    style="width: 100%;"
                                    v-model="form.user_id"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="Please enter a keyword"
                                    :remote-method="search_user"
                                    :loading="loading">
                                <el-option
                                        v-for="item in users"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <div v-if="errors.user_id" v-for="error in errors.user_id" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="date_issued" label="Date Issued">
                            <el-date-picker style="width: 100%;" v-model="form.date_issued" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.date_issued" v-for="error in errors.date_issued" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="date_due_for_return" label="Date due for return">
                            <el-date-picker style="width: 100%;" v-model="form.date_due_for_return" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.date_due_for_return" v-for="error in errors.date_due_for_return" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="type" label="Type">
                            <el-select style="width: 100%;" v-model="form.type">
                                <el-option label="LEAVE WITH PAY" value="0"/>
                            </el-select>
                            <div v-if="errors.type" v-for="error in errors.type" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edit' : 'Create'}} Employee Leave
                            </el-button>
                            <el-button @click="onCancel">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import user from './../mixin/search/user.js'
    export default {
        mixins: [user],
        data() {
            return {
                url: '',
                form: {
                    type: '0',
                    user_id: '',
                    date_issued: '',
                    date_due_for_return: '',
                },
                errors: {},
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/holidays/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }
                    if (error.response.status === 401) {
                        window.location.href = window.location.href;
                    }
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                vm.errors = {}
                axios.get(`/api/holidays/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }
                    if (error.response.status === 401) {
                        window.location.href = window.location.href;
                    }
                })
            } else {
                next()
            }
        },
        methods: {
            setData(response){
                console.log(response)
                var vm = this
                vm.users = []
                vm.users = [{value: response.user.id, label: response.user.name}];
                vm.form = response

                vm.form.user_id = response.user.id
            },
            onCancel(){
                this.$router.push({name: 'view-leave'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        vm.errors = {}
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/holidays${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.errors = {}
                            vm.$swal(`${vm.$route.params.id ? 'Update' : 'Created'} successfully!`, '', 'success')
                        }).catch(function (error) {
                            vm.disabled = false
                            if (error.response.data.errors && error.response.data.message) {
                                vm.errors = error.response.data.errors;
                                vm.$swal(error.response.data.statusText, error.response.data.message, 'error')
                            }
                        })
                    }
                })
            }
        }
    }
</script>