<template>
  <div class="create-publish">
    <publish-form :is-edit="true" />
    <publish-tip />
  </div>
</template>
<script>
import PublishForm from './components/PublishForm'
import PublishTip from './components/PublishTip'
export default {
  name: 'UdsUpdate',
  components: { PublishForm, PublishTip },
  data() {
    return {
        name: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.create-publish {
  margin-top: 10px;
  margin-left: 10px;
  width: 100%;
  display: flex;
}
</style>

