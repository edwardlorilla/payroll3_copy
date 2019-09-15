<template>
    <form ref="form" method="post" enctype="multipart/form-data">
        <div style="margin-top: 10px" class="btn btn-primary jbtn-file">
            {{ title }}
            <input ref="inputFile"
                   type="file"
                   :name="nameupload"
                   :multiple="multipleupload"
                   v-on:input="fileSelected">
        </div>
    </form>

</template>

<script>
    export default {
        name: 'upload-button',
        props: {
            selectedCallback: Function,
            title: String,
            multipleupload: {
                type: Boolean,
                default: false
            },
            api: String,
            nameupload: String
        },
        methods: {
            fileSelected(e) {
                var vm = this;
                var form = new FormData();
                form.append('file', e.target.files[0])
                form.append('id', vm.$store.getters.USER.id)
                if( vm.$store.getters.USER.image){
                    form.append('url', vm.$store.getters.USER.image.url)
                }
                axios.post(vm.api, form).then(function (response) {
                    vm.$store.dispatch('onChangeImage', response.data)
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }
    }
</script>