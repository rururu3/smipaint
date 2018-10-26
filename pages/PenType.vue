<template>
  <div class="float-left rightMenu">
    <button
      class="btn cursorPointer"
      :class="penTypeButtonClass"
      @click="changePenType"
      >
      <i class="fa fa-pencil-alt" aria-hidden="true"></i>
      <span>{{ penTypeString }}</span>
    </button>
  </div>
</template>

<style>
.rightMenu {
  margin-left: 10px;
}

.penTypeColor {
  font-weight: bold;
  background-color: #3399FF;
  color: #FFFFFF;
}

.penTypeBlack {
  font-weight: bold;
  background-color: #333A41;
  color: #FFFFFF;
}
</style>

<script>
export default {
  props: ['penType', 'changePenType'],
  computed: {
    penTypeString: function() {
      switch(this.penType) {
        case 'color':
          return('色');
          break;
        case 'black':
          return('黒');
          break;
        default:
          break;
      }
      return('');
    },
    penTypeButtonClass: function() {
    let obj = {
      penTypeColor: false,
      penTypeBlack: false,
    };
    switch(this.penType) {
      case 'color':
        obj.penTypeColor = true;
        break;
      case 'black':
        obj.penTypeBlack = true;
        break;
      default:
        break;
    }
    return(obj);
  },
 },
}
</script>
