// A palindromic number reads the same both ways.
// The largest palindrome made from the product of two 2-digit
// numbers is 9009 = 91 × 99.
//
// Find the largest palindrome made from the product of two 3-digit numbers.
var Rx = require('rx');

function reverse(s) {
    return s.split("").reverse().join("");
}

module.exports = function() {
    var range = Rx.Observable.range(100, 899);
    return range.flatMap(function(x) {
        return Rx.Observable.range(100, 899).map(function(y) {
            return x * y;
        });
    }).filter(function(value) {
        var product = value.toString();
        return product === reverse(product);
    }).max();
};
