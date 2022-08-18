<template>
  <div id="app">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition> 
  </div>
</template>

<script>

</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}</style>
