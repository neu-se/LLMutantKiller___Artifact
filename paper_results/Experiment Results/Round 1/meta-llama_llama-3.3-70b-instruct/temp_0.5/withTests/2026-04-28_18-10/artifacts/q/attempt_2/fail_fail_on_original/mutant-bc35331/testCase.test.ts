import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function with nextTick', function () {
    it('should use nextTick when process is defined and has nextTick', function (done) {
        var originalNextTick = process.nextTick;
        process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(process.nextTick).toHaveBeenCalledTimes(1);
            process.nextTick = originalNextTick;
            done();
        });
    });

    it('should not use nextTick when process.toString is an empty string', function (done) {
        var originalProcessToString = process.toString;
        process.toString = function() { return ""; };
        var originalNextTick = process.nextTick;
        process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(process.nextTick).not.toHaveBeenCalled();
            process.toString = originalProcessToString;
            process.nextTick = originalNextTick;
            done();
        });
    });
});