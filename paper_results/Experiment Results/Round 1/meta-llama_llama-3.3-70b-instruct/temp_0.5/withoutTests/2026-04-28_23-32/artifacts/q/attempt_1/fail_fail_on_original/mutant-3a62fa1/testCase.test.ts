import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = { env: {} };

        // Act and Assert
        expect(() => Q()).not.toThrow();

        // Cleanup
        global.process = originalProcess;
    });
});