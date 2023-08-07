class AutorService {
  static async AccountProfile(data) {
    const accountEntity = require("../entities/account.entity");
    const userEntity = require("../entities/user.entity");

    const userResponse = await userEntity.create(data).catch((e) => {
      console.error("SERVICE ACCOUNT PROFILE: cant create account profile", e);
      return null;
    });
    if (userResponse) {
      data.user_id = userResponse.id;
      const accountResponse = await accountEntity.create(data).catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
      return accountResponse;
    }
    return null;
  }
  static async Login(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getByEmail(data.email)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant find by email", e);
        return null;
      });
    if (accountResponse && accountResponse.password) {
      const auth = require("../../../utils/auth");
      const ok = await auth.comparePassword(data.password, accountResponse.password);
      if (ok) {
        const newToken = await auth.newTokenUser(accountResponse);
        accountResponse.token = newToken;
        return accountResponse;
      }
      return null;
    }
    return null;
  }
}

module.exports = AutorService;
