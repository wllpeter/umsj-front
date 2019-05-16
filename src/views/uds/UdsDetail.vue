<template>
  <div>
    <h3>发布单详情</h3>
    <el-button type="success">{{ id }}</el-button>
    <!-- <el-button v-if="status === 1 || status === 4" type="primary" @click="updatePublish()">编辑发布单</el-button> -->
  </div>
</template>
<script>
export default {
  name: 'UdsDetail',
  data() {
    return {
      id: 0,
      status: 0,
      uuid: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.status = this.$route.params.status
    console.log('this.id ' + this.id)
    console.log('this.status ' + this.status)
  },
  methods: {
    updatePublish() {
      this.$router.push({
        name: 'update',
        params: { id: this.id }
      })
    }
  }
}
</script>
