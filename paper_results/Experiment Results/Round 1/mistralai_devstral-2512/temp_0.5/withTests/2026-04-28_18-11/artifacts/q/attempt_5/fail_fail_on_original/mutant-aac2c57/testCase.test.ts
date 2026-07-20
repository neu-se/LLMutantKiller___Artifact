// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process domain handling in done()", () => {
    it("should correctly handle process.domain binding when process exists", () => {
        // Create a mock process object with domain and nextTick
        const mockProcess = {
            domain: {
                bind: jest.fn((fn: any) => fn),
                enter: jest.fn(),
                exit: jest.fn()
            },
            nextTick: (callback: any) => setTimeout(callback, 0)
        };

        // Temporarily replace global.process
        const originalProcess = global.process;
        global.process = mockProcess as any;

        try {
            const deferred = Q.defer();
            let errorHandlerCalled = false;

            // Set up error handler
            (Q as any).onerror = function(error: any) {
                errorHandlerCalled = true;
            };

            // Simulate the done() method behavior
            const promise = deferred.promise.done();

            // Trigger an error to test the unhandled error path
            deferred.reject(new Error("test error"));

            // Return a promise that checks the result after a delay
            return Q(50).delay().then(() => {
                expect(errorHandlerCalled).toBe(true);
                // The key difference: original code should call bind, mutated code should not
                expect(mockProcess.domain.bind).toHaveBeenCalled();
            });
        } finally {
            // Restore original process
            global.process = originalProcess;
            (Q as any).onerror = null;
        }
    });
});