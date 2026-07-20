import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set Q.longStackSupport to true if process.env.Q_DEBUG is set and process is an object and typeof process is object", () => {
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

    it("should not set Q.longStackSupport to true if process.env.Q_DEBUG is set and typeof process is not object", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = 'string';
        const originalEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        global.process = originalProcess;
        process.env = originalEnv;
    });
});