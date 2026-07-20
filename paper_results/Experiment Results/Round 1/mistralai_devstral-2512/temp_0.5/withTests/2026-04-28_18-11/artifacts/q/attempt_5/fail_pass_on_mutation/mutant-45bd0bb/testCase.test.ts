const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with correct prototype when Object.create is not available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create return undefined to force fallback usage
            Object.create = function() {
                return undefined;
            };

            // Create a test object using Q's internal object creation
            // This should use the fallback implementation
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify the promise has the expected prototype methods
            expect(typeof promise.then).toBe("function");
            expect(typeof promise.catch).toBe("function");

            // Test that the promise actually works
            deferred.resolve(42);
            return promise.then(function(value) {
                expect(value).toBe(42);
            });

        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});