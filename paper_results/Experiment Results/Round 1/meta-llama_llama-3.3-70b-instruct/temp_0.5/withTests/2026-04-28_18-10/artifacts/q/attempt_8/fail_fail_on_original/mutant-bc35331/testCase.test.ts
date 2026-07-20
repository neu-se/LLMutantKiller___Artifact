describe('Q function with nextTick', function () {
    it('should throw an error when nextTick is called without process.nextTick', function () {
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        var originalNextTick = global.process.nextTick;
        delete global.process.nextTick;
        expect(function() { Q.nextTick(function () {}); }).toThrow();
        global.process.nextTick = originalNextTick;
    });
});