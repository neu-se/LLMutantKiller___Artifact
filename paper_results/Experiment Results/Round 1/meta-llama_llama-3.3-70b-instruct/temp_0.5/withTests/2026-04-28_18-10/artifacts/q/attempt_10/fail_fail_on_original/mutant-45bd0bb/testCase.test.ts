import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use Object.create when available", () => {
        // Try to create a new object with Q
        const promise = q.defer().promise;

        // Check if the promise is created successfully
        expect(promise).not.toBeNull();

        // Check if Object.create is called when creating a promise
        const createSpy = jest.spyOn(Object, 'create');
        q.defer();
        expect(createSpy).toHaveBeenCalledTimes(2);
    });

    it("should throw an error when Object.create is not a function", () => {
        // Save the original Object.create
        const originalCreate = Object.create;

        // Set Object.create to a non-function value
        Object.create = {};

        // Try to create a new object with Q
        expect(() => {
            q.defer();
        }).toThrowError();

        // Restore Object.create
        Object.create = originalCreate;
    });
});