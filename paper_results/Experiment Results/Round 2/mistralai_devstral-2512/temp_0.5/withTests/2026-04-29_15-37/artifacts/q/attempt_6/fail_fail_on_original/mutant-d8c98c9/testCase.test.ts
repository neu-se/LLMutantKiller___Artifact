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

        // Create a promise that will throw an error
        const deferred = Q.defer();

        // Override the internal nextTick implementation to inject our mock domain
        const originalNextTick = Q.nextTick;
        Q.nextTick = function(task: any) {
            // Simulate the internal behavior with our mock domain
            const head = { task: void 0, next: null };
            const tail = head;
            tail.next = { task: task, domain: mockDomain, next: null };

            // Call the task
            task();

            // Restore original nextTick
            Q.nextTick = originalNextTick;
        };

        // Set up error handling
        Q.onerror = (error: any) => {
            // In the original code, domain.exit() should have been called before we get here
            // In the mutated code, it won't be called
            expect(domainExited).toBe(true);
            done();
        };

        // Trigger the error path
        Q.nextTick(() => {
            deferred.reject(new Error("Test error"));
        });

        // Attach an error handler that will trigger the domain exit check
        deferred.promise.then(null, (error: any) => {
            // This should trigger the domain exit in the original code
            throw error;
        });
    });
});