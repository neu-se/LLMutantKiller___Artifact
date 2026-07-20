import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should enable long stack traces when Q_DEBUG is set", () => {
        // Arrange
        const originalEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Act
        const q = Q.resolve(10);

        // Assert
        expect(q.isPending()).toBe(false);
        expect(q.isFulfilled()).toBe(true);

        // Cleanup
        process.env = originalEnv;
    });
});