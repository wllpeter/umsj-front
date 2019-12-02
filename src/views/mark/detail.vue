<template>
  <div class="article" v-html="htmlContent"></div>
</template>

<script>
import { articleDetail } from '@/api/mark'
import 'mavon-editor/dist/css/index.css'
const defaultListQuery = {
  id: 0
}
export default {
  name: '',
  components: {},
  props: [],

  data() {
    return {
      id: 1,
      htmlContent: '',
      listQuery: Object.assign({}, defaultListQuery)
    }
  },
  mounted() {
    this.id = 3
    this.initModuleInfo(this.id)
  },
  methods: {
    initModuleInfo(id) {
      this.listQuery.id = this.id
      articleDetail(this.listQuery).then(response => {
        this.htmlContent = response.data.content
      })
    }
  }
}
</script>
<style lang="scss">
.article {
  margin-left: 10px;
  margin-top: 5px;
}
</style>
