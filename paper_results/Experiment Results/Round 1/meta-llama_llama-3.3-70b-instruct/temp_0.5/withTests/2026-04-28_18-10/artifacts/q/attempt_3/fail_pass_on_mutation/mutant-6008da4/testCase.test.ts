import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should detect the mutation in nextTick function", () => {
        // Create a deferred object
        const deferred = q.defer();

        // Use nextTick to resolve the deferred object
        q.nextTick(() => {
            deferred.resolve();
        });

        // If the mutation is present, nextTick should not be called immediately
        // So, the promise should still be pending
        expect(deferred.promise.isPending()).toBe(true);
    });
});