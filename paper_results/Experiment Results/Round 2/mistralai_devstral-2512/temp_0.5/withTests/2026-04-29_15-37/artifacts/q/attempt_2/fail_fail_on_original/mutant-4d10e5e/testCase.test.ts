import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace behavior", () => {
    it("should not include stack traces when hasStacks is false", () => {
        const error = new Error("Test error");
        const deferred = Q.defer();
        deferred.reject(error);

        return deferred.promise.catch((e: Error) => {
            // In the original code (hasStacks = false), the stack should not be modified
            // In the mutated code (hasStacks = true), the stack would be modified
            expect(e.stack).toBe(error.stack);
        });
    });
});