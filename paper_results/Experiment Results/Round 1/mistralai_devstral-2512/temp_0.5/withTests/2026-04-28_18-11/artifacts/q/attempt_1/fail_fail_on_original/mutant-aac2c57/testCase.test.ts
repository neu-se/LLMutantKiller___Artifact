// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process domain handling in done()", () => {
    it("should correctly handle process.domain binding when process exists", () => {
        // Create a mock process object with a domain
        const mockProcess = {
            domain: {
                bind: jest.fn((fn) => fn)
            }
        };

        // Temporarily replace global.process
        const originalProcess = global.process;
        global.process = mockProcess;

        try {
            const deferred = Q.defer();
            let onUnhandledErrorCalled = false;

            // Simulate the done() method behavior
            const promise = deferred.promise.done();

            // Trigger an error to test the unhandled error path
            deferred.reject(new Error("test error"));

            // Use Q.onerror to detect if the error handler was called
            Q.onerror = function(error) {
                onUnhandledErrorCalled = true;
            };

            // Return a promise that checks the result after a delay
            return Q.delay(50).then(() => {
                expect(onUnhandledErrorCalled).toBe(true);
                expect(mockProcess.domain.bind).toHaveBeenCalled();
            });
        } finally {
            // Restore original process
            global.process = originalProcess;
            Q.onerror = null;
        }
    });
});