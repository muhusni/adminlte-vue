<template>
    <div>
        <button class="btn btn-primary" @click="openModal()">sdfasdfsd</button>
    </div>
</template>

<script>
import VAButton from '../components/VAButton.vue'
export default {
  data () {
    return {
      tes: true
    }
  },
  components: {
    VAButton
  },
  methods: {
    openModal () {
      console.log(this.$bus)
      this.$bus.$emit('modal-open', {
        title: 'Tambah',
        description: `<form><input class="form-control"></form>`,
        type: 'modal-primary',
        confirmText: 'Ya',
        cancelText: 'Tidak',
        confirmBefore: () => {
        },
        confirmAfter: () => {
        },
        cancelBefore: () => {
        },
        cancelAfter: () => {
        }
      })
    }
  }
}
</script>

<style></style>
