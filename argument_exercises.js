function sum() {
  let sum = 0;

  // args = Array.from(arguments);
  // args.forEach((el) => {
  //   sum += el;
  // });

  // for (let i=0; i<arguments.length; i++) {
  //   sum += arguments[i];
  // }

  // call takes 2 arguments: argument1 is the object to call on
  // in this case, argument1 is the array to be sliced
  // argument 2 is the argument to pass into the called function
  // so in this case, argument2 is the arugment of slice()
  args = Array.prototype.slice.call(arguments, 0);

  args.forEach((el) => {
    sum += el;
  });

  return sum;
}
// console.log(sum(1, 2, 3, 4, 5));

// ...<name>
// <name> is an array
function sum_with_rest(...args) {
  let sum = 0;

  args.forEach((el) => {
    sum += el;
  });

  return sum;
}
// console.log(sum_with_rest(1, 2, 3, 4, 5));



Function.prototype.myBind = function(context) {
  let outerArgs = Array.prototype.slice.call(arguments, 1);
  return (...args) => {
    // => functions have no "argument" attribute to access
    // so this function captures arguments from outside if you
    // try to use arguments
    this.apply(context, outerArgs.concat(args))
  };
}

// Function.prototype.myBind = function(context) {
//   console.log()
//   console.log(arguments);
//   outsideArgs = arguments;
//   // [context, "meow", "Kush"]
//
//   function bound_function (args) {
//     console.log(arguments)
//     console.log(outsideArgs)
//     console.log()
//     let o = Array.prototype.slice.call(outsideArgs, 1)
//     this.apply(outsideArgs[0], o.concat(Array.from(arguments)))
//   };
//
//   return bound_function.bind(this);
// // }
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// // markov.says.myBind(breakfast)("meow", "a tree");
// let says = markov.says.bind(markov);
// let bound_function = says.myBind(breakfast);
// bound_function("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true

function sumThree(num1, num2, num3){
  return num1 + num2 + num3;
}

Function.prototype.currySums = function(arg){
  let numbers = [];
  let numArgs = arg;

  return function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length === numArgs){
      return numbers.reduce((acc, cur) => acc + cur, 0);
    } else {
      return _curriedSum;
    }
  }
}

// console.log(sumThree.currySums(3)(4)(20)(6))

Function.prototype.curry = function(iterations){
  let args = [];
  let numArgs = iterations;
  return function _curried(arg) {
    args.push(arg);
    if (args.length === numArgs){
      // return this.apply(this, args);
      return this(...args);
    } else {
      return _curried.bind(this);
    }
  }.bind(this)
}

c = console.log.curry(2);
c("This ");
c("is ")
console.log(sumThree.curry(3)(4)(20)(6))
