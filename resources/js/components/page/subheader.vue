<template>
    <div class="subheader">
        <h1 class="subheader-title">
            <i class="subheader-icon fal fa-edit"></i> {{title}}
            <small>
                {{body}}
            </small>
        </h1>
    </div>
</template>

<script>
    export default {
        props:{
            title: String,
            body: String
        }
    }
</script>