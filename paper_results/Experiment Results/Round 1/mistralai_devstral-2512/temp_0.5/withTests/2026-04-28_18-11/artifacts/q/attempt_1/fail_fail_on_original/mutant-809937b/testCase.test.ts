import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should emit unhandledRejection event when process.emit exists", (done) => {
        // Create a mock process object with emit function
        const mockProcess = {
            emit: jest.fn()
        };

        // Replace global process temporarily
        const originalProcess = global.process;
        global.process = mockProcess as any;

        // Create a rejected promise that won't be handled
        const rejectedPromise = Q.reject(new Error("test error"));

        // Wait for the next tick to allow the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // Verify that emit was called with correct arguments
            expect(mockProcess.emit).toHaveBeenCalledWith(
                "unhandledRejection",
                expect.any(Error),
                rejectedPromise
            );

            // Verify the error message
            const errorArg = mockProcess.emit.mock.calls[0][0];
            expect(errorArg.message).toBe("test error");

            done();
        }, 10);
    });
});