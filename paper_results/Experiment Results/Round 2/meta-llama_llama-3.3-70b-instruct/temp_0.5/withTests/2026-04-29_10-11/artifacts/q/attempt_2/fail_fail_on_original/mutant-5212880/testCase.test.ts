import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the callback when done is called with a fulfilled promise", () => {
        var called = false;
        var promise = Q.resolve();
        var originalDone = promise.done;
        promise.done = function(fulfilled, rejected, progress) {
            originalDone.call(promise, fulfilled, rejected, progress);
            expect(fulfilled).not.toBeUndefined();
        };
        promise.done(function () {
            called = true;
        });
        expect(called).toBe(true);
    });
});