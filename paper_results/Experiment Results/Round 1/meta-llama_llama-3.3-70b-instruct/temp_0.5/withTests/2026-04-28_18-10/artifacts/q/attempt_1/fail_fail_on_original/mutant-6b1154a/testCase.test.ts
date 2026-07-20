import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        var called = false;
        var promise = Q(10);
        var returnValue = promise.done(function () {
            called = true;
        });
        return promise.fail(function () { }).fin(function () {
            expect(called).toBe(true);
            expect(returnValue).toBeUndefined();
        });
    });
});