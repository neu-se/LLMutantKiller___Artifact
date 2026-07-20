import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should call the callback function after a short delay using setImmediate", function (done) {
        var called = false;
        var originalSetImmediate = global.setImmediate;
        var spy = jest.fn();
        global.setImmediate = spy;
        Q.nextTick(function () {
            called = true;
        });
        expect(called).toBe(false);
        expect(spy).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
        setTimeout(function () {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});