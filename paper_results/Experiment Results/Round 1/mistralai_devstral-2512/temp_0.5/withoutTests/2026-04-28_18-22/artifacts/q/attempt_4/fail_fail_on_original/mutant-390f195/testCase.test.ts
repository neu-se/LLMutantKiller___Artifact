const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
    it("should properly configure __minimumStackCounter__ property", (done) => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises to build up stack traces
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const deferred3 = Q.defer();

        // Reject the innermost promise
        deferred3.reject(new Error("Test error"));

        // Chain the promises
        const promise = deferred1.promise
            .then(() => deferred2.promise)
            .then(() => deferred3.promise);

        promise.then(
            () => {
                done(new Error("Promise should have rejected"));
            },
            (error: any) => {
                try {
                    // Check that the error has the expected property configuration
                    expect(error).toHaveProperty("__minimumStackCounter__");
                    const descriptor = Object.getOwnPropertyDescriptor(error, "__minimumStackCounter__");
                    expect(descriptor?.configurable).toBe(true);
                    expect(descriptor?.value).toBeDefined();
                    done();
                } catch (assertionError) {
                    done(assertionError);
                }
            }
        );
    }, 10000);
});