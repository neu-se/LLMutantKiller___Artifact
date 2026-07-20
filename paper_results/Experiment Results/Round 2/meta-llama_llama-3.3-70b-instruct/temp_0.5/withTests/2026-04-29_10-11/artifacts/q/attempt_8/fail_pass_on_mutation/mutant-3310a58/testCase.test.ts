import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it.skip("should set Q.longStackSupport to true if process.env.Q_DEBUG is set and typeof process is object", () => {
        // Arrange
        const originalEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(true);

        // Clean up
        process.env = originalEnv;
    });

    it("should not set Q.longStackSupport to true if typeof process is not object", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = undefined;
        const originalEnv = global.Q;

        // Act
        global.Q = Q;
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        global.process = originalProcess;
        global.Q = originalEnv;
    });
});