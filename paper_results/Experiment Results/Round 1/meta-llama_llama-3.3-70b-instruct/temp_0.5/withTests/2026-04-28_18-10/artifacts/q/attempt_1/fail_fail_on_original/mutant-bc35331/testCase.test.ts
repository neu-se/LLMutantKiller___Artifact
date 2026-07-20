import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function with nextTick', function () {
    it('should use nextTick when process is defined and has nextTick', function (done) {
        var nextTickSpy = jest.spyOn(process, 'nextTick');
        Q.nextTick(function () {
            expect(nextTickSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should use setImmediate when process is not defined or does not have nextTick', function (done) {
        var setImmediateSpy = jest.spyOn(global, 'setImmediate');
        delete process.nextTick;
        Q.nextTick(function () {
            expect(setImmediateSpy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});