import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.emit correctly", () => {
        // Create a promise that will be rejected
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Mock the process.emit function
        const originalEmit = process.emit;
        const emitMock = jest.fn();
        process.emit = emitMock;

        // Track the rejection
        Q.nextTick(() => {
            // The original code should not call process.emit with an empty string
            expect(emitMock).toHaveBeenCalledTimes(0);
        });

        // Restore the original process.emit function
        process.emit = originalEmit;
    });
});