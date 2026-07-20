import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method domain binding", () => {
    it("should properly bind to process.domain when it exists", (done) => {
        // Store original process.domain
        const originalDomain = process.domain;
        const originalBind = originalDomain?.bind;

        // Create a mock domain with a spy on bind
        const mockDomain = {
            bind: jest.fn((fn) => {
                return function(...args) {
                    return fn.apply(this, args);
                };
            })
        };

        // Temporarily replace process.domain
        process.domain = mockDomain;

        const deferred = Q.defer();
        const error = new Error("test error");

        Q.onerror = (err) => {
            // Verify the error was handled
            expect(err).toBe(error);

            // Check if bind was called (should be called in original code)
            expect(mockDomain.bind).toHaveBeenCalled();

            // Restore original domain
            process.domain = originalDomain;
            if (originalDomain && originalBind) {
                originalDomain.bind = originalBind;
            }

            done();
        };

        // Trigger the done method with an error
        deferred.promise.done();
        deferred.reject(error);
    });
});