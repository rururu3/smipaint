<template>
<div>
  <!-- 確認ダイアログ -->
  <b-modal
    ref="canvasConfirmModalRef"
    title="確認"
    @ok="okModalButtonClick"
    >
    <div class="d-block text-center">
      <h3>キャンバスサイズを変更します(全消しされます)。よろしいですか？</h3>
    </div>
  </b-modal>

  <div class="contents">
    <div class="main">
      <div id="canvasVue" v-cloak>
        <header-nav
          :navClick="dropDownButtonClick"
          >
        </header-nav>

        <div class="mainContent">
          <div class="float-left">
            <!-- メインキャンパス -->
            <div>
              <canvas id="canvas" ref="canvas"></canvas>
            </div>

            <div>
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
                <div class="float-right">
                  <div class="strokeCount">
                    ストローク: {{ strokeCount }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 画像保存 -->
            <picture-preview
              :canvas="canvas"
              >
            </picture-preview>

            <!-- 注意書き -->
            <div class="notice">
              ※ 推奨環境: iPad Pro 12.9 インチ<br/>
              ※ 筆圧は Apple Pencil のみ動作を確認しています<br/>
              ※ 機能追加のご要望・不具合報告などは開発者(<a href="https://twitter.com/rururu3" target="_blank">@rururu3</a>)までお寄せ下さい<br/>
              ※ 本アプリケーションを利用したことによる一切の損害について、開発者は責任を持ちません<br/>
              ※ オリジナルのすみぺいんとは<a href="https://twitter.com/smison" target="_blank">@smison</a>様が作成です<br/>
            </div>
          </div>

          <pen-type
            :penType="penType"
            :changePenType="changePenType"
            >
          </pen-type>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
[v-cloak] {
  display: none;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.clear {
  clear: both;
}

#canvasVue {
  min-height: 850px;
  /*
  * transition
  */
}

#canvasVue #canvas {
  border: 1px solid;
}

#canvasVue #brushSize {
  width: 24px;
  height: 24px;
  border: 1px solid;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}


#canvasVue .times {
  color: #BBBBBB;
}

#canvasVue .toolText {
  font-size: 10pt;
}

#canvasVue .transparentOnHover:hover {
  opacity: 0.5;
}

#canvasVue .notice {
  font-size: 10pt;
  margin-top: 20px;
  margin-bottom: 50px;
}

#canvasVue .mainContent {
  width: 1000px;
  margin-top: 10px;
  margin-left: 10px;
}

#canvasVue .strokeCount {
  font-size: 10pt;
}

#canvasVue .tweetText {
  margin-bottom: 10px;
  border: 1px solid;
}

#canvasVue .remainCharLength {
  line-height: 40px;
  vertical-align: middle;
  margin-right: 10px;
}

#canvasVue .bottomMenuWrapper {
  height: 30px;
  vertical-align: middle;
}

#canvasVue .brushSizeInput {
  line-height: 30px;
  width: 130px;
  vertical-align: middle;
}

#canvasVue .pressureInput {
  line-height: 30px;
  width: 130px;
  vertical-align: middle;
}

#canvasVue .brushSizeNum {
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
  width: 25px;
  text-align: center;
}

#canvasVue #brushSize {
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
}

#canvasVue .tweetButtonWrapper {
  width: 100%;
  height: 35px;
}

#canvasVue .twitterAvatar {
  height: 32px;
  width: 32px;
}

#canvasVue .twitterName {
  color: #FFF;
  margin-left: 5px;
  margin-right: 5px;
}
</style>

<script>
import HeaderNav from '~/components//HeaderNav.vue';
import PenType from '~/components//PenType.vue';
import PicturePreview from '~/components//PicturePreview.vue';

export default {
  components: {
    HeaderNav,
    PenType,
    PicturePreview,
  },
  data () {
    return({
      penType: 'black',
      isDrawing: false,
      strokeCount: 0,
      brushSize: 2,
      pressureNum: 3,
      rgba: {
        r: 0, g: 0, b: 0, a: 1.0,
      },
      fromCoordinate: {
        x: 0, y: 0,
      },
      imageBase64: null,

      // 
      canvasMode: null,

      // canvas
      canvas: null,
      context: null,

      brushSizeViewCanvas: null,
      brushSizeViewCanvasContext: null,

      // プレビュー
      previewImage: null,
    });
  },
  watch: {
    brushSize: function(newValue, oldValue) {
      this.drawBrushSize(newValue);
    },
  },
  computed: {
  },
  methods: {
    // ペンのタイプ変更
    changePenType: function() {
      if (this.penType === 'color') {
        this.penType = 'black';
        return;
      }
      this.penType = 'color';
    },
    drawBrushSize: function(brushSize) {
      this.brushSizeViewCanvasContext.fillStyle = 'rgb(255, 255, 255)';
      this.brushSizeViewCanvasContext.fillRect(0, 0, this.brushSizeViewCanvas.width, this.brushSizeViewCanvas.height);
      this.brushSizeViewCanvasContext.beginPath();
      this.brushSizeViewCanvasContext.fillStyle = 'rgb(0, 0, 0)';
      this.brushSizeViewCanvasContext.arc(this.brushSizeViewCanvas.width / 2, this.brushSizeViewCanvas.height / 2, brushSize / 2, 0, Math.PI * 2, false);
      this.brushSizeViewCanvasContext.fill();
    },
    // ドロップダウンクリックされた時
    dropDownButtonClick: function(canvasMode) {
      this.canvasMode = canvasMode;
      switch(this.canvasMode) {
        case 'canvas-size-default':
          break;
        case 'canvas-size-vertical':
          break;
        case 'canvas-all-clear':
          break;
        default:
          break;
      }
      this.$refs.canvasConfirmModalRef.show();
    },
    // 確認ダイアログでOK押された時
    okModalButtonClick: function() {
      switch(this.canvasMode) {
        case 'canvas-size-default':
          this.setCanvasSize(800, 600);
          this.clearCanvas();
          break;
        case 'canvas-size-vertical':
          this.setCanvasSize(500, 900);
          this.clearCanvas();
          break;
        case 'canvas-all-clear':
          this.clearCanvas();
          break;
        default:
          break;
      }
      this.$refs.canvasConfirmModalRef.hide();
    },

    // キャンパスロード
    loadCanvas: function() {
      // 前回のキャンバスサイズ設定があれば読み込み、なければ背景をfill
      let canvasWidth = window.localStorage.getItem("canvasWidth");
      let canvasHeight = window.localStorage.getItem("canvasHeight");
      if(canvasWidth) {
        this.canvas.width = canvasWidth;
      }
      if(canvasHeight) {
        this.canvas.height = canvasHeight;
      }

      // 前回の描画内容があれば読み込み、なければ背景をfill
      let base64 = window.localStorage.getItem("canvas");
      if(base64) {
        let image = new Image();
        image.src = base64;
        image.onload = () => {
          this.context.drawImage(image, 0, 0);
        }
      }
      else {
        this.context.fillStyle = 'rgb(255, 255, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      // 保存されたストロークカウントを読み込み
      let savedStrokedCount = window.localStorage.getItem("strokeCount");
      if(savedStrokedCount) {
        this.strokeCount = parseInt(savedStrokedCount);
      }
    },
    saveCanvas: function() {
      window.localStorage.setItem("canvas", this.canvas.toDataURL());
      window.localStorage.setItem("strokeCount", this.strokeCount);
      window.localStorage.setItem("canvasWidth", this.canvas.width);
      window.localStorage.setItem("canvasHeight", this.canvas.height);
    },
    setCanvasSize: function (width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      window.localStorage.setItem("canvasWidth", width);
      window.localStorage.setItem("canvasHeight", height);
    },
    clearCanvas: function () {
      this.context.fillStyle = 'rgb(255, 255, 255)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.strokeCount = 0;
      this.saveCanvas();
    },
    // キャンパス
    drawStart: function(e) {
      // スクロールさせない
      e.preventDefault();
      this.isDrawing = true;

      let isTouch = this.getIsTouch(e);
      let toCoordinate = this.getCoordinate(e, isTouch);
      this.fromCoordinate.x = toCoordinate.x;
      this.fromCoordinate.y = toCoordinate.y;

      this.rgba = this.getRGBA(this.penType);
      let lineWidth = this.getLineWidth(e, isTouch, this.brushSize, this.pressureNum);
      this.drawLine(isTouch, this.context, this.fromCoordinate, toCoordinate, this.rgba, lineWidth);

      this.strokeCount++;
    },
    drawEnd: function() {
      this.isDrawing = false;
      this.saveCanvas();
    },
    drawMove: function(e) {
      if (!this.isDrawing) {
        return;
      }

      let isTouch = this.getIsTouch(e);
      let toCoordinate = this.getCoordinate(e, isTouch);
      let lineWidth = this.getLineWidth(e, isTouch, this.brushSize, this.pressureNum);
      this.drawLine(isTouch, this.context, this.fromCoordinate, toCoordinate, this.rgba, lineWidth);

      this.fromCoordinate.x = toCoordinate.x;
      this.fromCoordinate.y = toCoordinate.y;
    },
    drawLine: function(isTouch, context, fromCoordinate, toCoordinate, rgba, lineWidth) {
      context.strokeStyle = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
      context.lineWidth = lineWidth;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(fromCoordinate.x, fromCoordinate.y);
      context.lineTo(toCoordinate.x, toCoordinate.y);
      context.stroke();
      context.closePath();
    },
    getLineWidth: function(e, isTouch, brushSize, pressureNum) {
      if (isTouch && (pressureNum !== 0)) {
        brushSize = brushSize * e.touches[0].force * pressureNum;
      }
      return(brushSize);
    },
    getIsTouch: function(e) {
      let isTouch = true;
      if (e.touches === undefined) {
          isTouch = false;
      }
      return(isTouch);
    },
    getRGBA: function(penType) {
      let rgba = {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
      };
      if (penType === "color") {
        rgba.r = Math.floor(Math.random() * 255);
        rgba.g = Math.floor(Math.random() * 255);
        rgba.b = Math.floor(Math.random() * 255);
      }
      return(rgba);
    },
    getCoordinate: function(e, isTouch) {
      let x = 0;
      let y = 0;
      let rect = e.target.getBoundingClientRect();

      if (isTouch) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      return({x: x, y: y});
    },
  },
  mounted: function() {
    // https://jp.vuejs.org/v2/api/#mounted
    // レンダリング後に実行する
    this.$nextTick(function() {
      // キャンバス設定
      this.canvas = this.$refs.canvas;

      // デフォルトではDOM要素のサイズと一致しないので指定が必要
      this.canvas.width = 800;
      this.canvas.height = 600;
      this.context = this.canvas.getContext('2d');

      // ブラシ
      this.brushSizeViewCanvas = this.$refs.brushSizeViewCanvas;
      this.brushSizeViewCanvas.width = 24;
      this.brushSizeViewCanvas.height = 24;

      this.brushSizeViewCanvasContext = this.brushSizeViewCanvas.getContext('2d');


      // キャンパスのイベント登録
      this.canvas.addEventListener('mousedown', (e) => {
        this.drawStart(e);
      });
      this.canvas.addEventListener('mousemove', (e) => {
        this.drawMove(e);
      });
      this.canvas.addEventListener('mouseup', (e) => {
        this.drawEnd(e);
      });

      this.canvas.addEventListener('touchstart', (e) => {
        this.drawStart(e);
      });
      this.canvas.addEventListener('touchmove', (e) => {
        this.drawMove(e);
      });
      this.canvas.addEventListener('touchend', (e) => {
        this.drawEnd(e);
      });        

      this.previewImage = this.$refs.previewImage;

      this.rgba = this.getRGBA(this.penType);
      this.drawBrushSize(this.brushSize);
      this.loadCanvas();
    });
  },
};
</script>