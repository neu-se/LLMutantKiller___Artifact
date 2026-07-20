const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation detection", () => {
    it("should expose the object_create mutation", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Temporarily make Object.create return undefined to test fallback
            Object.create = () => undefined;

            // Create a deferred which internally uses object_create
            // In the original code, this should use the fallback
            // In the mutated code, this will fail because object_create returns undefined
            const deferred = Q.defer();

            // Try to use the deferred
            let promiseCreated = false;
            try {
                const promise = deferred.promise;
                promiseCreated = true;
            } catch (e) {
                // This should happen in the mutated version
            }

            // In original code, promise should be created successfully
            // In mutated code, this will fail
            expect(promiseCreated).toBe(true);
        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});