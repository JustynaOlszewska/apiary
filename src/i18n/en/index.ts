export default {
  welcome: 'Welcome to our application!',
  register: {
    username: 'First an last name',
    password: 'Password',
    submit: 'Log',
    title: 'Registration',
    label: {
      email: 'Your email *',
      password: 'Password *',
      name: 'First an last name *'
    },
    rules: {
      email: 'Please enter email',
      password: 'Please enter password',
      name: 'Please enter data'
    }
  },
  login: {
    username: 'Username',
    password: 'Password',
    submit: 'Log In',
    logo: 'HereLogo',
    title: 'Login',
    label: {
      email: 'Your name *',
      password: 'Passord *'
    },
    rules: {
      email: 'Please type email',
      password: 'Please type pasword'
    },
    rememberPassword: 'Do not you remember the password?',
    errorLogin: 'Login error. Incorrect login/password',
    register: {
      redirect: {
        firstTime: 'Are you here for the first time?',
        free: 'Create a free account!'
      }
    }
  },
  chartTitle: 'Datasheet on apiaries',
  apiares: 'List of apiaries',
  search: 'Search',
  placeholder: 'All apiaries',
  create: 'Create',
  actions: 'Akcje',
  formHeaders: {
    general: 'General',
    address: 'Address',
    mapCoordiantes: 'Map coordinates'
  }
};
