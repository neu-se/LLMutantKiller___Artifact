import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver behavior", () => {
    it("should reject the promise when an error is provided", () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        const testError = new Error("Test error");

        resolver(testError);

        return deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (error) => {
                expect(error).toBe(testError);
            }
        );
    });
});