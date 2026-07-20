import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should correctly handle promise rejection with error object and promise stack", () => {
        // Create a promise that rejects with an error object
        const promise = Q().then(() => {
            throw new Error("Test error");
        });

        // Check if the promise is rejected with the correct error
        return promise.catch((error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Test error");
            expect(error.stack).toBeDefined();
            const lines = error.stack.split("\n");
            expect(lines.length).toBeGreaterThan(2);
            expect(lines[0]).toContain("Error: Test error");
            expect(lines[1]).toContain("at");
            expect(lines[1]).not.toContain("From previous event:");
        });
    });
});