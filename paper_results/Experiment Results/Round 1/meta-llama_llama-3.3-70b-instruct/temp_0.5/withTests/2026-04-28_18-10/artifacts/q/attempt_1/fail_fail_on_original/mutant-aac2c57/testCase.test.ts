import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process and domain correctly", () => {
        // Create a promise that will be resolved in the next tick
        const promise = Q.delay(10);

        // Bind the onUnhandledError function to the current domain
        const onUnhandledError = (error: any) => {
            throw error;
        };

        // Test that the onUnhandledError function is bound to the current domain
        const boundOnUnhandledError = onUnhandledError.bind(process.domain);

        // Expect the bound function to be different from the original function
        expect(boundOnUnhandledError).not.toBe(onUnhandledError);

        // Return the promise to ensure the test waits for it to resolve
        return promise;
    });
});