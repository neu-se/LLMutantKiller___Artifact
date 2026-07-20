import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when object_create is not a function", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        // Set Object.create to null
        Object.create = null;

        // Try to create a new object with Q
        expect(() => {
            q.Q.defer();
        }).toThrowError("Q can't create object");

        // Restore Object.create
        Object.create = originalCreate;
    });
});