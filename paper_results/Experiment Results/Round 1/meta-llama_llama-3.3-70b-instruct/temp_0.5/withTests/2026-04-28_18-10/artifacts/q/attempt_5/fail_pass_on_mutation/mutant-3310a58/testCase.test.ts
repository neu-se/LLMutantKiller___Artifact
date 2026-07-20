import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it.skip("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
        // Arrange
        process.env.Q_DEBUG = 'true';

        // Act
        const originalCode = Q.longStackSupport;

        // Assert
        expect(originalCode).toBe(true);
    });

    it("should not set Q.longStackSupport to true when Q_DEBUG is not set", () => {
        // Arrange
        delete process.env.Q_DEBUG;

        // Act
        const originalCode = Q.longStackSupport;

        // Assert
        expect(originalCode).toBe(false);
    });
});