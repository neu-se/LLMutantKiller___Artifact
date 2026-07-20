const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with correct prototype chain when Object.create is unavailable", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create return null to force fallback usage
            Object.create = function() {
                return null;
            };

            // Test that Q can still create promises using the fallback
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify the promise has the expected methods from its prototype
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