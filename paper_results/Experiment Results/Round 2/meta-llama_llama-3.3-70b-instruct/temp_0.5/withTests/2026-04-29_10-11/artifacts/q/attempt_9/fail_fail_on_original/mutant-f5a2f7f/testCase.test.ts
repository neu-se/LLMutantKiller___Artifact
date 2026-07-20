import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const deferred = Q.defer();
        const promise = Q.when(deferred.promise, () => {
            return Q();
        });
        deferred.resolve();
        expect(promise.isPending()).toBe(false);
    });
});