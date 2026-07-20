import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject the promise when an error is thrown in the progress callback", () => {
        const deferred = Q.defer();
        const promise = deferred.promise.then(
            () => { },
            () => { },
            () => {
                throw new Error("Test error");
            }
        );
        deferred.resolve();
        return promise.then(
            () => {
                throw new Error("Expected promise to be rejected");
            },
            (error) => {
                expect(error.message).toBe("Test error");
            }
        );
    });
});