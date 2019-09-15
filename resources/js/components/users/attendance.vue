<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">

                <div class="card-header">
                        {{monthNames[month]}}
                </div>
                <div class="card-body">
                    <el-table
                            :data="user.attendances"
                            stripe
                            :summary-method="getSummaries"
                            show-summary
                            style="width: 100%">
                        <el-table-column
                                prop="started_at"
                                label="Started At">
                        </el-table-column>
                        <el-table-column
                                prop="stopped_at"
                                label="Stopped At">
                        </el-table-column>
                        <el-table-column
                                prop="timing"
                                label="As Hour">
                            <template slot-scope="scope">
                                {{new Date(scope.row.timing * 1000).toISOString().substr(11, 8)}}
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import catchError from '../mixins/catchError'
    export default {
        name: "attendance",
        data() {
            var d = new Date(),
                month = d.getMonth(),
                year = d.getYear();
            return {
                month: month,
                year: year,
                no_of_days: new Date(year, month + 1, 0),
                user: {
                    attendances: []
                },
                monthNames: ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ]
            }
        },
        mounted() {
            this.no_of_days.getDate()
        },

        computed: {
            days() {
                var vm = this,
                    index = 0,
                    days = {}

                while (index < vm.no_of_days.getDate()) {
                    days[index + 1] = false
                    index++
                }
                index = 0
                if (vm.user.attendances ? vm.user.attendances.length : false) {
                    while (index < vm.user.attendances.length) {
                        var d = new Date(vm.user.attendances[index].started_at.split(" ")[0]).addDays(1)
                        if (d.getDate()) {
                            days[d.getDate()] = true
                        }
                        index++
                    }

                }


                return vm.user ? days : {}
            }
        },
        beforeRouteEnter(to, from, next) {
            if (to.params.id) {
                axios.get(`/api/user/${to.params.id}/attendances`).then(function (response) {
                    next(vm => vm.setData(response.data))
                }).catch(function (error) {
                    if (error.response.statusText) {
                        next(vm =>  vm.$swal(error.response.data.statusText, error.response.data.message, 'error'))
                    }
                    if (error.response.status === 401) {
                        window.location.href = window.location.href;
                    }
                })
            }
        },
        beforeRouteUpdate(to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/user/${to.params.id}/attendances`).then(function (response) {
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
            }
        },
        methods: {
            setData(data) {

                this.user = data
            },
            getSummaries(param) {
                const {columns, data} = param;

                const sums = [], vm = this;
                columns.forEach((column, index) => {
                    /*if(index === 0){
                        sums[index] = 'Employee Pay: ₱' + (data.reduce((prev, curr) => {
                            const value = Number();
                            if (!isNaN(value)) {
                                return prev + curr.timing * 0.0002777778;
                            } else {
                                return prev;
                            }
                        }, 0) * vm.$store.getters.EMPLOYEE_PAY).toFixed(2);
                    }*/
                    if (index === 2) {
                        sums[index] = new Date(data.reduce((prev, curr) => {
                            const value = Number();
                            if (!isNaN(value)) {
                                return prev + curr.timing * 1000;
                            } else {
                                return prev;
                            }
                        }, 0)).toISOString().substr(11, 8) + ' Hour(s)';
                    }
                });

                return sums;
            }
        }
    }
</script>

