import md5 from 'md5';

const gravatarService = {
  getGravatarUrl(email) {
    const hash = md5(email.trim().toLowerCase());
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
    console.log("Email " + email + " URL Gravatar : " + gravatarUrl);
    return gravatarUrl;
  }
};

export default gravatarService;
