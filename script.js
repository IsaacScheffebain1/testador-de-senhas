document.addEventListener('DOMContentLoaded', () => {

  const input = document.getElementById('input');

  const lowercase = document.getElementById('counter1');
  const uppercase = document.getElementById('counter2');
  const number = document.getElementById('counter3');
  const symbol = document.getElementById('counter4');

  const allowed_characters = /[^a-zA-Z0-9@#$%&*'".,;:!?()[\]{}<>\|/~^=+-_`]/g;

  const data1 = document.getElementById('data1');
  const data2 = document.getElementById('data2');
  const data3 = document.getElementById('data3');
  const data4 = document.getElementById('data4');
  const data5 = document.getElementById('data5');

  const resultado = document.getElementById('resultado');

  const radio1 = document.getElementById('radio1');
  const radio2 = document.getElementById('radio2');
  const radio3 = document.getElementById('radio3');

  const update_info = () => {

    const password = input.value;

    const valid_password = password.replace(allowed_characters, '');

    input.value = valid_password;

    let lowercase_counter = 0;
    let uppercase_counter = 0;
    let number_counter = 0;
    let symbol_counter = 0;

    let size = valid_password.length;

    for (let i = 0; i < size; i++) {

      const char = valid_password[i];

      if (/[a-z]/.test(char)) {
        lowercase_counter++;
      }
      else if (/[A-Z]/.test(char)) {
        uppercase_counter++;
      }
      else if (/[0-9]/.test(char)) {
        number_counter++;
      }
      else if (/[@#$%&*'".,;:!?()[\]{}<>\|/~^=+-_`]/.test(char)) {
        symbol_counter++;
      }
    }

    lowercase.textContent = lowercase_counter === 0 ? 'zero' : lowercase_counter;
    lowercase.style.color = lowercase_counter === 0 ? 'red' : 'green';

    uppercase.textContent = uppercase_counter === 0 ? 'zero' : uppercase_counter;
    uppercase.style.color = uppercase_counter === 0 ? 'red' : 'green';

    number.textContent = number_counter === 0 ? 'zero' : number_counter;
    number.style.color = number_counter === 0 ? 'red' : 'green';

    symbol.textContent = symbol_counter === 0 ? 'zero' : symbol_counter;
    symbol.style.color = symbol_counter === 0 ? 'red' : 'green';

    data1.textContent = `${size} caractere${size === 1 ? '' : 's'}`;

    let search_space = 0;

    if (lowercase_counter > 0) { search_space += 26; }
    if (uppercase_counter > 0) { search_space += 26; }
    if (number_counter > 0) { search_space += 10; }
    if (symbol_counter > 0) { search_space += 32; }

    data2.textContent = search_space;

    let total_possible_passwords = 0;

    if (search_space > 0) {
      for (let i = 1; i <= size; i++) {
        total_possible_passwords += Math.pow(search_space, i);
      }
    }

    if (total_possible_passwords > 100000000000000000000000000000000) { data3.textContent = "Muitas"; }

    else { data3.textContent = total_possible_passwords.toLocaleString(); }

    let entropy = 0;

    if (search_space > 0 && size > 0) {
      entropy = Math.log2(Math.pow(search_space, size));
    }

    data4.textContent = entropy.toFixed(2) + ' bits';

    if (entropy >= 72) { resultado.textContent = 'Sua senha é forte!'; resultado.style.color = 'green'; }
    else if (entropy >= 60) { resultado.textContent = 'Sua senha é média!'; resultado.style.color = 'orange'; }
    else if (entropy > 0) { resultado.textContent = 'Sua senha é fraca!'; resultado.style.color = 'red'; }
    else { resultado.textContent = 'Sua senha é...'; resultado.style.color = 'black'; }

    return entropy;
  };

  const update_crack_time = (entropy) => {

    let time = 0;

    if (radio1.checked) {
      time = Math.pow(2, entropy) / 1000000;
    }
    else if (radio2.checked) {
      time = Math.pow(2, entropy) / 1000000000;
    }
    else if (radio3.checked) {
      time = Math.pow(2, entropy) / 1000000000000;
    }

    let unity = 'segundos';

    if (time >= 60) { time /= 60; unity = 'minutos'; }
    if (time >= 60) { time /= 60; unity = 'horas'; }
    if (time >= 24) { time /= 24; unity = 'dias'; }
    if (time >= 30) { time /= 30; unity = 'meses'; }
    if (time >= 12) { time /= 12; unity = 'anos'; }

    data5.textContent = `${time.toFixed(2)} ${unity}`;
  };

  input.addEventListener('input', () => {
    const entropy = update_info();
    update_crack_time(entropy);
  });

  const radio_buttons = [radio1, radio2, radio3];

  radio_buttons.forEach(radio => {

    radio.addEventListener('change', () => {

      const entropy = parseFloat(data4.textContent);
      const entropyValue = parseFloat(data4.textContent.replace(' bits', ''));
      update_crack_time(entropyValue);
    });
  });

  update_info();
  update_crack_time(0);
});