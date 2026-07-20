const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("domain exit behavior", () => {
    it("should properly handle domain exit in error scenarios", (done) => {
        // Track whether domain.exit was called
        let domainExited = false;

        // Mock a domain-like object
        const mockDomain = {
            enter: () => {},
            exit: () => { domainExited = true; },
            active: true
        };

        // Store original process.domain
        const originalDomain = process.domain;

        // Set up a domain context
        process.domain = mockDomain;

        // Create a promise that will throw an error
        const deferred = Q.defer();

        // Set up error handling
        Q.onerror = (error) => {
            // In the original code, domain.exit() should have been called before we get here
            // In the mutated code, it won't be called
            process.domain = originalDomain;
            expect(domainExited).toBe(true);
            done();
        };

        // Trigger the error path
        Q.nextTick(() => {
            deferred.reject(new Error("Test error"));
        });

        // Attach an error handler that will trigger the domain exit check
        deferred.promise.then(null, (error) => {
            // This should trigger the domain exit in the original code
            throw error;
        });
    });
});