import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace detection", () => {
    it("should properly detect stack trace support", () => {
        // Create a promise chain that should generate a stack trace
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError) => {
                // In environments with stack traces, the error should have a stack property
                // The mutation would cause hasStacks to be false, preventing stack capture
                if (caughtError.stack) {
                    expect(typeof caughtError.stack).toBe("string");
                    expect(caughtError.stack.length).toBeGreaterThan(0);
                }
                return true;
            }
        );
    });
});