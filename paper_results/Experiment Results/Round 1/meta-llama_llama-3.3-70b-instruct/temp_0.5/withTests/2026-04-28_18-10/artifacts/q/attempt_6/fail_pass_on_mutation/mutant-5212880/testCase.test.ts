import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", (done) => {
        var called = false;
        var promise = q(1);
        promise.done(function () {
            called = true;
        }, function () { }, function () { });
        promise.then(function () {
            expect(called).toBe(true);
            done();
        });
    });
});