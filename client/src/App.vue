<template>
  <div id="app">
    <div id="nav" v-if="!isLogin">
      <router-link to="/">Home </router-link>
      <img src="./assets/leaves.svg" alt="" width="18pt" height="18pt">
      <router-link to="/signin"> Sign In</router-link>
    </div>
    <nav id="navuser" v-else>
      <div class="l">
        <h2>ARTZONE</h2>
      </div>
      <div class="right">
        <div class="r" v-if="role === 'customer'">
          {{user.email}}
        </div>
        <div class="r" v-else-if="role === 'admin'">
        </div>
        <div class="r" @click="logout">
          <h2>Logout</h2>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'app',
  data () {
    return {
      role: false
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  },
  methods: {
    logout () {
      Swal.fire({
        title: 'Are you sure to logout?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        if (result.value) {
          localStorage.clear()
          this.$router.push({ path: '/' })
          this.$store.commit('SET_ISLOGIN', false)
        }
      })
    }
  },
  watch: {
    user () {
      if (this.user) {
        this.role = this.user.role
      }
    }
  },
  created () {
    if (localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('role')) {
      console.log('here')
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('fetchUserInfo')
      this.role = localStorage.getItem('role')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&display=swap');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: url(./assets/homeback.jpg)
}

#nav a {
  font-weight: 500;
  color: #2c3e50;
  font-size: 15pt;
  font-family: 'Rubik', sans-serif;
}

.r{
  margin: 20px
}
.l{
  margin: 20px
}

nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  height: 6vh;
}
.right{
  display: flex;
}
#nav a.router-link-exact-active {
  color: #7957d5;
}

</style>
