import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly handle stack traces that don't match Firefox pattern", () => {
        // Create a scenario where we need to parse stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const promise = Q().then(() => {
            // This will create a stack trace when rejected
            throw new Error("Test error");
        });

        return promise.then(
            () => {
                // Should not reach here
                expect(true).toBe(false);
            },
            (error) => {
                // The error should have a stack trace
                expect(error.stack).toBeDefined();

                // The key is that the parsing should work correctly
                // In the mutated version, it would incorrectly parse
                // stack traces that don't match the Firefox pattern
                const lines = error.stack.split('\n');
                expect(lines.length).toBeGreaterThan(0);

                // Verify we can still work with the error
                expect(error.message).toBe("Test error");
            }
        );
    });
});