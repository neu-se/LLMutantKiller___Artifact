import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q error handling", () => {
    it("should re-throw uncaught exceptions in browser environment", (done) => {
        // Create a promise that throws an error in its handler
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        });

        // In the original code, the error should be re-thrown via setTimeout
        // In the mutated code, the setTimeout does nothing
        // We can detect this by checking if the error appears in unhandled rejections
        setTimeout(() => {
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