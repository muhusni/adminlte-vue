<template>
  <div class="col-12">
    <va-alert type="success" v-if="success" :dismissible="true">
      <h4 slot="header">
        <i class="icon fa fa-check"></i> Berhasil menambah user!
      </h4>
    </va-alert>
    <div class="box">
      <div class="box-header with-border">
        <div class="box-header with-border">
          <h3 class="box-title">User Manager</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-success" @click="openModal()">Add User <i class="fa fa-plus"></i></button>
            <!-- Buttons, labels, and many other things can be placed here! -->
            <!-- Here is a label for example -->
            <!-- <span class="label label-primary">Label</span> -->
          </div>
        </div>
        <div class="box-body">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.email">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>
                  <router-link :to="'users/' + user.id"> <button class="btn btn-primary"> <i
                        class="fa fa-search"></i></button></router-link>
                  <button v-if="user.id !== $store.state.auth.user.id" @click="openDelete(user.id)"
                    class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
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
            <h4 class="modal-title" id="bsModalLabel">Add User</h4>
          </div>
          <form @submit.prevent="handleSubmit()">
            <div class="modal-body">
              <va-alert type="danger" v-if="error" :dismissible="true">
                <h4 slot="header">
                  {{ message }}
                </h4>
              </va-alert>
              <label for="Name">Name</label>
              <input type="text" class="form-control" required v-model="user.name">
              <label for="">Email</label>
              <input type="email" class="form-control" required v-model="user.email">
              <label for="Name">Username</label>
              <input type="text" class="form-control" required v-model="user.username">
              <label for="Name">Password</label>
              <input type="password" class="form-control" required v-model="user.password">
              <label for="Name">Confirm Password</label>
              <input type="password" class="form-control" required v-model="user.password_confirmation">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
              <button type="submit" class="btn btn-success">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from '../components/ModalUser.vue'
import VAAlert from '../components/VAAlert.vue'
import swal from 'sweetalert'
export default {
  data () {
    return {
      users: [],
      user: {
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      message: '',
      success: false,
      error: false
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$http.get('/users').then((response) => {
        this.users = response.data
      })
    },
    openModal () {
      $('#bsModal').modal('show')
    },
    handleSubmit: function () {
      this.$http.post('users', this.user).then((response) => {
        this.message = response.data.message
        this.success = true
        $('#bsModal').modal('hide')
        this.clearField()
        this.getUsers()
      }).catch((error) => {
        this.error = true
        if (error.response.status === 422) { this.message = JSON.stringify(error.response.data.errors) } else {
          this.message = error
        }
      })
    },
    cancel: function () {
      $('#bsModal').modal('hide')
    },
    clearField () {
      this.user.name = ''
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
    },
    openDelete (iddel) {
      swal({
        title: 'Hapus User ini?',
        text: 'Anda yakin akan menghapus user ini?',
        icon: 'error',
        buttons: {
          cancel: 'Cancel',
          Yes: 'Yes'
        }
      })
        .then((value) => {
          switch (value) {
            case 'Yes':
              this.deleteUser(iddel)
          }
        })
    },
    deleteUser (id) {
      this.$http.delete('users/' + id, { body: { id: id } }).then(() => {
        this.getUsers()
        swal('success', 'berhasil menghapus', 'success')
      })
    }
  },
  components: {
    Modal,
    'va-alert': VAAlert
  }
}
</script>

<style>
</style>
