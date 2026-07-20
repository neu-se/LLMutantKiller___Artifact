describe('Q function with nextTick', function () {
    it('should use process.nextTick when process is defined and has nextTick', function (done) {
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        var originalNextTick = global.process.nextTick;
        global.process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(global.process.nextTick).toHaveBeenCalledTimes(1);
            global.process.nextTick = originalNextTick;
            done();
        });
    });
});