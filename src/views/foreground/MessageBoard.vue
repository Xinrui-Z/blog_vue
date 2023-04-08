<template>
    <!-- <img :src="'data:image/jpeg;base64,'+article.imgUrl" class="background-image" /> -->
    <h1 style="text-align: center;">Leave Your Message Here!</h1>
    <el-row>
        <el-col :span="24">
            <el-input v-model="message.content" placeholder="在此处写下你想说的话吧" size="large" clearable>
                <template #append>
                    <el-button :icon="EditPen" @Click="sendMessage" />
                </template>
            </el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-scrollbar height="600px">
                <el-timeline>
                    <el-timeline-item :timestamp="item.insertTime" placement="top" v-for="item in messageList" :id="item.id">
                        <el-card>
                            <h4>{{item.content}}</h4>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
    import { ref, computed, toRaw } from 'vue'
    import { EditPen } from '@element-plus/icons-vue'
    import { useMessageStore } from '@/store/useMessageStore.ts'
    import { Message } from '@/types/type'

    let messageStore = useMessageStore()

    messageStore.getMessages()

    const messageList = computed(() => messageStore.messageList)

    let message = ref({
        content: ''
    })

    let sendMessage = () => {
        messageStore.postMessage(toRaw(message.value))
    }

</script>

<style scoped>
    /* Phone */
    @media screen and (max-width: 993px) {
        .el-row {
            max-width: 100%;
        }
    }

    /* PC */
    @media screen and (min-width: 992px) {
        .el-row {
            left: 15%;
            max-width: 70%;
        }
    }

    .el-input {
        width: 94%;
        margin: 26px 66px;
    }
</style>