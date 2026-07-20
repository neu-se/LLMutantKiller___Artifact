import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle valueOf correctly for pending promises", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
        deferred.resolve();
        expect(promise.valueOf()).not.toBe(promise);
    });
});