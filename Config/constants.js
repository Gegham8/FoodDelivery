const statusCode = {
    notFound: 404,
    badRequest: 400,
    forbidden: 403,
    conflict : 409,
    unauthorized: 401,
    unprocessableEntity : 422,
    notAllowed : 405
};

const messages = {
    userNameAlreadyUsed : 'User name is already used',
    userNotFound: 'User is not found',
    userLoggedIn: 'User successfully logged in',
    unauthorized : 'Account is not authorized',
    emailAlreadyUsed : 'Email is already used',
    invalidEmail : 'Invalid email address',
    invalidId : 'Invalid id',
    ivalidEmailOrPassword : 'Invalid username or password',
    userUpdatedSuccessfully : 'User was updated successfully',
    userSuccessfullyRegistered : 'User was successfully registered.Please click the activation link we sent to your email',
    activateAccount : 'Please check your email address to activate your account',
    incorrectHash : 'Incorrect hash',
    accountActivated : 'Account was successfully activated',
    imageIsNotDefine : 'Image is not defined',
    notAllowed : 'Not allowed to get all users',
    loginForInformation : 'Please login for get information',
    activatePasswordLink : 'Please  check your email address for change your password',
    resetIsReady : 'You can already reset your password',
    passwordsDontMatch : 'Your passwords don\'t match',
    passwordChangeSuccess : 'Your password has been changed successfully',
    foodAddSuccess : 'Your food was added successfully',
    noFoodExists : 'Does not exist any food',
    foodIsNotFound : 'The food is not found',
    foodUpdatedSuccess : ' was updated successfully'
}


module.exports = {
    statusCode,
    messages
}