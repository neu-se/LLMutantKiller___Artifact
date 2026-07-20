describe('Q function with nextTick', function () {
    it('should throw an error when process.toString is an empty string and nextTick is called', function () {
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        var originalToString = global.process.toString;
        global.process.toString = function() { return ""; };
        expect(function() { Q.nextTick(function () {}); }).toThrow();
        global.process.toString = originalToString;
    });
});