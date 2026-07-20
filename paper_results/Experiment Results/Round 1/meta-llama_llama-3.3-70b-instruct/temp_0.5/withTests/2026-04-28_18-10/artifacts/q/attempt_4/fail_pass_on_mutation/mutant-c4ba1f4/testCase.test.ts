import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should call the callback function after a short delay when setImmediate is available", function (done) {
        var called = false;
        if (typeof global.setImmediate === 'function') {
            Q.nextTick(function () {
                called = true;
            });
            expect(called).toBe(false);
            setTimeout(function () {
                expect(called).toBe(true);
                done();
            }, 10);
        } else {
            expect(true).toBe(false);
        }
    });
});