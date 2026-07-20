const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should use fallback when Object.create is not available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create unavailable by deleting it
            delete Object.create;

            // Test that Q can still create promises using the fallback
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify the promise has the expected methods
            expect(typeof promise.then).toBe("function");

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