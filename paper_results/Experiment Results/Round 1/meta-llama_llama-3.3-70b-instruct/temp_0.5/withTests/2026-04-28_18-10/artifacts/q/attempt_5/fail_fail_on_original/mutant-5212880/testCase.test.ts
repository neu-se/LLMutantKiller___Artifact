import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", () => {
        var called = false;
        var promise = q(1);
        promise.done(function () {
            called = true;
        }, function () { }, function () { });
        expect(called).toBe(true);
    });
});