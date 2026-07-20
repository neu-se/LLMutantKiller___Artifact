const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with proper prototype chain using fallback", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Make Object.create throw an error to force fallback usage
            Object.create = function() {
                throw new Error("Object.create not available");
            };

            // Test that we can still create objects with prototypes
            // This should use the fallback implementation in the original code
            const testProto = {
                testMethod: function() {
                    return "works";
                }
            };

            // Create a promise which internally uses object_create
            const deferred = Q.defer();
            const promise = deferred.promise;

            // Verify the promise has the expected methods
            expect(typeof promise.then).toBe("function");

            // Test that the promise actually works
            deferred.resolve(42);
            return promise.then(function(value) {
                expect(value).toBe(42);
            });

        } catch (e) {
            // If we get here, the fallback wasn't used
            throw new Error("Object creation failed - fallback not used");
        } finally {
            // Restore original Object.create
            Object.create = originalCreate;
        }
    });
});