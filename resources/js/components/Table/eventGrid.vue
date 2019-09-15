<template>
    <div>

    <div class="card" :class="dateTime.status === 'Starting' ? 'border-success' : dateTime.status === 'Pending' ? 'border-primary' : 'border-danger' ">
        <div class="card-header">
            <h5 class="card-title">{{`${event.memo}`}}</h5> <span class="badge"
                                                                      :class="event.occurrence === '0' ? 'badge-success' : 'badge-primary' ">{{event.occurrence === '0' ? 'Regular Holiday' : 'Special Holiday' }}</span>
        </div>
        <div class="card-body">

            <div class="card-text">
            <div>
                Start at: {{`${$root.moment(event.start_date).format('YYYY-MM-DD hh:mm:ss a')}`}}
            </div>
            <div>
                End at: {{`${$root.moment(event.end_date).format('YYYY-MM-DD hh:mm:ss a')}`}}
            </div>
            </div>

        </div>
        <div class="card-footer">
            <span class="badge"
                  :class="dateTime.status === 'Starting' ? 'badge-success' : dateTime.status === 'Pending' ? 'badge-primary' : 'badge-danger' ">{{dateTime.status}}</span>
            <small class="text-muted">{{dateTime.date}}</small>
        </div>
    </div>
    </div>
</template>

<script>
    export default{
        props: ['event'],
        data(){
            return {
                countDownDate: new Date(this.event.end_date).getTime(),
                startDateNow: new Date(this.event.start_date).getTime(),
                date: '',
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                distance: 0,
            }
        },
        computed: {
            dateTime(){
                var vm = this
                if (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                    vm.distance = (vm.countDownDate) - vm.$root.now;
                    vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                    vm.hours = Math.floor((vm.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    vm.minutes = Math.floor((vm.distance % (1000 * 60 * 60)) / (1000 * 60));
                    vm.seconds = Math.floor((vm.distance % (1000 * 60)) / 1000);
                } else if (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                    vm.distance = vm.countDownDate - vm.$root.now;
                    vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                    vm.hours = Math.floor((vm.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    vm.minutes = Math.floor((vm.distance % (1000 * 60 * 60)) / (1000 * 60));
                    vm.seconds = Math.floor((vm.distance % (1000 * 60)) / 1000);
                }
                return (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) ? {
                    status: 'Starting',
                    date: `${vm.days}d ${vm.hours}h ${vm.minutes}m ${vm.seconds}s`
                } : (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) ? {
                    status: 'Pending',
                    date: `${vm.days}d ${vm.hours}h ${vm.minutes}m ${vm.seconds}s`
                } : {
                    status: 'Due Date',
                    date: ""
                }
            }
        }
    }
</script>