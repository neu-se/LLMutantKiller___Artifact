import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it.skip("should set Q.longStackSupport to true if process.env.Q_DEBUG is set and process is an object with env property", () => {
        // Arrange
        const originalProcess = global.process;
        const originalEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(true);

        // Clean up
        process.env = originalEnv;
        global.process = originalProcess;
    });

    it("should not set Q.longStackSupport to true if process is not an object with env property", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = { foo: 'bar' };

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        global.process = originalProcess;
    });
});