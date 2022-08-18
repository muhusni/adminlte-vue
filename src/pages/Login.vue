<template>
  <div class="login-box">
    <div class="login-logo">
        <b>Admin</b>LTE
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <h2 class="login-box-msg">Login Aplikasi</h2>
        <va-alert type="danger" v-if="alert">
            <div slot="body">
                Password yang anda masukan salah
            </div>
        </va-alert>
      <form @submit.prevent="submit">
        <div class="form-group has-feedback">
          <input
            type="text"
            class="form-control"
            placeholder="username"
            v-model="form.username"
            required
          />
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="password"
            v-model="form.password"
            required
          />
        </div>
        <div class="row">
          <div class="col-xs-8"></div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button
              type="submit"
              class="btn btn-success btn-block btn-flat process"
              :disabled="$store.state.auth.isLoading"
            >
              Login
            </button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
    <!-- /.login-box-body -->
  </div>
  <!-- /.login-box -->
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import VAAlert from '../components/VAAlert.vue'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    'va-alert': VAAlert
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      handleClick: 'handleClick'
    }),
    submit () {
      this.login(this.form).then(() => {
        this.$store.commit('auth/SET_LOADING', false)
        this.$router.push({path: '/'})
      })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    }),
    alert () {
      return this.$store.getters['auth/loginAlert']
    }
  }
}
</script>

<style></style>
