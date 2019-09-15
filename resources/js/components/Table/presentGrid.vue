<template>
    <div class="col-4">
        <a v-if="backgroundImage" class="text-center p-3 d-flex flex-column hover-highlight">
            <span :class="present.present ? 'status-success' : ''"  class="status profile-image rounded-circle d-block m-auto" :style="{backgroundImage: backgroundImage, backgroundSize: 'cover'}"></span>
            <span class="d-block text-truncate text-muted fs-xs mt-1">{{present.name}}</span>
        </a>
    </div>
</template>

<script>
    export default{
        props: ['present'],
        computed:{
            backgroundImage(){
                var vm = this
                return `${vm.present ? vm.present.image ? 'url("/upload/100_' + vm.present.image.url + '")' : 'url(/img/demo/avatars/avatar-m.png)' : false}`
            }
        }
    }
</script>