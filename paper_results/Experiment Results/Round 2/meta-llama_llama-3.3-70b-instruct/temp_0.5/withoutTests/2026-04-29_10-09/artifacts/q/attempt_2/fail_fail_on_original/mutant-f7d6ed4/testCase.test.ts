import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a new Q promise
        const promise = Q.resolve();

        // Set process.domain to a truthy value
        process.domain = {};

        // Try to call done on the promise
        promise.done();

        // If process.domain is truthy, it should not throw an error
        expect(() => promise.done()).not.toThrow();

        // Set process.domain to a falsy value
        delete process.domain;

        // Try to call done on the promise
        expect(() => promise.done()).not.toThrow();
    });
});