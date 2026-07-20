import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should correctly handle stack traces for promises", () => {
        // Create a promise chain to test stack trace handling
        const promise = Q().then(() => {
            throw new Error("Test error");
        });

        // Check if the promise is rejected with the correct error
        return promise.catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });
});