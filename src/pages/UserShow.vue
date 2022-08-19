<template>
  <div class="col-12">
    <va-alert type="success" v-if="success" :dismissible="true">
      <h4 slot="header">
        <i class="icon fa fa-check"></i> Berhasil mengedit user!
      </h4>
    </va-alert>
    <div class="box">
      <div class="box-header with-border">
        <div class="box-header with-border">
          <h3 class="box-title">User Manager</h3>
          <div class="box-tools pull-right">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <button class="btn btn-warning" @click="openModal()"><i class="fa fa-pencil"></i> Edit User</button>
            <!-- Here is a label for example -->
            <!-- <span class="label label-primary">Label</span> -->
          </div>
        </div>
        <div class="box-body">
          <table class="table table-bordered table-responsive">
            <tr>
              <td>Name</td>
              <td>: {{ user.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {{ user.email }}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>: {{ user.username }}</td>
            </tr>
          </table>
        </div>
        <div class="box-footer">
          <router-link to="/users"><button class="btn btn-secondary">Kembali</button></router-link>
        </div>
      </div>
    </div>
    <!-- modal -->
    <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="bsModalLabel">Edit User</h4>
          </div>
          <form @submit.prevent="handleSubmit()">
            <div class="modal-body">
              <va-alert type="danger" v-if="error" :dismissible="true">
                <h4 slot="header">
                  {{ message }}
                </h4>
              </va-alert>
              <label for="Name">Name</label>
              <input type="text" class="form-control" required v-model="user_update.name">
              <label for="">Email</label>
              <input type="email" class="form-control" required v-model="user_update.email">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
              <button type="submit" class="btn btn-success">Edit User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VAAlert from '../components/VAAlert.vue'

export default {
  data () {
    return {
      user: [],
      user_update: {
        name: '',
        email: ''
      },
      message: '',
      success: false,
      error: false
    }
  },
  components: {
    'va-alert': VAAlert
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$http.get('/users/' + this.$route.params.id).then((response) => {
        this.user = response.data
        this.user_update.name = response.data.name
        this.user_update.email = response.data.email
      })
    },
    openModal () {
      $('#bsModal').modal('show')
    },
    cancel: function () {
      $('#bsModal').modal('hide')
    },
    handleSubmit: function () {
      this.$http.put('/users/' + this.$route.params.id, this.user_update).then((response) => {
        this.message = response.data.message
        this.success = true
        $('#bsModal').modal('hide')
        this.clearField()
        this.getUser()
      })
    }
  }
}
</script>

<style>
</style>
