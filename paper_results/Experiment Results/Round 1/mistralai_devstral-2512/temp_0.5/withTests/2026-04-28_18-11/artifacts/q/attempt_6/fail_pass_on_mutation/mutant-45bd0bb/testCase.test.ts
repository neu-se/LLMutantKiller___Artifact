const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should use fallback implementation when Object.create is not available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create unavailable by setting it to false
            Object.create = false;

            // Test that Q can still create promises using the fallback
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify basic promise functionality
            expect(typeof promise.then).toBe("function");

            // Test promise resolution
            deferred.resolve("test");
            return promise.then(function(value) {
                expect(value).toBe("test");
            });

        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});