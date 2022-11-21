const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
// const axios = require('axios').default;
const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#password-match-input');
const boton = document.querySelector('#boton');

let emailUser = false;
let passwordUser = false;
let matchUser;

const validation = (e, validation, element) => {
  console.log(boton.disabled);
  boton.disabled = !emailUser || !passwordUser || !matchUser ? true : false;

  if (validation) {
    element.classList.remove('border-2', 'border-rose-500');
    element.classList.add('border-2', 'border-green-500');
  } else {
    element.classList.remove('border-2', 'border-green-500');
    element.classList.add('border-2', 'border-rose-500');
  }
};

emailInput.addEventListener('input', e => {
  emailUser = EMAIL_REGEX.test(e.target.value);
  validation(e, emailUser, emailInput);
  console.log(emailUser);
});

passwordInput.addEventListener('input', e => {
  passwordUser = PASSWORD_REGEX.test(e.target.value);
  validation(e, passwordUser, passwordInput);
  console.log(passwordUser);
});

matchInput.addEventListener('input', e => {
  matchUser = e.target.value === passwordInput.value;
  validation(e, matchUser, matchInput);
  console.log(matchUser);
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const newUser = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post('http://localhost:3003/api/users', newUser);
    window.location.pathname = '/login';
    return;
  } catch (error) {
    const p = document.createElement('p');
    p.innerHTML = error.response.data.error;
    p.classList.add('text-rose-300', 'font-bold', 'text-center');
    form.children[4] ? form.children[4].remove() : null;
    form.append(p);
  }
});


