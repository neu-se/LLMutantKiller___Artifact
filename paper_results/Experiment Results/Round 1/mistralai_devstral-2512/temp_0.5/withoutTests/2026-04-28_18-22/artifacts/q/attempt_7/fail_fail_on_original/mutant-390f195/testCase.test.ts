const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
    it("should properly set __minimumStackCounter__ value", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will trigger long stack trace processing
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const deferred3 = Q.defer();

        const error = new Error("Test error");
        deferred3.reject(error);

        const promise = deferred1.promise
            .then(() => deferred2.promise)
            .then(() => deferred3.promise);

        // Force the error handling to occur
        return promise.then(
            () => {
                throw new Error("Promise should have rejected");
            },
            (err: any) => {
                // The mutation removes the value property from the descriptor
                // This will fail on mutated code because value won't be set
                expect(err.__minimumStackCounter__).toBeDefined();
                expect(typeof err.__minimumStackCounter__).toBe('number');
            }
        );
    });
});