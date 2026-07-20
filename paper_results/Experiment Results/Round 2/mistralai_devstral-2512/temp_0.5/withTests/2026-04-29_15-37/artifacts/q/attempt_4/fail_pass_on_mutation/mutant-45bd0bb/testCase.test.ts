const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create behavior", () => {
    it("should create objects with correct prototype chain", () => {
        // Create a test prototype
        const testProto = {
            testMethod: function() {
                return "from prototype";
            }
        };

        // Create a deferred which internally uses object_create
        const deferred = Q.defer();

        // Get the promise's prototype chain
        const promise = deferred.promise;
        const promiseProto = Object.getPrototypeOf(promise);

        // The promise should have the correct prototype methods
        // This tests that object_create worked properly
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.catch).toBe('function');

        // In the mutated version, if Object.create exists but the fallback
        // isn't used properly, the prototype chain might be broken
        expect(promiseProto).not.toBe(null);
        expect(promiseProto).not.toBe(undefined);
    });
});