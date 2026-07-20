const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create prototype chain", () => {
    it("should create objects with correct prototype inheritance", () => {
        // Create a deferred which internally uses object_create
        const deferred = Q.defer();
        const promise = deferred.promise;

        // Check that the promise has the correct prototype methods
        // This verifies that object_create worked properly
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.catch).toBe('function');

        // Check the prototype chain
        const proto = Object.getPrototypeOf(promise);
        expect(proto).not.toBe(null);
        expect(proto).not.toBe(undefined);

        // In the mutated version, when Object.create exists,
        // object_create returns undefined, breaking the prototype chain
        expect(proto.constructor.name).toBe('Promise');

        // Verify the promise can actually be used
        let resolved = false;
        promise.then(() => {
            resolved = true;
        });
        deferred.resolve();

        // Give it a moment to resolve
        return new Promise((resolve) => {
            setTimeout(() => {
                expect(resolved).toBe(true);
                resolve();
            }, 10);
        });
    });
});