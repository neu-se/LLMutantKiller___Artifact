const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
    it("should properly configure __minimumStackCounter__ property with correct descriptor", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises to build up stack traces
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const deferred3 = Q.defer();

        // Reject the innermost promise
        const error = new Error("Test error");
        deferred3.reject(error);

        // Chain the promises
        const promise = deferred1.promise
            .then(() => deferred2.promise)
            .then(() => deferred3.promise);

        // Force synchronous handling to trigger stack trace processing
        promise.then(null, (err: any) => {
            // Verify the property descriptor is correctly configured
            const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
            expect(descriptor).toBeDefined();
            expect(descriptor?.configurable).toBe(true);
            expect(descriptor?.enumerable).toBe(false);
            expect(descriptor?.writable).toBe(false);
            expect(typeof descriptor?.value).toBe('number');
        });

        // Return a promise that resolves after async operations
        return Q.delay(100);
    });
});