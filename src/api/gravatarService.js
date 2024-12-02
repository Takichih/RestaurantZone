import md5 from "md5";

const gravatarService = {
  getGravatarUrl(email) {
    const defaultImageUrl =
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp";

    if (!email) {
      return defaultImageUrl;
    }

    try {
      const hash = md5(email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
      console.log("Email " + email + " URL Gravatar : " + gravatarUrl);
      return gravatarUrl;
    } catch (error) {
      console.error("Error generating Gravatar URL:", error);
      return defaultImageUrl;
    }
  },
};

export default gravatarService;
