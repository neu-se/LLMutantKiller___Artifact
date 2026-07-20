import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer", () => {
    it("should reject the promise when an error is passed to the makeNodeResolver function", () => {
        const deferred = Q.defer();
        const nodeResolver = deferred.makeNodeResolver();
        nodeResolver(new Error("Test error"), null);
        return deferred.promise.then(() => {
            throw new Error("Promise should have been rejected");
        }).catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });
});