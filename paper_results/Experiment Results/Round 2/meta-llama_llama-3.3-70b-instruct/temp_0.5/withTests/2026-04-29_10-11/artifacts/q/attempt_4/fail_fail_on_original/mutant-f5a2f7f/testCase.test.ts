import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const deferred = Q.defer();
        deferred.resolve();
        const promise = Q.when(deferred.promise, () => {
            return Q();
        });
        expect(promise.isPending()).toBe(false);
    });
});