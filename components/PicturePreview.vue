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
export default {
  props: ['canvas'],
  data() {
    return({
      imageBase64: null,
    });
  },
  methods: {
    // 保存ボタンを押したとき
    showModalButtonClick: function() {
      this.imageBase64 = this.canvas.toDataURL();
      this.$refs.previewModalRef.show();
    },
    // プレビューボタンで閉じるボタン押された時
    previewCloseButtonClick: function() {
      this.$refs.previewModalRef.hide();
    },
  },
}
</script>
