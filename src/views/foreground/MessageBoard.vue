<template>
    <img src="https://images.unsplash.com/photo-1672243775711-999ac69cb555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" >
    <el-row >
        <el-col :span="24">
            <el-input v-model="message.content" placeholder="leave your message here..." size="large" clearable>
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
                    <el-timeline-item :timestamp="item.insertTime" placement="top" v-for="item in messageList"
                        :id="item.id">
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
    import { useMessageStore } from '@/store/useMessageStore'
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
            max-width: 90%;
        }

        .el-input {
            width: 84%;
            margin: 26px 66px;
        }
    }

    /* PC */
    @media screen and (min-width: 992px) {
        .el-row {
            left: 15%;
            max-width: 70%;
        }

        .el-input {
            width: 94%;
            margin: 26px 66px;
        }
    }

    img {
        width: 100%;
        height: 460px;
        object-fit: cover;
        border-radius: 10px;
    }

    .el-row {
        margin-top: 30px;
    }
</style>