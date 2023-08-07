<template>
  <div class="wrapper-auth">
    <h4 class="logo-title">{{ $t('login.logo') }}</h4>
    <h2 class="width auth-heading">{{ $t('register.title') }}</h2>
    <div>
      <q-form @submit="onSubmit" class="q-gutter-md" ref="myForm">
        <q-input
          v-model="name"
          :label="$t('register.label.name')"
          type="text"
          lazy-rules
          outlined
          :rules="[
            (val) => (val && val.length > 0) || $t('register.rules.name')
          ]"
        ></q-input>
        <q-input
          v-model="email"
          :label="$t('register.label.email')"
          type="email"
          lazy-rules
          outlined
          :rules="[
            (val) => (val && val?.length > 0) || $t('register.rules.email')
          ]"
        ></q-input>
        <q-input
          :type="isPwd ? 'password' : 'text'"
          v-model="password"
          :label="$t('register.label.password')"
          lazy-rules
          outlined
          :rules="[
            (val) =>
              (val?.length > 6 && val !== '' && val !== null) ||
              $t('register.rules.password')
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
        <div class="flex-middle">
          <q-btn
            :label="$t('register.submit')"
            style="background: goldenrod; color: white; width: 180px"
            type="submit"
            size="20px"
          ></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@stores/auth-store';
import { v4 as uuidv4 } from 'uuid';

const authStore = useAuth();

const name = ref(null);

const email = ref(null);
const password = ref(null);
const myForm = ref(null);
const isPwd = ref(true);

function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', uuidv4());
      const registerData = {
        name: name.value,
        email: email.value,
        password: password.value
        // uuid: uuidv4()
      };
      authStore.registerUser(registerData);
      // yay, models are correct
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  });
}
// const accept = ref(false);
</script>

<style scoped lang="scss">
.wrapper-auth {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  & > div {
    width: 28.2%;
  }
  /* justify-content: center; */
}

.flex-middle {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
.auth-heading {
  font-size: 1.5625em;
  font-family: moderatmedium, sans-serif;
  font-weight: 400;
  text-align: left;
  padding-bottom: 40px;
  width: 28%;
}
.logo-title {
  padding: 40px 0;
}
</style>
