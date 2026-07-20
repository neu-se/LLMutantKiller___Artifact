import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should call the callback function after a short delay", function (done) {
        var called = false;
        Q.nextTick(function () {
            called = true;
        });
        expect(called).toBe(false);
        setTimeout(function () {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});