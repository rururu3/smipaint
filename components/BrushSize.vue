<template>
  <div class="bottomMenuWrapper">
    <!-- ブラシサイズ -->
    <input class="brushSizeInput" type="range" min="1" max="30" step="1" v-model="brushSize"/>
    <span class="brushSizeNum">{{ brushSize }}</span>

    <!-- 筆圧影響 -->
    <canvas id="brushSize" ref="brushSizeViewCanvas">
    </canvas>
    | <span class="toolText">筆圧影響</span>
    <input class="pressureInput" type="range" min="0" max="9" step="1" v-model="pressureNum"/>
    <span class="pressureNum">{{ pressureNum }}</span>

    <!-- ストローク -->
    <stroke-count :strokeCount="strokeCount" />
  </div>
</template>

<style>
.bottomMenuWrapper {
  height: 30px;
  vertical-align: middle;
}

.brushSizeInput {
  line-height: 30px;
  width: 130px;
  vertical-align: middle;
}

.brushSizeNum {
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
  width: 25px;
  text-align: center;
}

#brushSize {
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  border: 1px solid;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

.toolText {
  font-size: 10pt;
}

.pressureInput {
  line-height: 30px;
  width: 130px;
  vertical-align: middle;
}

</style>

<script>
import StrokeCount from '~/components/StrokeCount.vue';

export default {
  props: ['strokeCount', 'brushSize', 'pressureNum'],
  components: {
    StrokeCount,
  },
  data() {
    return({
      brushSizeViewCanvas: null,
      brushSizeViewCanvasContext: null,
    });
  },
  watch: {
    brushSize: function(newValue, oldValue) {
      this.drawBrushSize(newValue);
    },
  },
  methods: {
    drawBrushSize: function(brushSize) {
      this.brushSizeViewCanvasContext.fillStyle = 'rgb(255, 255, 255)';
      this.brushSizeViewCanvasContext.fillRect(0, 0, this.brushSizeViewCanvas.width, this.brushSizeViewCanvas.height);
      this.brushSizeViewCanvasContext.beginPath();
      this.brushSizeViewCanvasContext.fillStyle = 'rgb(0, 0, 0)';
      this.brushSizeViewCanvasContext.arc(this.brushSizeViewCanvas.width / 2, this.brushSizeViewCanvas.height / 2, brushSize / 2, 0, Math.PI * 2, false);
      this.brushSizeViewCanvasContext.fill();
    },
  },
  mounted: function() {
    // ブラシ
    this.brushSizeViewCanvas = this.$refs.brushSizeViewCanvas;
    this.brushSizeViewCanvas.width = 24;
    this.brushSizeViewCanvas.height = 24;

    this.brushSizeViewCanvasContext = this.brushSizeViewCanvas.getContext('2d');
    this.drawBrushSize(this.brushSize);
  },
}
</script>
