function validPassword(password) {
    const StrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!StrongPassword.test(password))
        return false;
    else
        return true;

};

module.exports = validPassword