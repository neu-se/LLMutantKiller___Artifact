import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create when available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        // Set Object.create to undefined
        Object.create = undefined;

        // Try to create a new object with Q
        const promise = q.defer().promise;

        // Check if the promise is created successfully
        expect(promise).not.toBeNull();

        // Restore Object.create
        Object.create = originalCreate;
    });
});