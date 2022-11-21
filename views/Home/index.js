

const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const validation = (regex, e, element) => {
    const isValid = regex.test(e.target.value);
    if (isValid) {
       element.classList.add('border-2', 'border-green-500');
       element.classList.remove('border-2', 'border-rose-500');
    }
    else {
        element.classList.remove('border-2', 'border-green-500');
        element.classList.add('border-2', 'border-rose-500');
    }
};

emailInput.addEventListener('input', e => {
    validation(EMAIL_REGEX, e, emailInput);

});

passwordInput.addEventListener('input', e => {
    validation(PASSWORD_REGEX, e, passwordInput);

});

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            email: emailInput.value,
            password: passwordInput.value
        }
        const response = await fetch('http://localhost:3003/api/users', {
            method: 'POST', 
            headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),

        }); 
    console.log(response.status);
} catch (error) {
console.log(error);
}

});


// matchInput.addEventListener('input', e => {
//     const isValid = e.target.value === passwordInput.value;
//     const information = e.target.parentElement.children[1];
//  if (isValid) {
//     matchInput.classList.add('correct');
//     matchInput.classList.remove('incorrect');
//   }
//   else {
//     matchInput.classList.remove('correct');
//     matchInput.classList.add('incorrect');
//   }
 
//  });

 
// countrySelect.addEventListener('input', e => {
//     const selectedCountry = [...e.target.children].find(option => option.selected === true);
//    phoneCode.innerHTML = `+${selectedCountry.value}`;
   
// });

// const getCountry = async () => {
//     const {country} = await (await fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=07d9232cf7e4414385bc93ef1a521ee1', {method:'GET'})).json();
//     [...countrySelect.children].forEach(option => {
//     if (option.getAttribute('data-countryCode') === country.iso_code){
//         option.selected = true;
//         phoneCode.innerHTML = `+${option.value}`
//         countrySelect.classList.add('correct');
//         phoneCode.classList.add('correct');
        


//     }
//   });
// }

