<template>
  <div class="col-12">
    <div class="box">
      <div class="box-header with-border">
        <div class="box-header with-border">
          <h3 class="box-title">User Manager</h3>
          <div class="box-tools pull-right">
            <!-- Buttons, labels, and many other things can be placed here! -->
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
              <td>: {{ user.username}}</td>
            </tr>
          </table>
        </div>
        <div class="box-footer">
          <router-link to="/users"><button class="btn btn-secondary">Kembali</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$http.get('/users/' + this.$route.params.id).then((response) => {
        this.user = response.data
      })
    }
  }
}
</script>

<style></style>
