const jwt = require('jsonwebtoken');

const JWT_SIGN_TOKEN = 'TOKENsuperSECRET123456';

module.exports = {
    generateTokenForUser: function (userData) {

        return jwt.sign({
            userId: userData.id,
        },
            JWT_SIGN_TOKEN,
            {
                expiresIn: '24h'
            })
    }
}