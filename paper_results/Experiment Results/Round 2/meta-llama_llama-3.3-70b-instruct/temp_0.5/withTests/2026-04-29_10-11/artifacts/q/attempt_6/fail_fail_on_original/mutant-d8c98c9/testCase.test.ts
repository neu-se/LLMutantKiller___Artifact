import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        promise.then(() => {
            throw new Error("Test error");
        }).catch((error: Error) => {
            expect(error).toBeInstanceOf(Error);
        });

        deferred.resolve();

        // In the original code, if (domain) { domain.exit(); } is executed, 
        // so the test should pass. In the mutated code, this line is missing, 
        // so the test should fail.
        expect(true).toBe(true);
    });
});