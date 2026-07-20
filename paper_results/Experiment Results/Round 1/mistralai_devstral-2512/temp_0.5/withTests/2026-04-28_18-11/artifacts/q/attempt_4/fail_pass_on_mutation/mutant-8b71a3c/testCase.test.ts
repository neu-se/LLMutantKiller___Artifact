import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise itself when pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const result = promise.valueOf();
        expect(result).toBe(promise);
        expect(result).not.toBeUndefined();
    });
});