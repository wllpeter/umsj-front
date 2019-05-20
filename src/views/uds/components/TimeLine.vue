<template>
  <div class="time-line">
    <h4>操作日志：</h4>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >{{ activity.content }}</el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: 'TimeLine',
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: 'dulu 标记发布单为发布成功状态',
          timestamp: '2019-04-29 15:00:01'
        },
        {
          content: 'dulu 发布了发布项[143]，发布结果为: 成功',
          timestamp: '2019-04-29 14:59:58'
        },
        {
          content: 'dulu 发布了发布项[142]，发布结果为: 成功',
          timestamp: '2019-04-29 14:59:55'
        },
         {
          content: 'dulu 发布了发布项[141]，发布结果为: 成功',
          timestamp: '2019-04-29 14:59:46'
        },
        {
          content: 'dulu 发布了发布项[140]，发布结果为: 成功',
          timestamp: '2019-04-29 14:59:35'
        },
        {
          content: 'zhangjingchao 审核了发布单，状态为: 通过',
          timestamp: '2019-04-29 14:59:03'
        },
         {
          content: 'dulu 提交了审核',
          timestamp: '2019-04-29 14:58:37'
        },
        {
          content: 'dulu 创建了发布单',
          timestamp: '2019-04-29 14:58:19'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
