import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function with nextTick', function () {
    it('should use process.nextTick when process is defined and has nextTick', function (done) {
        var originalNextTick = process.nextTick;
        process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(process.nextTick).toHaveBeenCalledTimes(1);
            process.nextTick = originalNextTick;
            done();
        });
    });

    it('should use setImmediate when process is defined but does not have nextTick', function (done) {
        var originalNextTick = process.nextTick;
        delete process.nextTick;
        var originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();
        Q.nextTick(function () {
            expect(global.setImmediate).toHaveBeenCalledTimes(1);
            process.nextTick = originalNextTick;
            global.setImmediate = originalSetImmediate;
            done();
        });
    });
});