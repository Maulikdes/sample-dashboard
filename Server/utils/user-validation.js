exports.validateUser = function (user) {
    var validationMessages = [];
    var userValidated = true;
    if (!user.name || user.name == '') {
        userValidated = false;
        validationMessages.push("name is required");
    }
    if (!!user.email && user.email != '') {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(user.email.toLowerCase()))) {
            userValidated = false;
            validationMessages.push("email is not valid");
        };
    } else {
        userValidated = false;
        validationMessages.push("email is required");
    }
    if (user.mobile) {
        // simple mobile regex (10 digits and first digit is non zero)
        let re = /^[1-9]{1}[0-9]{9}$/
        if (!re.test(String(this.userToUpdate.mobile.toString()))) {
            userValidated = false;
            validationMessages.push("mobile number is not valid");
        }
    }

    return {
        userValidated: userValidated,
        messages: validationMessages
    };
}    