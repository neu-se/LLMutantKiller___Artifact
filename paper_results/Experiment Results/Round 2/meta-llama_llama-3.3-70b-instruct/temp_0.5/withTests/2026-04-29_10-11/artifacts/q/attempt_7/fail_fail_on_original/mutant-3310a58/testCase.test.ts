import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set Q.longStackSupport to true if process.env.Q_DEBUG is set and process is an object", () => {
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

    it("should not set Q.longStackSupport to true if process.env.Q_DEBUG is set and process is not an object", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = null;
        const originalEnv = process.env;

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        global.process = originalProcess;
        process.env = originalEnv;
    });
});