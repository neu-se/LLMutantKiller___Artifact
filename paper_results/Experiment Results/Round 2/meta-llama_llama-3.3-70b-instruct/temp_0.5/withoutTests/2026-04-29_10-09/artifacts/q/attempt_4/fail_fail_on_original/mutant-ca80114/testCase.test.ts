import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should test the behavior of Q in NodeJS and non-NodeJS environments", () => {
        // Create a promise that throws an error
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            reject(new Error("Test error"));
        });

        // Test that the error is thrown synchronously in a NodeJS environment
        if (typeof process === "object" && process.toString() === "[object process]") {
            const errorCaught = jest.fn();
            promise.then(() => {}, errorCaught);
            expect(errorCaught).toHaveBeenCalledTimes(1); // Error caught
            expect(errorCaught.mock.calls[0][0]).toBeInstanceOf(Error);
            expect(errorCaught.mock.calls[0][0].message).toBe("Test error");
        } else {
            // Test that the error is thrown asynchronously in a non-NodeJS environment
            const errorCaught = jest.fn();
            promise.then(() => {}, errorCaught);
            expect(errorCaught).toHaveBeenCalledTimes(0); // Error not caught yet
        }
    });
});