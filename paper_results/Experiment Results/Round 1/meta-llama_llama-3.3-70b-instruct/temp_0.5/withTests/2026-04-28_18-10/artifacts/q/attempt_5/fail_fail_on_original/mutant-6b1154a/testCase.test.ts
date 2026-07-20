import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        var promise = Q(10);
        var called = false;
        promise.then(function (value) {
            called = true;
            expect(value).toBe(10);
        });
        expect(called).toBe(false);
        promise.done(function (value) {
            expect(value).toBe(10);
        }, function () {
            expect(true).toBe(false);
        }, function (progress) {
            expect(progress).toBeUndefined();
        });
        expect(called).toBe(true);
    });
});