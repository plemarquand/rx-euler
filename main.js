require('colors');
var Rx = require('rx'), fs = require('fs'), pathUtil = require('path');
var args = require('minimist')(process.argv.slice(2));

var answersFile = pathUtil.join(__dirname, 'src', 'answers.json');
var solutionsPath = pathUtil.join(__dirname, 'src', 'solutions');

var readDir = Rx.Observable.fromNodeCallback(fs.readdir);
var readFile = Rx.Observable.fromNodeCallback(fs.readFile);

var argumentFilter = function(sln) {
    var arg = args.s || args.solution;
    var slnNum = sln.split(".").shift().replace('ex', '');
    return arg === undefined || arg.toString().split(',').indexOf(slnNum) !== -1;
};

var runSolution = function(pkg) {
    return require(pkg.sln)().map(function(result) {
        pkg.result = result;
        return pkg;
    });
};

var formatResult = function(pkg) {
    var name = pkg.sln.split('/').pop();
    var res = name.match(/[0-9]+/)[0];
    var status = pkg.result === pkg.answers[res] ? '✓'.green : '✗'.red;
    var elapsed = Date.now() - pkg.start;
    return status + " " + (elapsed + "ms").yellow + " " + name + ":\t" + pkg.result.toString().blue.bold;
};

var answersStream = readFile(answersFile, 'utf-8').map(JSON.parse).flatMapLatest(function(answers) {
    return readDir(solutionsPath).flatMap(Rx.Observable.fromArray).filter(argumentFilter).map(function(path) {
        return {answers:answers, sln: pathUtil.join(solutionsPath, path), start: Date.now()};
    });
});

answersStream.flatMap(runSolution).map(formatResult).subscribe(console.log);
