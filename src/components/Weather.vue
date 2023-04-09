<template>
    <div class="weather">
        <div id="he-plugin-simple"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, toRefs, onMounted } from "vue"
    window.WIDGET = {
        "CONFIG": {
            "modules": "01234",
            "background": "1",
            "tmpColor": "FFFFFF",
            "tmpSize": "16",
            "cityColor": "FFFFFF",
            "citySize": "16",
            "aqiColor": "FFFFFF",
            "aqiSize": "16",
            "weatherIconSize": "24",
            "alertIconSize": "18",
            "padding": "10px 10px 10px 10px",
            "shadow": "1",
            "language": "auto",
            "borderRadius": "10",
            "fixed": "false",
            "vertical": "top",
            "horizontal": "left",
            "key": "ae028231b866462ab84ce7bd700d9903"
        }
    }

    onMounted(() => {
        weather()
    })
    const weather = () => {
        const s = document.createElement("script")
        s.type = "text/javascript"
        s.src = "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"
        document.body.appendChild(s)
    }

</script>
<style scoped>
    .weather {
        width: 60px !important;
        height: 100%;
    }
</style>