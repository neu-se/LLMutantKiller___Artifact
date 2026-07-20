const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create fallback behavior", () => {
    it("should use fallback when Object.create fails", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create throw an error to simulate an environment
            // where it doesn't work properly
            Object.create = () => {
                throw new Error("Object.create failed");
            };

            // Create a deferred which internally uses object_create
            // In the original code, this should use the fallback
            // In the mutated code, this will fail because object_create returns undefined
            let errorThrown = false;
            try {
                const deferred = Q.defer();
                const promise = deferred.promise;

                // Try to use the promise
                promise.then(() => {});
            } catch (e) {
                errorThrown = true;
            }

            // In original code, no error should be thrown (fallback works)
            // In mutated code, error will be thrown
            expect(errorThrown).toBe(false);
        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});