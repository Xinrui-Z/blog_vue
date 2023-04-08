<template>
    <div class="background-div">
        <h1 class="animate__animated animate__fadeInDownBig" style="font-size:36px">留个言吧！</h1>
    </div>
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

        .el-input {
            width: 85%;
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

    .background-div {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        width: 100%;
        color: white;
  
        background: url("https://images.unsplash.com/photo-1490365728022-deae76380607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80");
    }

    .el-row {
        margin-top: 30px;
    }
</style>