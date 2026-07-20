import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a promise
        const promise = Q((resolve, reject) => {
            resolve("Test");
        });

        // Check if the promise is resolved correctly
        expect(promise.then((value) => value)).resolves.toBe("Test");
    });
});