import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q defer", () => {
    it("should resolve a promise when given a value", () => {
        const deferred = Q.defer();
        deferred.resolve(5);
        expect(deferred.promise.isFulfilled()).toBe(true);
    });

    it("should reject a promise when given an error", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        deferred.reject(error);
        expect(deferred.promise.isRejected()).toBe(true);
        expect(deferred.promise.inspect().reason).toBe(error);
    });
});