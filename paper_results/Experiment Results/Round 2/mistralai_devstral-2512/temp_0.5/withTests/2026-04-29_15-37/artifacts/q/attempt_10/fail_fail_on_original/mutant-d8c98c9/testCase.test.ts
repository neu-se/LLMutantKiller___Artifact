const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("domain exit behavior", () => {
    it("should properly exit domain when error occurs", (done) => {
        // Track domain exit calls
        let domainExitCalled = false;

        // Create a mock domain
        const mockDomain = {
            enter: () => {},
            exit: () => { domainExitCalled = true; },
            active: true
        };

        // Store original process.domain
        const originalDomain = (process as any).domain;

        // Create a deferred promise
        const deferred = Q.defer();

        // Set up error handling
        Q.onerror = (error: any) => {
            // In original code, domain.exit() should have been called
            // In mutated code, it won't be called
            expect(domainExitCalled).toBe(true);
            (process as any).domain = originalDomain;
            done();
        };

        // Create a task that will throw an error
        const errorTask = () => {
            // Set the domain for this execution
            (process as any).domain = mockDomain;
            deferred.reject(new Error("Test error"));
        };

        // Execute the task
        Q.nextTick(errorTask);

        // Attach error handler to trigger the error path
        deferred.promise.then(null, (error: any) => {
            throw error;
        });
    });
});