import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should use setImmediate when available", function (done) {
        var originalSetImmediate = global.setImmediate;
        var spy = jest.fn();
        global.setImmediate = spy;
        Q.nextTick(function () {
            done();
        });
        expect(spy).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
    });
});