import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = undefined;

        // Act and Assert
        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Cleanup
        global.process = originalProcess;
    });
});