import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the callback when done is called with a fulfilled promise", () => {
        var called = false;
        var promise = q.Q.resolve();
        promise.done(function () {
            called = true;
        });
        expect(called).toBe(true);
    });
});