<template>
  <login-card header-color="green">
    <h4 slot="title" class="title">Log in</h4>
    <template slot="buttons">
      <md-button href="#facebook" class="md-just-icon md-simple md-white">
        <i class="fab fa-facebook-square"></i>
      </md-button>
      <md-button href="#twitter" class="md-just-icon md-simple md-white">
        <i class="fab fa-twitter"></i>
      </md-button>
      <md-button href="#google" class="md-just-icon md-simple md-white">
        <i class="fab fa-google-plus-g"></i>
      </md-button>
    </template>
    <p slot="description" class="description">Or Be Classical</p>
    <template slot="inputs">
      <md-field class="md-form-group">
        <md-icon>face</md-icon>
        <label>First Name...</label>
        <md-input v-model="firstname"></md-input>
      </md-field>
      <md-field class="md-form-group">
        <md-icon>email</md-icon>
        <label>Email...</label>
        <md-input v-model="email" type="email"></md-input>
      </md-field>
      <md-field class="md-form-group">
        <md-icon>lock_outline</md-icon>
        <label>Password...</label>
        <md-input v-model="password"></md-input>
      </md-field>
    </template>
    <md-button slot="footer" class="md-simple md-success md-lg">
      Lets Go
    </md-button>
  </login-card>

  <script>
    export default {
      data () {
        return {
          password: null,
          firstname: null,
          email: null
        }
      }
    }
  </script>
  <props-table component-name="form-card"></props-table>
</template>