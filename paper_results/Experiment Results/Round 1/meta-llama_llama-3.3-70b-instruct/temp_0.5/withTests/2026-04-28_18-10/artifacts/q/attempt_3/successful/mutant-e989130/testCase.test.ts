import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q defer", () => {
    it("should resolve a promise when given a value", () => {
        const deferred = q.defer();
        deferred.resolve(5);
        expect(deferred.promise.isFulfilled()).toBe(true);
    });

    it("should reject a promise when given an error", () => {
        const deferred = q.defer();
        const error = new Error("Test error");
        deferred.reject(error);
        expect(deferred.promise.isRejected()).toBe(true);
        expect(deferred.promise.inspect().reason).toBe(error);
    });

    it("should inspect a pending promise", () => {
        const deferred = q.defer();
        expect(deferred.promise.inspect().state).toBe("pending");
    });
});