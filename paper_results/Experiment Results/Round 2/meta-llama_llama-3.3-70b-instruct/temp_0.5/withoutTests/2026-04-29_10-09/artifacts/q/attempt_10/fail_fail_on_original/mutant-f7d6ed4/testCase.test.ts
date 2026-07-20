import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Check if process.domain is truthy
        if (process.domain) {
            expect(() => promise.done()).not.toThrow();
        } else {
            expect(() => promise.done()).toThrow();
        }
    });
});