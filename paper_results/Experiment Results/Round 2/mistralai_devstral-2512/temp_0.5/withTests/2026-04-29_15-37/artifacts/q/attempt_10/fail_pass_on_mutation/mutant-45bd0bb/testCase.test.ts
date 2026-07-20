const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation detection", () => {
    it("should detect broken object creation in mutated code", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create return null to force fallback path
            Object.create = () => null;

            // Create a deferred which internally uses object_create
            // In original code: uses fallback function
            // In mutated code: object_create returns undefined
            let errorThrown = false;
            try {
                const deferred = Q.defer();
                const promise = deferred.promise;

                // Try to use the promise
                promise.then(() => {});
            } catch (e) {
                errorThrown = true;
            }

            // In original code: no error (fallback works)
            // In mutated code: error thrown (object_create returns undefined)
            expect(errorThrown).toBe(false);
        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});