// The prime factors of 13195 are 5, 7, 13 and 29.
//
// What is the largest prime factor of the number 600851475143?
var Rx = require('rx');
module.exports = function(callback) {
    return Rx.Observable.create(function(observer) {
        // http://stackoverflow.com/questions/23287/largest-prime-factor-of-a-number
        var n = 600851475143, d = 2;
        while(n > 1) {
            while(n % d === 0) {
                observer.onNext(d);
                n /= d;
            }
            d = d + 1;
            if(d * d > n) {
                if(n > 1) {
                    observer.onNext(n);
                }
                break;
            }
        }
        observer.onCompleted();
    }).max();
};
