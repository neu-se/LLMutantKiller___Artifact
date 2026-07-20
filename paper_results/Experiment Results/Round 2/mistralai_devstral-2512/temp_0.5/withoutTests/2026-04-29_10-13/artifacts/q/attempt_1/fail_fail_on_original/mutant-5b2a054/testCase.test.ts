import { Q } from "./q";

describe("Q error handling in browsers", () => {
    it("should re-throw uncaught exceptions in browser environment", (done) => {
        // Simulate browser environment by ensuring we're not in Node.js
        const isBrowser = typeof window !== "undefined" || typeof self !== "undefined";
        if (!isBrowser) {
            done(new Error("This test requires a browser environment"));
            return;
        }

        // Create a promise that throws an error
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        });

        // The mutation would prevent the error from being re-thrown
        // In the original code, this should cause an unhandled rejection
        // that we can detect by checking if the error was thrown
        setTimeout(() => {
            // In the original code, the error should have been re-thrown
            // In the mutated code, nothing happens
            // We can't directly observe this, so we use a workaround:
            // Check if the unhandled rejection tracking has the error
            const reasons = Q.getUnhandledReasons();
            const hasHandlerError = reasons.some((reason: string) =>
                reason.includes("Handler error")
            );

            if (hasHandlerError) {
                done();
            } else {
                done(new Error("Expected unhandled rejection with 'Handler error'"));
            }
        }, 10);
    });
});