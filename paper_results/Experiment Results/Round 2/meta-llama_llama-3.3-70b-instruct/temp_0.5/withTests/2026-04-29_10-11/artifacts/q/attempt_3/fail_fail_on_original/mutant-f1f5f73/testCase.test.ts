import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var called = false;
        var promise = Q("foo");
        return promise.tap(function (value) {
            called = true;
            expect(value).toBe("foo");
        }).then(function () {
            expect(called).toBe(true);
        });
    });

    it("should not call the callback if the promise is rejected", () => {
        var called = false;
        var promise = Q.reject("error");
        return promise.tap(function (value) {
            called = true;
        }).then(null, function () {
            expect(called).toBe(false);
        });
    });
});