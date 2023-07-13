<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="myForm">
    <!-- <q-toggle
      v-model="accept"
      label="I accept the license and terms"
    ></q-toggle> -->

    <q-input
      filled
      v-model="email"
      label="Your name *"
      hint="Email"
      type="email"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    ></q-input>

    <q-input
      filled
      type="password"
      v-model="password"
      label="Passord *"
      lazy-rules
      :rules="[
        (val) =>
          (val.length > 6 && val !== '' && val !== null) ||
          'Please type your age'
      ]"
    ></q-input>

    <div>
      <q-btn label="Submit" type="submit" color="primary"></q-btn>
      <q-btn
        label="Reset"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
      ></q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../stores/auth-store';
const authStore = useAuth();
const email = ref(null);
const password = ref(null);
const accept = ref(false);
const myForm = ref(null);
function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
      const registerData = { email: email.value, password: password.value };
      authStore.LoginUser(registerData);
      // yay, models are correct
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  });
}
</script>

<style scoped></style>
