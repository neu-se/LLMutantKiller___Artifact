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
            // The original code should call process.emit with "unhandledRejection" and "rejectionHandled"
            expect(emitMock).toHaveBeenCalledTimes(2);
            expect(emitMock).toHaveBeenNthCalledWith(1, "unhandledRejection", expect.any(Error), expect.any(Object));
            expect(emitMock).toHaveBeenNthCalledWith(2, "rejectionHandled", expect.any(Error), expect.any(Object));
        });

        // Restore the original process.emit function
        process.emit = originalEmit;

        // The mutated code should not call process.emit with "unhandledRejection" and "rejectionHandled"
        // Because process.emit is an empty string in the mutated code
        expect(() => {
            Q.nextTick(() => {
                process.emit = () => {};
                const rejectedPromise = Q.reject(new Error("Test error"));
            });
        }).toThrowError();
    });
});