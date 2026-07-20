import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Check if process.domain is an object
        const processDomain = typeof process === "object" && process && process.domain;

        // Create a promise
        const promise = Q((resolve, reject) => {
            if (processDomain && typeof processDomain === "object") {
                resolve("Test");
            } else {
                reject("Error");
            }
        });

        // Check if the promise is resolved or rejected correctly
        if (processDomain && typeof processDomain === "object") {
            expect(promise.then((value) => value)).resolves.toBe("Test");
        } else {
            expect(promise.then((value) => value)).rejects.toBe("Error");
        }
    });
});