const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const bycrpt = require("bcryptjs");
const { shapeIntMongooseObjectId } = require("../lib/config");
const View = require("./View");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const salt = await bycrpt.genSalt();
      input.mb_password = await bycrpt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);

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
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();

      assert.ok(member, Definer.auth_err3);

      const isMatch = await bycrpt.compare(
        input.mb_password,
        member.mb_password
      );
      assert.ok(isMatch, Definer.auth_err4);

      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      throw err;
    }
  }
  async getChosenMemberData(member, id) {
    try {
      id = shapeIntMongooseObjectId(id);

      // console.log("member:::", member);

      // login bolmagan userlar bu yerdan otib  ketadi
      if (member) {
        // condition if not seen before
        await this.viewChosenItemByMember(member, id, "member");
      }

      // login yani authentificated  bolgan userlarga ham bolmagan userlarga ham data korishlari mumkin
      const result = await this.memberModel
        .aggregate([
          { $match: { _id: id, mb_status: "ACTIVE" } },
          { $unset: "mb_password" },
        ])
        .exec();
      // console.log("result:::", result);

      assert.ok(result, Definer.general_err2);
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async viewChosenItemByMember(member, view_ref_id, group_type) {
    try {
      view_ref_id = shapeIntMongooseObjectId(view_ref_id);
      const mb_id = shapeIntMongooseObjectId(member._id);

      const view = new View(mb_id);
      // validatr product target rostan product bor yoki yoligini tekwiramiz
      const isValid = await view.validateChosenTarget(view_ref_id, group_type);
      assert.ok(isValid, Definer.general_err2);

      // logged user has seen target before
      const doesExist = await view.checkViewExistence(view_ref_id);
      // console.log("doesExist:", doesExist);

      if (!doesExist) {
        const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
      }

      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
