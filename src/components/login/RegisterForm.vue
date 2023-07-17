<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="myForm">
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
import { v4 as uuidv4 } from 'uuid';

const authStore = useAuth();

const email = ref(null);
const password = ref(null);
const myForm = ref(null);

// const onSubmit = (data) => {
//   console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data);
//   authStore.registerUser(data);
// };
function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', uuidv4());
      const registerData = {
        email: email.value,
        password: password.value,
        uuid: uuidv4()
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

<style scoped></style>
