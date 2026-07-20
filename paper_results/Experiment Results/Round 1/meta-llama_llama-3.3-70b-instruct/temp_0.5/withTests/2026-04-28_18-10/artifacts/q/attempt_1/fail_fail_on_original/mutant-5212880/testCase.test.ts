import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the done callback when the promise is fulfilled", () => {
        var called = false;
        var promise = Q();
        var returnValue = promise.done(function () {
            called = true;
        });
        return promise.fail(function () { }).fin(function () {
            expect(called).toBe(true);
            expect(returnValue).toBe(undefined);
        });
    });
});