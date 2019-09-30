
const ValidationForm = (value, rules, formCopy) => {
    let valid = true

    for(let rule in rules) {
        switch(rule) {
            case 'isRequired':
                valid = value && validateRequired(value)
                // console.log('valid boolean value 1 --- ', valid)
                break;
            case 'isEmail':
                valid = value && validateEmail(value)
                // console.log('valid boolean value 2 ---- ', valid)
                break;
            case 'minLength':
                valid = value && validateMinLength(value, rules[rule])
                break;
            case 'confirmPass':
                valid = value && validateConfirmPass(value, formCopy[rules.confirmPass].value)
            default:
                valid = true
        }
    }
    return valid
}

export default ValidationForm

const validateRequired = (value) => {
    if(value != "") {
        return true
    }
    return false
}

const validateEmail = (value) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(value).toLocaleLowerCase())
}

const validateMinLength = (value, minLength) => {
    if(value.length >= minLength) {
        return true
    }
    return false
}

const validateConfirmPass = (confirmPass, pass) => {
    return confirmPass === pass
}