<template>
  <div>
    <!-- 保存ダイアログ -->
    <b-modal
      id="modal-center"
      ref="previewModalRef"
      centered
      ok-only
      no-close-on-backdrop
      title="保存ダイアログ"
      size="lg sub"
      @ok="previewCloseButtonClick()"
      >
        <img class="previewImage" ref="previewImage" :src="imageBase64" />
        <div class="saveText">
        ↑ の画像を右クリックまたはタップ長押しで保存して下さい
        </div>
        <b-form-input v-model="imageName"
          type="text"
          placeholder="画像ファイル名"
          >
        </b-form-input>
        <b-button
          @click="saveImageButtonClick"
          :disabled="saveImageButtonDisable"
        >
          PNG形式で保存
        </b-button>
    </b-modal>
  
    <div>
      <button
        id="show-modal"
        class="btn btn-outline-info cursorPointer tweetModalOpenButton"
        @click="showModalButtonClick()"
        >
        画像を保存
      </button>
    </div>
  </div>
</template>

<style>
.previewImage {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid;
}

.cursorPointer {
  cursor: pointer;
}
.tweetModalOpenButton {
  margin-top: 10px;
}

.saveText {
  margin-left: 10px;
}

/* bootstrap-vueの大きいダイアログ継承 */
.modal-lg {
  max-width: 900px;
}
</style>

<script>
import downloadjs from 'downloadjs';

export default {
  props: ['canvas'],
  data() {
    return({
      imageName: '',
      imageBase64: null,
    });
  },
  computed: {
    // 保存ボタンおせるかチェック
    saveImageButtonDisable: function() {
      if(this.imageName.length <= 0) {
        return(true);
      }
      return(/^.*[(\\|/|:|\*|?|\"|<|>|\|)].*$/.test(this.imageName) != false);
    },
  },
  methods: {
    // 保存ボタンを押したとき(プレビューダイアログ表示)
    showModalButtonClick: function() {
      this.imageBase64 = this.canvas.toDataURL();
      this.$refs.previewModalRef.show();
    },
    // 画像保存
    saveImageButtonClick: function() {
      let _fileName = (/\.png$/i.test(this.imageName) ? this.imageName : this.imageName + '.png');
      downloadjs(this.imageBase64, _fileName, 'image/png');
    },
    // プレビューボタンで閉じるボタン押された時
    previewCloseButtonClick: function() {
      this.$refs.previewModalRef.hide();
    },
  },
}
</script>
