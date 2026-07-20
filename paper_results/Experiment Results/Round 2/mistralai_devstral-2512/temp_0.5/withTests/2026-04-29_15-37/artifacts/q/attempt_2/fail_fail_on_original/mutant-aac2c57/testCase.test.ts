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

        // Spy on the nextTick to verify the behavior
        const nextTickSpy = jest.spyOn(Q, 'nextTick').mockImplementation((fn: any) => {
            fn();
        });

        // Call done on the promise
        promise.done();

        // Restore the original process object
        global.process = originalProcess;

        // Verify that process.domain.bind was called
        expect(mockProcess.domain.bind).toHaveBeenCalled();

        // Clean up
        nextTickSpy.mockRestore();
    });
});