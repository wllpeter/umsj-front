<template>
  <div>
    <div v-for="(item,index) in actions" :key="index">
      <div v-if="item.isActive === 'show'">
        <ul>
          <li>{{ item.lable }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActionsPermission',
  props: {
    selfActions: Array,
    defaultActions: Array
  },
  data() {
    return {
      actions: []
    }
  },
  created() {
    this.handleAtions()
  },
  methods: {
    isExist(code) {
      let flag = false
      for (let i = 0; i < this.selfActions.length; i++) {
        if (this.selfActions[i] === code) {
          flag = true
        }
      }
      return flag
    },
    handleAtions() {
      console.log(this.defaultActions)
      console.log(this.selfActions)
      this.actions = []
      var [...arr2] = this.defaultActions
      this.actions = arr2
      for (let i = 0; i < this.actions.length; i++) {
        for (let j = 0; i < this.selfActions.length; j++) {
          if (this.actions[i].code === this.selfActions[j]) {
            this.actions[i].isActive = 'show'
          }
        }
        // console.log(this.actions[i].code + this.actions[i].isActive + '后')
      }
    }
  }
}
</script>
