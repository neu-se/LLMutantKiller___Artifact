describe('Q function with nextTick', function () {
    it('should use process.nextTick when process is defined and has nextTick', function (done) {
        var originalNextTick = global.process.nextTick;
        global.process.nextTick = jest.fn();
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        Q.nextTick(function () {
            expect(global.process.nextTick).toHaveBeenCalledTimes(1);
            global.process.nextTick = originalNextTick;
            done();
        });
    });
});