// Test case to detect the mutation in the `done` method of Q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with process.domain", () => {
    it("should correctly handle process.domain binding when process exists", () => {
        // Create a mock process object with domain property
        const mockProcess = {
            domain: {
                bind: jest.fn((fn: any) => fn)
            }
        };

        // Store the original process object
        const originalProcess = global.process;

        // Set the mock process object
        global.process = mockProcess as any;

        // Create a resolved promise
        const promise = Q.resolve(42);

        // Track whether onUnhandledError was bound
        let wasBound = false;
        const originalNextTick = Q.nextTick;
        Q.nextTick = (fn: any) => {
            fn();
        };

        // Call done on the promise
        promise.done();

        // Restore the original process object
        global.process = originalProcess;
        Q.nextTick = originalNextTick;

        // Verify that process.domain.bind was called
        expect(mockProcess.domain.bind).toHaveBeenCalled();
    });
});