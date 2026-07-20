const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation detection", () => {
    it("should expose the object_create mutation by testing prototype inheritance", () => {
        // Create a deferred which internally uses object_create
        const deferred = Q.defer();
        const promise = deferred.promise;

        // Get the prototype of the promise
        const proto = Object.getPrototypeOf(promise);

        // In the original code, the prototype should be properly set up
        // In the mutated code, object_create returns undefined when Object.create exists
        // which would break the prototype chain

        // Verify the promise has the expected methods from its prototype
        expect(typeof proto.then).toBe('function');
        expect(typeof proto.catch).toBe('function');

        // The critical test: verify the prototype chain is intact
        // In the mutated version, this will fail because object_create returns undefined
        expect(proto).toBe(Q.Promise.prototype);

        // Additional verification that the promise works
        let resolved = false;
        promise.then(() => {
            resolved = true;
        });
        deferred.resolve();

        return new Promise((resolve) => {
            setTimeout(() => {
                expect(resolved).toBe(true);
                resolve();
            }, 10);
        });
    });
});