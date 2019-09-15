<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>{{$route.params.id ? 'Edit' : 'Create'}} Event</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form">
                        <el-form-item prop="memo" label="Memo">
                            <el-input style="width: 100%;" v-model="form.memo"></el-input>
                            <div v-if="errors.memo" v-for="error in errors.memo" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="start_date" label="Start Date">
                            <el-date-picker style="width: 100%;" v-model="form.start_date" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.start_date" v-for="error in errors.start_date" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="end_date" label="End Date">
                            <el-date-picker style="width: 100%;" v-model="form.end_date" type="date" placeholder="Pick a day"></el-date-picker>
                            <div v-if="errors.end_date" v-for="error in errors.end_date" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item prop="type" label="Type">
                            <el-select style="width: 100%;" v-model="form.occurrence" placeholder="Select">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <div v-if="errors.occurrence" v-for="error in errors.occurrence" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>

                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edit' : 'Create'}} Event
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
    export default {
        data() {
            return {
                options:[
                    {
                        label: 'Regular Holiday',
                        value: '0'
                    },
                    {
                        label: 'Special Holiday',
                        value: '1'
                    }
                ],
                url: '',
                form: {
                    memo: '',
                    start_date: '',
                    end_date: '',
                    occurrence: '',
                },
                errors: {},
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/events/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm => vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
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
                axios.get(`/api/events/${to.params.id}`).then(function (response) {
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
                var vm = this
                vm.form = response
                if(vm.form.occurrence == ''){
                    vm.form.occurrence = '0'
                }

            },
            onCancel(){
                this.$router.push({name: 'view-event'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        vm.errors = {}
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/events${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.errors = {}
                            vm.$swal(`Event has been ${id ? 'edited' : 'created'}`, '', 'success')
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