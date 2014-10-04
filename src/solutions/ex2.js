// Each new term in the Fibonacci sequence is generated by adding the previous two terms.
// By starting with 1 and 2, the first 10 terms will be:
//
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
//
// By considering the terms in the Fibonacci sequence whose values do not exceed four million,
// find the sum of the even-valued terms.
var Rx = require('rx');

module.exports = () => {
    // a simple source that outputs the Fibonacci sequence up to 4,000,000.
    var fibSource = Rx.Observable.create(observer => {
        var term1 = 1, term2 = 1;
        while(term2 < 4000000) {
            var fib = term1 + term2;
            observer.onNext(fib);
            term1 = term2;
            term2 = fib;
        }
        observer.onCompleted();
    });

    return fibSource
        .filter(x => x % 2 === 0)
        .aggregate(0, (memo, x) => memo + x);
};
