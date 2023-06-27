 const validPassword = async (password) => {
    const StrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!StrongPassword.test(password)) {
        throw new Error('The password is not Strong ');
    }
};

module.exports = validPassword