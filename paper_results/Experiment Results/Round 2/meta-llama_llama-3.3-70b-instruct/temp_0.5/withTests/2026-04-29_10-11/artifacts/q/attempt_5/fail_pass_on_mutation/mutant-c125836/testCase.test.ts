import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise when given a value", () => {
        var value = 10;
        var promise = Q(value);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(10);
    });

    it("should return a promise when given a promise", () => {
        var promise = Q(10);
        var result = Q(promise);
        expect(result.isFulfilled()).toBe(true);
        expect(result.inspect().value).toBe(10);
    });

    it("should return a rejected promise when given a rejected promise", () => {
        var error = new Error("Test error");
        var promise = Q.reject(error);
        var result = Q(promise);
        expect(result.isRejected()).toBe(true);
        expect(result.inspect().reason).toBe(error);
    });
});