import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create when available", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        // Set Object.create to null
        Object.create = null;

        // Try to create a new object with Q
        const promise = q.defer().promise;

        // Check if the promise is created successfully
        expect(promise).not.toBeNull();

        // Restore Object.create
        Object.create = originalCreate;

        // Check if Object.create is called when creating a promise
        const createSpy = jest.spyOn(Object, 'create');
        q.defer();
        expect(createSpy).toHaveBeenCalledTimes(2);
    });
});