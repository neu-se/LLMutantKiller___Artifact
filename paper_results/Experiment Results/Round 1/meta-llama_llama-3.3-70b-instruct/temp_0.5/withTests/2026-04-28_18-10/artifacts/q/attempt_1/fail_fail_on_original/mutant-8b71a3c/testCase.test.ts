import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle pending state correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.isPending()).toBe(true);
        deferred.resolve();
        expect(promise.isPending()).toBe(false);
    });
});