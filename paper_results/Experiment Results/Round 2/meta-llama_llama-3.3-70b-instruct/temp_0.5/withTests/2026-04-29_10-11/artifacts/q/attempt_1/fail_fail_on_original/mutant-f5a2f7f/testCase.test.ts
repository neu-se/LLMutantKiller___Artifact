import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        expect.hasAssertions();
        const error = new Error("Test error");
        const deferred = Q.defer();
        deferred.reject(error);
        return Q.when(deferred.promise, null, (reason) => {
            expect(reason).toBe(error);
        });
    });
});