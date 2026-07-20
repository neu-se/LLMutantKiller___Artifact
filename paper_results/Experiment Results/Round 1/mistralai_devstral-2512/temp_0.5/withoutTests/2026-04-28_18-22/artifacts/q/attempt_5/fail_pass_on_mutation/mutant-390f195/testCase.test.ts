const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
    it("should properly configure __minimumStackCounter__ property", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a simple rejected promise
        const deferred = Q.defer();
        const error = new Error("Test error");
        deferred.reject(error);

        // Force the promise to be handled to trigger long stack trace processing
        deferred.promise.then(null, (err: any) => {
            // Check that the error has the expected property configuration
            expect(err).toHaveProperty("__minimumStackCounter__");
            const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
            expect(descriptor?.configurable).toBe(true);
            expect(descriptor?.value).toBeDefined();
        });

        // Give the async operations time to complete
        return new Promise(resolve => setTimeout(resolve, 100));
    });
});