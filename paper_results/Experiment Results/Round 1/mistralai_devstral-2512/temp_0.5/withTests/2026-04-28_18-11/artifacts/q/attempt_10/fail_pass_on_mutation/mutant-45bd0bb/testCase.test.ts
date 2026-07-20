const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with proper prototype chain", () => {
        // Create a test object with a specific prototype
        const testProto = {
            testMethod: function() {
                return "works";
            }
        };

        // Test that we can create objects with this prototype
        // This should work with both the original and fallback implementations
        const obj = Object.create(testProto);
        expect(obj.testMethod()).toBe("works");

        // Now test Q's internal object creation by creating a promise
        // This uses object_create internally
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
    });
});