import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set Q.longStackSupport to true if process.env.Q_DEBUG is set and typeof process is object", () => {
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
});