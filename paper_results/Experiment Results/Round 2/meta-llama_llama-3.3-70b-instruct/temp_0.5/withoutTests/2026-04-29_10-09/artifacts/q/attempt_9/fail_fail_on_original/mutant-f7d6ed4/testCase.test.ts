import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Check if process is an object and has a truthy value
        if (typeof process === "object" && process) {
            // If process is an object and has a truthy value, it should not throw an error
            expect(() => promise.done()).not.toThrow();
        }
    });
});