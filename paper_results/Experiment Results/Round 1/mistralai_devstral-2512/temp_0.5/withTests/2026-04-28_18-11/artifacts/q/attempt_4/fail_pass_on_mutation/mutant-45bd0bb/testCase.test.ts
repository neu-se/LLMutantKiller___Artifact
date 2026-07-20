const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with proper prototype chain when Object.create is unavailable", () => {
        // Save original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create throw an error to force fallback usage
            Object.create = function() {
                throw new Error("Object.create not available");
            };

            // Test that Q can still create promises using the fallback
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify basic promise functionality works
            expect(typeof promise.then).toBe("function");

            // Test actual promise resolution
            deferred.resolve("test value");
            return promise.then(function(value) {
                expect(value).toBe("test value");
            });

        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});