import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value of the promise", () => {
        var called = false;
        var promise = Q("foo")
            .tap(function (value) {
                called = true;
                expect(value).toBe("foo");
            });
        return promise.then(function () {
            expect(called).toBe(true);
        });
    });

    it("should not call the callback if the promise is rejected", () => {
        var called = false;
        var promise = Q.reject("error")
            .tap(function (value) {
                called = true;
            });
        return promise.then(null, function () {
            expect(called).toBe(false);
        });
    });

    it("should return a promise that fulfills with the original value", () => {
        var promise = Q("foo")
            .tap(function () {
                return "bar";
            });
        return promise.then(function (value) {
            expect(value).toBe("foo");
        });
    });

    it("should return a promise that rejects with the original reason if the callback throws", () => {
        var error = new Error("test");
        var promise = Q("foo")
            .tap(function () {
                throw error;
            });
        return promise.then(null, function (reason) {
            expect(reason).toBe(error);
        });
    });
});