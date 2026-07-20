const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
    it("should properly set __minimumStackCounter__ value", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a simple rejected promise that will trigger stack trace processing
        const deferred = Q.defer();
        const error = new Error("Test error");
        deferred.reject(error);

        // Return a promise that checks the error property after handling
        return deferred.promise.then(null, (err: any) => {
            // The mutation removes the value property from the descriptor
            // This will fail on mutated code because value won't be set
            expect(err).toHaveProperty("__minimumStackCounter__");
            expect(err.__minimumStackCounter__).toBeDefined();
            expect(typeof err.__minimumStackCounter__).toBe('number');
        });
    });
}, 10000);