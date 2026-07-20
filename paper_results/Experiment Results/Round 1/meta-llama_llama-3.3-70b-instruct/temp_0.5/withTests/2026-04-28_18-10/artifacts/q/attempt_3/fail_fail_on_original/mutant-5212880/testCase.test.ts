import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", () => {
        var called = false;
        var promise = q.Q();
        promise.done(function () {
            called = true;
        }, function () { }, function () { });
        promise.then(function () { });
        expect(called).toBe(true);
    });
});