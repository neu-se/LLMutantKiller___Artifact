import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver error handling", () => {
    it("should reject the promise when callback is called with an error", () => {
        const deferred = Q.defer();
        const callback = deferred.makeNodeResolver();
        const testError = new Error("Test error");

        // Call the callback with an error
        callback(testError);

        return deferred.promise.then(
            () => {
                // This should not be called in the original code
                throw new Error("Promise should have been rejected but was fulfilled");
            },
            (error) => {
                // This should be called in the original code
                expect(error).toBe(testError);
            }
        );
    });
});