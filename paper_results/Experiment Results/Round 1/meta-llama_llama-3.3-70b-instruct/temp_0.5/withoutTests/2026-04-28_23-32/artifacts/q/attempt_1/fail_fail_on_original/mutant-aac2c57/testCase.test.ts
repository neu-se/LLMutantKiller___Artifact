import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object with domain property
        const process = { domain: {} };
        const originalProcess = global.process;
        global.process = process;

        // Create a promise and check if it handles process.domain correctly
        const promise = Q.Promise((resolve, reject) => {
            resolve("Test");
        });

        // Check if the promise is resolved correctly
        expect(promise.then((value) => value)).resolves.toBe("Test");

        // Restore the original process object
        global.process = originalProcess;
    });
});