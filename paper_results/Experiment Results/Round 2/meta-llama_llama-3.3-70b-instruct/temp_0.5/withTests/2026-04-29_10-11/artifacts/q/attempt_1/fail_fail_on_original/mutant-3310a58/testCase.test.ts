import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should set Q.longStackSupport to true if process.env.Q_DEBUG is set", () => {
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

    it("should not set Q.longStackSupport to true if process.env.Q_DEBUG is not set", () => {
        // Arrange
        const originalEnv = process.env;
        delete process.env.Q_DEBUG;

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        process.env = originalEnv;
    });
});