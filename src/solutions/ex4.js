// A palindromic number reads the same both ways.
// The largest palindrome made from the product of two 2-digit
// numbers is 9009 = 91 × 99.
//
// Find the largest palindrome made from the product of two 3-digit numbers.
var Rx = require('rx');

function reverse(s) {
    return s.split("").reverse().join("");
}

module.exports = () => {
    return Rx.Observable.range(100, 899)
        .flatMap(x => Rx.Observable.range(100, 899).map(y => x * y))
        .filter(value => value.toString() === reverse(value.toString()))
        .max();
};
