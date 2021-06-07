const env = process.env
export const CONSTANTS = {
    PORT: env.PORT || 9000,
    SECRET_KEY: env.SECRET_KEY || 'jwtsecretkeyisherethisshouldbesecret',
}