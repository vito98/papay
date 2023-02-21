console.log("train js");

function findDays(initial_day, last_day) {
  return Math.round((last_day - initial_day) / (1000 * 60 * 60 * 24));
}

function findDate(nums) {
  let presentDay = nums.split("/");
  return new Date(presentDay[2], presentDay[0] - 1, presentDay[1]);
}

console.log(findDays(findDate("12/05/2023"), findDate("12/07/2023")));

/************************************************/

// class Member {
//   #counts;
//   constructor(counts) {
//     this.#counts = counts;
//   }

//   addMember(amount) {
//     this.#counts += amount;
//   }

//   removeMember(amount) {
//     this.#counts -= amount;
//   }

//   inform() {
//     console.log(this.#counts);
//   }
// }

// const new_member = new Member(0);

// new_member.addMember(7);
// new_member.removeMember(3);

// new_member.inform();

// function calculate(nums) {
//   let result = eval(nums);
//   return Math.floor(result);
// }

// console.log(calculate("11/10"));
