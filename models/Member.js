const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const bycrpt = require("bcryptjs");

class Member {
  constructor() {
    this.MemberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const salt = await bycrpt.genSalt();
      input.mb_password = await bycrpt.hash(input.mb_password, salt);
      const new_member = new this.MemberModel(input);

      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.MemberModel.findOne(
        { mb_nick: input.mb_nick },
        { mb_nick: 1, mb_password: 1 }
      ).exec();

      assert.ok(member, Definer.auth_err3);

      const isMatch = await bycrpt.compare(
        input.mb_password,
        member.mb_password
      );
      assert.ok(isMatch, Definer.auth_err4);

      return await this.MemberModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
