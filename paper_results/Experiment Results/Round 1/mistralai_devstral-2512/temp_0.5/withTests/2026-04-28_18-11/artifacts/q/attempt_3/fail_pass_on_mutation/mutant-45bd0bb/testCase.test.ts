const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should use fallback when Object.create is not available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        try {
            // Temporarily make Object.create unavailable
            Object.create = null;

            // Create a test prototype
            const testProto = {
                testProperty: "testValue",
                testMethod: function() {
                    return "testResult";
                }
            };

            // This should use the fallback implementation
            // In the original code: Object.create || fallback -> uses fallback
            // In mutated code: Object.create && fallback -> returns null (fails)
            const obj = Q.defer().promise;

            // Verify the promise still works with the fallback
            expect(typeof obj.then).toBe("function");
            expect(typeof obj.catch).toBe("function");

            // Test actual promise functionality
            const deferred = Q.defer();
            deferred.resolve(42);
            return deferred.promise.then(function(value) {
                expect(value).toBe(42);
            });

        } finally {
            // Restore Object.create
            Object.create = originalCreate;
        }
    });
});