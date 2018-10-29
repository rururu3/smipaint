<template>
  <div class="float-right">
    <div class="strokeCount">
      ストローク: {{ strokeCount }}
    </div>
  </div>
</template>

<style>
.float-right {
  float: right;
}

.strokeCount {
  font-size: 10pt;
}
</style>

<script>
export default {
  props: ['strokeCount'],
}  
</script>