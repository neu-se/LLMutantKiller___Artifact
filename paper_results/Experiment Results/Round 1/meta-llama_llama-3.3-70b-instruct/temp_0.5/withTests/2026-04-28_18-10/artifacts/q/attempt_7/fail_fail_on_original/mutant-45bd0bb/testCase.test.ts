import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create when available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        // Set Object.create to false
        Object.create = false;

        // Try to create a new object with Q
        expect(() => {
            q.defer();
        }).toThrowError();

        // Restore Object.create
        Object.create = originalCreate;
    });
});