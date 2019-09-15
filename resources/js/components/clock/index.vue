<template>
    <div class="wrapper">
        <vue-particles
                color="#886ab5"
        ></vue-particles>
        <div id="body">

            <div class="content">


                <div class="container-fluid">

                    <div class="fixedcenter">
                        <div class="clockwrapper">
                            <div class="clockinout">
                                <button @click="timeInOut" class="btnclock timein" :class="{'active': timeInActive}" data-type="timein">Time In</button>
                                <button @click="timeInOut" class="btnclock timeout" :class="{'active': !timeInActive}" data-type="timeout">Time Out</button>
                            </div>
                        </div>

                        <div class="clockwrapper">
                            <div class="timeclock">
                                <span id="daytoday" class="clock-text">{{timetoday}}</span>
                                <span id="timetoday" class="clock-time">{{datetoday}}</span>
                                <span id="datetoday" class="clock-day">{{daytoday}}</span>
                            </div>
                        </div>

                        <div class="clockwrapper">
                            <div class="userinput">

                                <div class="ui form">

                                    <div class="inline field">
                                        <input :disabled="loading" class="enter_idno uppercase" v-model="idno" type="text" placeholder="ENTER YOUR ID" required="">
                                        <button :disabled="loading" @click="clockin" id="btnclockin" type="button" class="ui positive large icon button">Confirm</button>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="message-after">
                            <p>
                                <span id="greetings">Welcome!</span>
                                <span id="fullname"></span>
                            </p>

                            <p id="messagewrap">
                                <span id="type"></span>
                                <span id="message"></span>
                                <span id="time"></span>
                            </p>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                timeInActive: true,

                idno: '',
                timetoday: '',
                datetoday: '',
                daytoday: '',
                errors: '',
                loading: false
            }
        },
        mounted(){
          let vm = this
            vm.day_today('daytoday');
            vm.date_time('timetoday');
            vm.date_today('datetoday');
        },
        methods:{

            timeInOut(){
                this.timeInActive = !this.timeInActive
            },
            clockin(){
                var vm = this
                vm.loading = true
                if(this.timeInActive){
                    vm.clock()
                }
               else{
                    vm.$swal({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {
                            vm.clock()
                        } else if (
                            /* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel
                        ) {

                        }
                    })

                }

            },
            clock(){
                var vm = this
                axios.post('/api/attendances', {idno:this.idno, timeInOut:this.timeInActive,timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }).then(function(response){
                    vm.loading = false
                    vm.$swal((_.isUndefined(response.data.fullname) ? '': 'Hi ' +  response.data.fullname ), response.data.message, response.data.type ? response.data.type : (_.isUndefined(response.data.fullname) ? 'error' : 'success'));

                }).catch(function (error) {
                    vm.loading = false
                    if (error.data && error.response.data && error.response.data.errors && error.response.data.message) {
                        vm.errors = error.response.data.errors;
                        vm.$swal( '', error.response.data.message, 'error');
                    } else if (error.response) {
                        vm.$swal( '', error.response.statusText, 'error');
                    }

                })
            },
            date_time(timetoday) {
                let date = new Date(), h = date.getHours();
                let hours = ((h + 11) % 12 + 1);
                let ampm = h >= 12 ? 'PM' : 'AM';
                if(hours<10) { hours = "0"+hours; }
                let m = date.getMinutes();
                if(m<10) { m = "0"+m; }
                let s = date.getSeconds();
                if(s<10) { s = "0"+s; }
                let timecurrent = hours+':'+m+':'+s+' '+ampm;
                this.timetoday = timecurrent;
                setTimeout(this.date_time,'1000');
                return true;
            },
            date_today(datetoday) {
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth();
                let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
                let d = date.getDate();
                let day = date.getDay();
                let days = new Array('Sunday,', 'Monday,', 'Tuesday,', 'Wednesday,', 'Thursday,', 'Friday,', 'Saturday,');
                let datecurrent = months[month]+' '+d+', '+year;
                this.datetoday = datecurrent;
                return true;
            },
            day_today(daytoday) {
                let date = new Date;
                let year = date.getFullYear();
                let month = date.getMonth();
                let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
                let d = date.getDate();
                let day = date.getDay();
                let days = new Array('Sunday,', 'Monday', 'Tuesday', 'Wednesday', 'Thursday,', 'Friday', 'Saturday');
                let daycurrent = days[day];
               this.daytoday = daycurrent;
                return true;
            }
        },
    }
</script>