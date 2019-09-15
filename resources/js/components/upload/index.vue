<template>

    <el-upload
            class="yum-avatar-uploader"
            action="/api/user/"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChange"
            name="file"
            :before-upload="beforeAvatarUpload">
        <img v-if="!imageUrl && image" :src="`/upload/100_${image}`" alt="yum-avatar" class="yum-avatar">
        <img v-else-if="imageUrl || image" :src="imageUrl" alt="yum-avatar" class="yum-avatar">
        <div v-else>
            <i class="el-icon-plus yum-avatar-uploader-icon"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </div>
        <el-button v-if="imageUrl || image" @click="imageUrl=''">Clear Image</el-button>
    </el-upload>
</template>


<script>
    export default {
        props: ['image'],
        data() {
            return {
                imageUrl: this.image ? `/upload/${this.image}` : '',
                raw: ''
            }
        },
        methods: {
            handleChange(file, fileList){
                var vm = this
                vm.$emit('file', file.raw)
                vm.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$swal('Avatar picture must be JPG format!', '', 'error');
                }
                if (!isLt2M) {
                    this.$swal('Avatar picture size can not exceed 2MB!', '', 'error');
                }
                return isJPG && isLt2M;
            },
        }
    }
</script>