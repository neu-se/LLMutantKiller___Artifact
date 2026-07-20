import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", () => {
        var called = false;
        var value = "foo";
        return Q(value).tap(function () {
            called = true;
        }).then(function () {
            expect(called).toBe(true);
        });
    });

    it("should not call the callback when the promise is rejected", () => {
        var called = false;
        var error = new Error("bar");
        return Q.reject(error).tap(function () {
            called = true;
        }).then(null, function () {
            expect(called).toBe(false);
        });
    });

    it("should return a promise that fulfills with the original value", () => {
        var value = "foo";
        return Q(value).tap(function () {}).then(function (result) {
            expect(result).toBe(value);
        });
    });

    it("should return a promise that rejects with the original reason", () => {
        var error = new Error("bar");
        return Q.reject(error).tap(function () {}).then(null, function (reason) {
            expect(reason).toBe(error);
        });
    });
});