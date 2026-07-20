import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = {
            env: {},
            nextTick: () => {}
        };

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);

        // Cleanup
        global.process = originalProcess;
    });
});