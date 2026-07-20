import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should not set Q.longStackSupport to true if process is not an object", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = undefined;

        // Act
        const QInstance = Q;

        // Assert
        expect(QInstance.longStackSupport).toBe(false);

        // Clean up
        global.process = originalProcess;
    });
});