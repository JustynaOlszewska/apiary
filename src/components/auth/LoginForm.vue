<template>
  <div class="wrapper-auth">
    <div>
      <h4 class="logo-title">{{ $t('login.logo') }}</h4>
      <h2 class="auth-heading">{{ $t('login.title') }}</h2>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="myForm"
        data-test="form"
      >
        <!-- <q-toggle
      v-model="accept"
      label="I accept the license and terms"
    ></q-toggle> -->

        <q-input
          id="test-login-email"
          v-model="email"
          :label="$t('login.label.email')"
          type="email"
          lazy-rules
          outlined
          :rules="[
            (val) => (val && val?.length > 0) || $t('login.rules.email')
          ]"
          @focus="authStore.errorLogin = false"
        ></q-input>
        <q-input
          id="test-login-password"
          data-test="nombre_caja"
          :type="isPwd ? 'password' : 'text'"
          v-model="password"
          :label="$t('login.label.password')"
          lazy-rules
          outlined
          :rules="[
            (val) =>
              (val?.length > 6 && val !== '' && val !== null) ||
              $t('login.rules.password')
          ]"
          @focus="authStore.errorLogin = false"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
        <p class="flex-right">{{ $t('login.rememberPassword') }}</p>
        <div class="flex-middle">
          <!-- <q-btn label="Login" type="submit" color="primary"></q-btn> -->
          <q-btn
            type="submit"
            style="background: #ffb74d; color: white; width: 180px"
            label="Login"
            size="20px"
          />
          <div style="height: 30px; margin-top: 20px">
            <p v-if="authStore?.errorLogin" style="color: red">
              {{ $t('login.errorLogin') }}
            </p>
          </div>
          <!-- <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          ></q-btn> -->
        </div>
      </q-form>
      <p class="margin">
        {{ $t('login.register.redirect.firstTime') }}
        <router-link :to="`/${i18n?.locale.value}/register`">{{
          $t('login.register.redirect.free')
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@stores/auth-store';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const authStore = useAuth();
const email = ref(null);
const password = ref(null);
// const accept = ref(false);
const error = ref(false);
const myForm = ref(null);
const isPwd = ref(true);
function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      const registerData = { email: email.value, password: password.value };
      authStore.LoginUser(registerData);
      error.value = false;
      // yay, models are correct
    } else {
      error.value = true;
      // oh no, user has filled in
      // at least one invalid value
    }
  });
}
</script>

<style scoped lang="scss">
.wrapper-auth {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  /* justify-content: center; */
}
.flex-middle {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
.flex-right {
  text-align: right;
  // display: flex;
  // justify-items: center;
  // flex-direction: column;
  // align-items: end;
}
.margin {
  margin-top: 40px;
}
.auth-heading {
  font-size: 1.5625em;
  font-family: moderatmedium, sans-serif;
  font-weight: 400;
  text-align: left;
  padding-bottom: 40px;
}
.logo-title {
  padding: 40px 0;
}
</style>
