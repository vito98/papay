console.log("train js");

class Member {
  #counts;
  constructor(counts) {
    this.#counts = counts;
  }

  addMember(amount) {
    this.#counts += amount;
  }

  removeMember(amount) {
    this.#counts -= amount;
  }

  inform() {
    console.log(this.#counts);
  }
}

const new_member = new Member(0);

new_member.addMember(7);
new_member.removeMember(3);

new_member.inform();

// function calculate(nums) {
//   let result = eval(nums);
//   return Math.floor(result);
// }

// console.log(calculate("11/10"));
