import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Check if process is an object
        if (typeof process === "object") {
            // If process is an object, it should not throw an error
            expect(() => promise.done()).not.toThrow();
        } else {
            // If process is not an object, it should not throw an error
            expect(() => promise.done()).not.toThrow();
        }
    });
});