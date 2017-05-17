/* eslint-disable consistent-return,no-bitwise */
import validator from 'validator';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => rules.map(rule => rule(value, data))
  .filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function ifsc(value) {
  if (!isEmpty(value) && !/^[a-zA-Z0-9]{4}[0]{1}[0-9A-Z]{6}$/i.test(value)) {
    return 'Invalid IFSC Code';
  }
}

export function panNumber(value) {
  if (!isEmpty(value) && !/^[a-zA-Z]{3}(A|B|C|F|G|H|L|J|P|T|K){1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/i.test(value)) {
    return 'Invalid Pan Number';
  }
}

export function textOnly(value) {
  if (!/^[a-zA-Z ]*$/i.test(value)) {
    return 'invalid text';
  }
}

export function validEmail(value) {
  if (!isEmpty(value) && (value.indexOf('@facebook.com') !== -1 || value.indexOf('@mailinator.com') !== -1)) {
    return 'Email address not acceptable';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function isPhone(value) {
  if (!Number.isInteger(Number(value)) || value.length !== 10) {
    return 'Not a valid phone number';
  }
}

export function isPostalCode(value) {
  if (!(/^[a-z0-9\- ]+$/i).test(value)) {
    return 'Only alphanumeric values allowed';
  }
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
    return 'Must be an integer';
  }
}

export function isUrl(value) {
  if (validator.isURL(value)) {
    return 'Please enter a valid url';
  }
}

export function oneOf(enumeration) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function isValidCreditCard(number) {
  if (validator.isCreditCard(number)) {
    return 'Please enter a valid card number';
  }
}

export function detectCardType(number) {
  const re = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };
  if (re.electron.test(number)) {
    return 'ELECTRON';
  } else if (re.maestro.test(number)) {
    return 'MAESTRO';
  } else if (re.dankort.test(number)) {
    return 'DANKORT';
  } else if (re.interpayment.test(number)) {
    return 'INTERPAYMENT';
  } else if (re.unionpay.test(number)) {
    return 'UNIONPAY';
  } else if (re.visa.test(number)) {
    return 'VISA';
  } else if (re.mastercard.test(number)) {
    return 'MASTERCARD';
  } else if (re.amex.test(number)) {
    return 'AMEX';
  } else if (re.diners.test(number)) {
    return 'DINERS';
  } else if (re.discover.test(number)) {
    return 'DISCOVER';
  } else if (re.jcb.test(number)) {
    return 'JCB';
  }
  return null;
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
