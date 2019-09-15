<template>
    <el-form ref="form" @submit.native.prevent="onSubmit" label-position="labelPosition" size="small" :model="form">
        <el-form-item :class="errors.file ? 'is-error is-required' : ''" label="Photo">
            <upload removeUrl="/api/users" :image="form.image ? form.image.url : ''"
                    @file="form.file=$event"/>
            <div v-if="errors.file" v-for="error in errors.file" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.id_number ? 'is-error is-required' : ''" label="ID Number">

            <el-input type="number" required v-model="form.id_number"></el-input>
            <div v-if="errors.id_number" class="el-form-item__error">
                {{errors.id_number[0]}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.name ? 'is-error is-required' : ''" label="Name">
            <el-input type="text" required v-model="form.name"></el-input>
            <div v-if="errors.name" v-for="error in errors.name" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.address ? 'is-error is-required' : ''" label="Address">
            <el-input type="text" required v-model="form.address"></el-input>
            <div v-if="errors.address" v-for="error in errors.address" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.incase_of_emergency ? 'is-error is-required' : ''" label="Incase of emergency">
            <el-input type="text" required v-model="form.incase_of_emergency"></el-input>
            <div v-if="errors.incase_of_emergency" v-for="error in errors.incase_of_emergency" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>

        <el-form-item :class="errors.date_started ? 'is-error is-required' : ''" label="Date Started">
            <el-input type="date" required v-model="form.date_started"></el-input>
            <div v-if="errors.date_started" v-for="error in errors.date_started" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.salary ? 'is-error is-required' : ''" label="Monthly Rate">
            <el-input type="text" required v-model="form.salary"></el-input>
            <div v-if="errors.salary" v-for="error in errors.salary" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.sss_number ? 'is-error is-required' : ''" label="SSS Number">
            <el-input type="text" required v-model="form.sss_number"></el-input>
            <div v-if="errors.sss_number" v-for="error in errors.sss_number" class="el-form-item__error">
                {{error}}
            </div>
        <el-form-item :class="errors.philhealth_number ? 'is-error is-required' : ''" label="Philhealth Number">
            <el-input type="text" required v-model="form.philhealth_number"></el-input>
            <div v-if="errors.philhealth_number" v-for="error in errors.philhealth_number" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.pagibig_number ? 'is-error is-required' : ''" label="Pagibig Number">
            <el-input type="text" required v-model="form.pagibig_number"></el-input>
            <div v-if="errors.pagibig_number" v-for="error in errors.pagibig_number" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        </el-form-item> <el-form-item :class="errors.sss_deduction ? 'is-error is-required' : ''" label="SSS Deduction">
        <el-input type="text" required v-model="form.sss_deduction"></el-input>
        <div v-if="errors.sss_deduction" v-for="error in errors.sss_deduction" class="el-form-item__error">
            {{error}}
        </div>
    </el-form-item>
        <el-form-item :class="errors.philhealth_deduction ? 'is-error is-required' : ''" label="PhilHealth Deduction">
        <el-input type="text" required v-model="form.philhealth_deduction"></el-input>
        <div v-if="errors.philhealth_deduction" v-for="error in errors.philhealth_deduction" class="el-form-item__error">
            {{error}}
        </div>
    </el-form-item>
        <el-form-item :class="errors.pagibig_deduction ? 'is-error is-required' : ''" label="PAGIBIG Deduction">
        <el-input type="text" required v-model="form.pagibig_deduction"></el-input>
        <div v-if="errors.pagibig_deduction" v-for="error in errors.pagibig_deduction" class="el-form-item__error">
            {{error}}
        </div>
    </el-form-item>
        <el-form-item :class="errors.sss_loan ? 'is-error is-required' : ''" label="SSS Loan">
        <el-input type="text" required v-model="form.sss_loan"></el-input>
        <div v-if="errors.sss_loan" v-for="error in errors.sss_loan" class="el-form-item__error">
            {{error}}
        </div>
    </el-form-item>
        <el-form-item :class="errors.pagibig_loan ? 'is-error is-required' : ''" label="PAGIBIG Loan">
        <el-input type="text" required v-model="form.pagibig_loan"></el-input>
        <div v-if="errors.pagibig_loan" v-for="error in errors.pagibig_loan" class="el-form-item__error">
            {{error}}
        </div>
    </el-form-item>
        <el-form-item :class="errors.job_id ? 'is-error is-required' : ''" label="Job/Position">
            <el-select style="width: 100%;" required v-model="form.job_id">
                <el-option v-for="item in jobs"
                           :key="item.id"
                           :label="item.job_title"
                           :value="item.id">
                    <span style="float: left">{{ item.job_title }}</span>
                </el-option>
            </el-select>
            <div v-if="errors.job_id" v-for="error in errors.job_id" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.time ? 'is-error is-required' : ''" label="Time">
            <div style="width: 100%;" class="el-date-editor el-range-editor el-input__inner el-date-editor--timerange is-active">
                <i class="el-input__icon el-range__icon el-icon-time"></i>
                <input autocomplete="off"
                       placeholder="Start time"
                       v-model="form.time_in"
                       class="el-range-input"
                       type="time"><span class="el-range-separator">-</span>
                <input autocomplete="off" type="time" v-model="form.time_out"
                       placeholder="End time" name=""
                       class="el-range-input"></div>
            <div v-if="errors.time_in" v-for="error in errors.time_in" class="el-form-item__error">
                {{error}}
            </div>
            <div v-else-if="errors.time_out" v-for="error in errors.time_out" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.email ? 'is-error is-required' : ''" label="Email">
            <el-input type="email" required v-model="form.email"></el-input>
            <div v-if="errors.email" v-for="error in errors.email" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.password ? 'is-error is-required' : ''" label="Password">
            <el-input type="password" required v-model="form.password"></el-input>
            <div v-if="errors.password" v-for="error in errors.password" class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item :class="errors.confirm_password ? 'is-error is-required' : ''"
                      label="Confirm Password">
            <el-input type="password" required v-model="form.confirm_password"></el-input>
            <div v-if="errors.confirm_password" v-for="error in errors.confirm_password"
                 class="el-form-item__error">
                {{error}}
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="isDisabled">{{$route.params.id ? 'Update' : 'Create'}}
            </el-button>
            <el-button @click="$router.push({name: 'view-users'})">Cancel</el-button>
        </el-form-item>

    </el-form>
</template>
<script>
    import upload from '../upload/index'
    import objectToFormData from '../mixins/objectToFormData'
    import catchError from '../mixins/catchError'
    export default {
        components: {
            upload
        },
        data() {
            var d = new Date(),
                month = d.getMonth(),
                year = d.getFullYear(),
                day = d.getDate();
            return {
                month: month,
                year: year,
                day: day,
                isDisabled: false,
                labelPosition: 'left',
                errors: {},
                form: {

                    id_number: '',
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                },
                checkAllRoles: false,
                isIndeterminate: true,
                roles: [],
                jobs: [],
                checkRoles: [],
                isUser: false
            }
        },
        beforeRouteEnter(to, from, next) {
            if (to.params.id) {
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm => catchError(vm, error))
                    }
                })
            } else {
                axios.get(`/api/users/create`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm => catchError(vm, error))
                    }
                })
            }
        },
        beforeRouteUpdate(to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm => catchError(vm, error))
                    }
                })
            } else {
                next()
            }
        },
        methods: {
            contains(a, obj) {
                var i = a.length;
                while (i--) {
                    if (a[i] === obj) {
                        return true;
                    }
                }
                return false;
            },
            handleCheckAllRolesChange(val) {
                var vm = this
                vm.checkRoles = val ? _.map(vm.roles, 'id') : [];
                vm.isIndeterminate = false;
            },
            handleCheckedRolesChange(value) {
                let vm = this, checkedCount = value.length;
                vm.contains(value, 3) ? vm.isUser = true : vm.isUser = false
                vm.checkAllRole = checkedCount === vm.roles.length;
                vm.isIndeterminate = checkedCount > 0 && checkedCount < vm.roles.length;
            },
            onSubmit() {
                let vm = this
                this.$refs.form.validate((valid) => {
                vm.isDisabled = true
                vm.errors = []
                    let id = vm.$route.params.id;
                    var formData = objectToFormData(vm.form)
                    if (id) {
                        formData.append('id', id)
                    }
                    formData.append('url', vm.$route.fullPath)
                axios.post('/api/users', formData)
                    .then(function (response) {
                        vm.$swal(`${vm.$route.params.id ? 'Update' : 'Created'} successfully!`, '', 'success')
                        vm.isDisabled = false
                    })
                    .catch(function (error) {
                        if (error.response.data.errors && error.response.data.message) {
                            vm.errors = error.response.data.errors;
                            vm.$swal(error.response.data.statusText, error.response.data.message, 'error');
                        }
                        vm.isDisabled = false
                    });
                })
            },
            setData(row) {
                var vm = this
                vm.roles = row.roles
                vm.jobs = row.jobs
                if (row.user) {
                    vm.form = row.user
                    vm.form.date_started =  `${vm.year}-${((parseInt(vm.month)+1) < 10) ? '0' + vm.month : vm.month}-${vm.day}`
                    vm.form.salary = 9906
                    vm.checkRoles = _.map(vm.form.roles, 'id');
                    vm.contains(vm.checkRoles, 3) ? vm.isUser = true : vm.isUser = false
                } else {
                    vm.isUser = true
                    vm.checkRoles = [3]
                }
            }
        },
    }
</script>