<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-header">
        <span class="navbar-brand">すみぺいんとぴーだぶりゅーえー</span>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <b-dropdown
            id="ddown1"
            text="操作"
            class="m-md-2"
            >
            <b-dropdown-item
              @click="navClick('canvas-size-default')"
              >
              キャンバスサイズ変更(デフォルト)
            </b-dropdown-item>
            <b-dropdown-item
              @click="navClick('canvas-size-vertical')"
              >
              キャンバスサイズ変更(縦長)
            </b-dropdown-item>
            <b-dropdown-item
              @click="navClick('canvas-all-clear')"
              >
              全消し
            </b-dropdown-item>
          </b-dropdown>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
</style>

<script>
export default {
  props: ['navClick'],
}
</script>
