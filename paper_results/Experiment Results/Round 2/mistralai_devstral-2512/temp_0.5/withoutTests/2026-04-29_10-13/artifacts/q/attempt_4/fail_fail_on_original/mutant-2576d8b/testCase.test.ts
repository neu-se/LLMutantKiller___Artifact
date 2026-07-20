import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
    it("should properly build long stack traces through promise chain", () => {
        // Create a chain of promises that will be rejected
        const error = new Error("Test error");
        const promise1 = q.reject(error);
        const promise2 = promise1.then(() => {});
        const promise3 = promise2.then(() => {});

        // Force stack trace generation by inspecting the final promise
        return promise3.then(
            () => {
                throw new Error("Should not reach here");
            },
            (caughtError: Error) => {
                // The error should have a stack trace that includes the promise chain
                expect(caughtError).toBe(error);
                expect(caughtError.stack).toBeDefined();
                // The stack should contain references to the promise chain
                expect(caughtError.stack).toContain("From previous event");
            }
        );
    });
});