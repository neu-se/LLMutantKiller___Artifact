import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = { env: { Q_DEBUG: 'true' }, nextTick: () => {} };

        // Act and Assert
        expect(Q.longStackSupport).toBe(true);

        // Cleanup
        global.process = originalProcess;
    });
});