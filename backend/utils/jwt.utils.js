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
    },

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    // recuperer le user id
    getUserId: function (authorization) {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                const jwtToken = jwt.verify(token, JWT_SIGN_TOKEN);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) { }
        }
        return userId;
    }
}