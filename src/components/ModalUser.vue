<template>
  <!-- Modal -->
  <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsModalLabel">Add User</h4>
        </div>
          <form @submit.prevent="handleSubmit()">
        <div class="modal-body">
            <label for="Name">Name</label>
            <input type="text" class="form-control" required v-model="user.name">
            <label for="">Email</label>
            <input type="email" class="form-control" required v-model="user.email">
            <label for="Name">Username</label>
            <input type="text" class="form-control" required v-model="user.username">
            <label for="Name">Password</label>
            <input type="password" class="form-control" required v-model="user.password">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
          <button type="submit" class="btn btn-success">Add User</button>
        </div>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
// const ModalTypes = ['modal-primary', 'modal-success', 'modal-info', 'modal-warning', 'modal-danger']
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        username: '',
        password: ''
      },
      type: '',
      title: '',
      description: '',
      confirmText: '',
      cancelText: '',
      confirmBeforeHook: () => {},
      confirmAfterHook: () => {},
      cancelBeforeHook: () => {},
      cancelAfterHook: () => {}
    }
  },
  methods: {
    handleSubmit: function () {
      this.$http.post('users', this.user).then((response) => {
        this.message = response.data.message
        this.success = true
        $('#bsModal').modal('hide')
        this.clearField()
      })
    },
    cancel: function () {
      this.cancelBeforeHook()
      $('#bsModal').modal('hide')
      this.confirmAfterHook = () => {}
    },
    clearField () {
      this.user.name = ''
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
    }
  }
}
</script>

<style lang="css">
</style>
