import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have Q.longStackSupport as false by default when Q_DEBUG is not set", () => {
        // Arrange
        delete process.env.Q_DEBUG;

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);
    });
});