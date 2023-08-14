const EMAIL_REG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const LINK_REG = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,/;=]{2,256}\.[a-zA-Z0-9./?#-]{2,}$/;

module.exports = { EMAIL_REG, LINK_REG };
