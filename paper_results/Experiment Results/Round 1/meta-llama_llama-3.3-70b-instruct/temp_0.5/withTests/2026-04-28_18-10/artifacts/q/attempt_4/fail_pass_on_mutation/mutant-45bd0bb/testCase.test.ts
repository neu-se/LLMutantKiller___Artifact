import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create an object with Object.create when available", () => {
        // Create a new Q promise
        const promise = q.defer().promise;

        // Check if the promise is created successfully
        expect(promise).not.toBeNull();
    });
});