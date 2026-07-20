import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Check if the condition in the original code is met
        if (typeof process === "object" && process && process.domain) {
            // If the condition is met, it should not throw an error
            expect(() => promise.done()).not.toThrow();
        }

        // Set process to an object
        const originalProcess = process;
        process = { domain: true };

        // Check if the condition in the mutated code is met
        if (typeof process === "object" && process || process.domain) {
            // If the condition is met, it should throw an error
            expect(() => promise.done()).toThrow();
        }

        // Restore the original process
        process = originalProcess;
    });
});