/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
function getBestUser(users, max) {
    const bestUsers = [];

    users.forEach((user) => {
        if (user.best + '' === max + '') {
        bestUsers.push(user);
        }
    });

    return bestUsers;
}

export {getBestUser}