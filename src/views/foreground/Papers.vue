<template>
    <el-row  justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="12" >
            <div class="papers">
              <h1>Reading</h1>
                <PaperCardList />
            </div>
        </el-col>
    </el-row>
    <el-pagination layout="prev, pager, next" v-model:current-page="page" v-model:page-size="pageSize"
        :total="paperList.total" @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
    import router from '@/router'
    import { ref, reactive, computed } from 'vue'
    import PaperCardList from '@/views/foreground/components/PaperCardList.vue'
    import { usePaperStore } from '@/store/usePaperStore'

    let page = ref(1)
    let pageSize = ref(6)

    let store = usePaperStore()
    const paperList = computed(() => store.paperList)

    const handleCurrentChange = () => {
        store.getPapers(page.value, pageSize.value)
    }
</script>

<style scoped>
    .page-description {
        text-align: center;
        font: 36px/1 Tahoma, Helvetica, Arial, ”\5b8b\4f53”, sans-serif;
    }

    .el-row {
        margin-top: 50px;
    }

    /* papers */
    .papers {
        margin: 20px;
    }

    .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }
</style>