const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation detection", () => {
    it("should detect broken object_create implementation", () => {
        // This test directly checks if object_create works correctly
        // by creating an object with a specific prototype

        // Create a test prototype
        const testProto = {
            testProperty: "testValue",
            testMethod: function() {
                return this.testProperty;
            }
        };

        // Try to create an object using the internal object_create
        // We'll do this by creating a deferred and checking its promise
        const deferred = Q.defer();
        const promise = deferred.promise;

        // In the original code, promise should have the correct prototype chain
        // In the mutated code, object_create returns undefined when Object.create exists
        // which would break the prototype chain

        // Verify the promise has essential methods
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.catch).toBe('function');

        // Verify the prototype chain is intact
        const proto = Object.getPrototypeOf(promise);
        expect(proto).not.toBe(null);
        expect(proto).not.toBe(undefined);

        // The critical test: verify we can actually use the promise
        let testPassed = false;
        promise.then(() => {
            testPassed = true;
        });
        deferred.resolve();

        return new Promise((resolve) => {
            setTimeout(() => {
                expect(testPassed).toBe(true);
                resolve();
            }, 10);
        });
    });
});