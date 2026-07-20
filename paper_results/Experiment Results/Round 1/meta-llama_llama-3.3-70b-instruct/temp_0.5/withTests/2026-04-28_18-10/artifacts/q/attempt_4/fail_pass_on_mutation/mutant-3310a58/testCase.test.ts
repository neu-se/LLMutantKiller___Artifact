import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not enable long stack traces by default", () => {
        // Arrange
        delete process.env.Q_DEBUG;

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);
    });
});