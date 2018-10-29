<template>
  <div class="float-right">
    <div class="strokeCount">
      ストローク: {{ strokeCount }}
    </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  props: ['strokeCount'],
}  
</script>