// Test case to detect the mutation in the `done` method of Q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with process.domain", () => {
    it("should correctly bind onUnhandledError when process.domain exists", () => {
        // Create a mock process object with domain property
        const mockProcess = {
            domain: {
                bind: jest.fn((fn: any) => {
                    // Return a bound version that tracks it was called
                    const boundFn = function(...args: any[]) {
                        return fn.apply(this, args);
                    };
                    (boundFn as any).wasBound = true;
                    return boundFn;
                })
            }
        };

        // Store the original process object
        const originalProcess = global.process;

        // Set the mock process object
        global.process = mockProcess as any;

        // Create a rejected promise to trigger the done path
        const promise = Q.reject(new Error("test error"));

        // Track if the error handler was bound
        let errorHandlerBound = false;

        // Override Q.nextTick to capture the onUnhandledError function
        const originalNextTick = Q.nextTick;
        (Q as any).nextTick = (fn: any) => {
            // Execute the function immediately to trigger the binding
            fn();
        };

        // Call done on the promise
        promise.done();

        // Restore the original process object and nextTick
        global.process = originalProcess;
        (Q as any).nextTick = originalNextTick;

        // Verify that process.domain.bind was called
        expect(mockProcess.domain.bind).toHaveBeenCalled();
    });
});