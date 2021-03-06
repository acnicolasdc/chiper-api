require('dotenv').config();
const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    googleApplicationCredentials: {
    "type": process.env.TYPE,
    "project_id":  process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
    "client_x509_cert_url": process.env.CLIENT_CERT
    },
    dbUrl: process.env.DB_URL
};
const dialogFlowIntents = {
    chooseCategory:'ChooseCategory',
    chooseProduct:'ChooseProduct'
}

module.exports = { config, dialogFlowIntents };