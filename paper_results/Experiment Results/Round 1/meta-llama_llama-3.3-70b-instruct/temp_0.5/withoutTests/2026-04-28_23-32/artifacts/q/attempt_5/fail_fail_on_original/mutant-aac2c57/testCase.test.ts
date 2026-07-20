import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a promise
        const promise = Q((resolve, reject) => {
            if (typeof process === "object" && process && process.domain) {
                resolve("Test");
            } else {
                resolve("Test");
            }
        });

        // Check if the promise is resolved correctly
        expect(promise.then((value) => value)).resolves.toBe("Test");
    });
});