const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create fallback", () => {
    it("should use fallback when Object.create is not available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Simulate an environment where Object.create is not available
            Object.create = undefined;

            // Create a test object to use as prototype
            const proto = { testProp: "testValue" };

            // Use Q to create a promise that will internally use object_create
            // This will test if the fallback mechanism works correctly
            const deferred = Q.defer();

            // Check if the deferred object was created successfully
            // In the mutated version, this will fail because the fallback
            // won't be used when Object.create is undefined
            expect(deferred).toBeDefined();
            expect(deferred.promise).toBeDefined();
        } finally {
            // Always restore Object.create
            Object.create = originalCreate;
        }
    });
});